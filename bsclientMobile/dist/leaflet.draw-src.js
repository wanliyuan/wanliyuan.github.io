'use strict';
/*
 * L.LatLngUtil contains different utility functions for LatLngs.
 */

L.LatLngUtil = {
	// Clones a LatLngs[], returns [][]
	cloneLatLngs: function (latlngs) {
		var clone = [];
		for (var i = 0, l = latlngs.length; i < l; i++) {
			clone.push(this.cloneLatLng(latlngs[i]));
		}
		return clone;
	},

	cloneLatLng: function (latlng) {
		return L.latLng(latlng.lat, latlng.lng);
	}
};
/*
 * L.DrawTouch allows you to add touch capabilities to leaflet draw handlers.
 */

L.DrawTouch = L.Class.extend({
	includes: L.Mixin.Events,
	initialize: function (map) {
		this._map = map;
	},
	enable: function () {
		if (this._enabled) {
			return;
		}
		if (this._map) {
			L.DomEvent.addListener(this._map._container, 'touchstart', this._onTouchStart, this);
		}
		this._enabled = true;
	},
	disable: function () {
		if (!this._enabled) {
			return;
		}
		if (this._map) {
			L.DomEvent.removeListener(this._map._container, 'touchstart', this._onTouchStart, this);
		}
		this._enabled = false;
	},
	_normaliseEvent: function (e) {
		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		var first = e.touches ? e.touches[0] : e,
			containerPoint = this._map.mouseEventToContainerPoint(first),
			layerPoint = this._map.mouseEventToLayerPoint(first),
			latlng = this._map.layerPointToLatLng(layerPoint);

		return {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			clientX: first.clientX,
			clientY: first.clientY,
			originalEvent: e
		};
	},
	_onTouchStart: function (e) {
		// Make sure it's a one finger gesture and record the starting point
		if (e.touches.length === 1) {
			this.fire('down', this._normaliseEvent(e));
			L.DomEvent.addListener(this._map._container, 'touchmove', this._onTouchMove, this);
			L.DomEvent.addListener(this._map._container, 'touchend', this._onTouchEnd, this);
		}
	},
	_onTouchMove: function (e) {
		// Ensure we saved the starting point
		this.fire('move', this._normaliseEvent(e));
	},
	_onTouchEnd: function () {
		this.fire('up');
		L.DomEvent.removeListener(this._map._container, 'touchmove', this._onTouchMove, this);
		L.DomEvent.addListener(this._map._container, 'touchend', this._onTouchEnd, this);
	}
});
L.Draw = {};

L.Draw.Feature = L.Handler.extend({
	includes: L.Mixin.Events,

	initialize: function (map, options) {
		this._map = map;
		this._container = map._container;
		this._overlayPane = map._panes.overlayPane;
		this._popupPane = map._panes.popupPane;

		// Merge default shapeOptions options with custom shapeOptions
		if (options && options.shapeOptions) {
			options.shapeOptions = L.Util.extend({}, this.options.shapeOptions, options.shapeOptions);
		}
		L.setOptions(this, options);
	},

	enable: function () {
		if (this._enabled) {
			return;
		}

		L.Handler.prototype.enable.call(this);

		this.fire('enabled', {
			handler: this.type
		});

		this._map.fire('draw:drawstart', {
			layerType: this.type
		});
	},

	disable: function () {
		if (!this._enabled) {
			return;
		}

		L.Handler.prototype.disable.call(this);

		this._map.fire('draw:drawstop', {
			layerType: this.type
		});

		this.fire('disabled', {
			handler: this.type
		});
	},

	addHooks: function () {
		var map = this._map;

		if (map) {
			L.DomUtil.disableTextSelection();

			map.getContainer().focus();

			L.DomEvent.on(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	removeHooks: function () {
		if (this._map) {
			L.DomUtil.enableTextSelection();

			L.DomEvent.off(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	setOptions: function (options) {
		L.setOptions(this, options);
	},

	_fireCreatedEvent: function (layer) {
		this._map.fire('draw:created', {
			layer: layer,
			layerType: this.type
		});
	},

	// Cancel drawing when the escape key is pressed
	_cancelDrawing: function (e) {
		if (e.keyCode === 27) {
			this.disable();
		}
	}
});
L.Draw.Marker = L.Draw.Feature.extend({
	statics: {
		TYPE: 'marker'
	},

	options: {
		icon: new L.Icon.Default(),
		repeatMode: false,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Marker.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {

			// Same mouseMarker as in Draw.Polyline
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
		}
	},

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			if (this._marker) {
				this._marker.off('click', this._onClick, this);
				this._map
					.off('click', this._onClick, this)
					.removeLayer(this._marker);
				delete this._marker;
			}

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._mouseMarker.setLatLng(latlng);

		if (!this._marker) {
			this._marker = new L.Marker(latlng, {
				icon: this.options.icon,
				zIndexOffset: this.options.zIndexOffset
			});
			// Bind to both marker and map to make sure we get the click event.
			this._marker.on('click', this._onClick, this);
			this._map
				.on('click', this._onClick, this)
				.addLayer(this._marker);
		} else {
			latlng = this._mouseMarker.getLatLng();
			this._marker.setLatLng(latlng);
		}
	},

	_onClick: function () {
		this._fireCreatedEvent();

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_fireCreatedEvent: function () {

		var marker = new L.Marker(this._marker.getLatLng(), {
			icon: this.options.icon
		});
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});
/*
	Design choice: I didn't run with emulating a click event here as others have done, because it bugged out on me. 
	Getting it to work when you have other features on the map was problematic, as they would steel the click event. 
	The scenario with touch and mouse combination i.e. microsoft surface was a problem too.
	I went with the touch events which are slightly more code but they were needed for polylineTouch and polygonTouch anyway. 
	So when it's all refactored this will be quite tidy. 
*/
L.Draw.MarkerTouch = L.Draw.Marker.extend({
	initialize: function (map, options) {
		L.Draw.Marker.prototype.initialize.call(this, map, options);
	},
	addHooks: function () {
		L.Draw.Marker.prototype.addHooks.call(this);
		if (!this._touchable) {
			this._touchable = new L.DrawTouch(this._map);
		}
		if (this._map) {
			console.dir(this._touchable);
			this._touchable.on({
				down: this._onTouchStart,
				move: this._onTouchMove,
				up: this._onTouchEnd
			}, this).enable();
		}
	},
	removeHooks: function () {
		L.Draw.Marker.prototype.removeHooks.call(this);
		if (this._map) {
			this._touchable.off({
				down: this._onTouchStart,
				move: this._onTouchMove,
				up: this._onTouchEnd
			}, this).disable();
		}
	},
	_onTouchStart: function (e) {
		this._currentLatLng = e.latlng;
		this._touchOriginPoint = L.point(e.clientX, e.clientY);
		//Disable mouse move event
		this._map.off('mousemove', this._onMouseMove, this);
	},
	_onTouchMove: function (e) {
		// Ensure we saved the starting point
		if (this._touchOriginPoint) {
			this._touchEndPoint = L.point(e.clientX, e.clientY);
		}
	},
	_onTouchEnd: function () {
		// Make sure we have a starting point
		if (this._touchOriginPoint) {

			if (this._touchEndPoint) {
				// If we have an end point we need to see how much it's moved before we decide if we save
				// We detect clicks within a certain tolerance, otherwise let it
				// be interpreted as a drag by the map
				var distanceMoved = L.point(this._touchEndPoint).distanceTo(this._touchOriginPoint);
				if (Math.abs(distanceMoved) < 9 * (window.devicePixelRatio || 1)) {
					this._marker = new L.Marker(this._currentLatLng, {
						icon: this.options.icon,
						zIndexOffset: this.options.zIndexOffset
					});
					this._onClick();
				}
			} else {
				// If there is no _touchEndPoint we save straight away as this means no movement i.e. definetly a click.
				this._marker = new L.Marker(this._currentLatLng, {
					icon: this.options.icon,
					zIndexOffset: this.options.zIndexOffset
				});
				this._onClick();
			}
		}
		//Enable mouse move event
		this._map.on('mousemove', this._onMouseMove, this);
		// No matter what remove the start and end point ready for the next touch.
		this._touchOriginPoint = null;
		this._currentLatLng = null;
		this._touchEndPoint = null;
	}
});
L.Draw.Polyline = L.Draw.Feature.extend({
	statics: {
		TYPE: 'polyline'
	},

	Poly: L.Polyline,

	options: {
		allowIntersection: true,
		repeatMode: false,
		drawError: {
			color: '#b00b00',
			timeout: 2500
		},
		icon: new L.DivIcon({
			iconSize: new L.Point(10, 10),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		guidelineDistance: 20,
		maxGuideLineLength: 4000,
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: false,
			clickable: true
		},
		metric: true, // Whether to use the metric meaurement system or imperial
		zIndexOffset: 2000 // This should be > than the highest z-index any map layers
	},

	initialize: function (map, options) {

		// Merge default drawError options with custom options
		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polyline.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._poly = new L.Polyline([], this.options.shapeOptions);

			// Make a transparent marker that will used to catch click events. These click
			// events will create the vertices. We need to do this so we can ensure that
			// we can create vertices over other map layers (markers, vector layers). We
			// also do not want to trigger any click handlers of objects we are clicking on
			// while drawing.
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('mousedown', this._onMouseDown, this)
				.addTo(this._map);

			this._map
				.on('mousemove', this._onMouseMove, this)
				.on('mouseup', this._onMouseUp, this)
				.on('zoomend', this._onZoomEnd, this);
		}
	},

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		this._clearHideErrorTimeout();

		this._cleanUpShape();

		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._map.removeLayer(this._poly);
		delete this._poly;

		this._mouseMarker
			.off('mousedown', this._onMouseDown, this)
			.off('mouseup', this._onMouseUp, this);
		this._map.removeLayer(this._mouseMarker);
		delete this._mouseMarker;

		// clean up DOM
		this._clearGuides();

		this._map
			.off('mousemove', this._onMouseMove, this)
			.off('zoomend', this._onZoomEnd, this);
	},

	deleteLastVertex: function () {
		if (this._markers.length <= 1) {
			return;
		}

		var lastMarker = this._markers.pop(),
			poly = this._poly,
			latlng = this._poly.spliceLatLngs(poly.getLatLngs().length - 1, 1)[0];

		this._markerGroup.removeLayer(lastMarker);

		if (poly.getLatLngs().length < 2) {
			this._map.removeLayer(poly);
		}

		this._vertexChanged(latlng, false);
	},

	addVertex: function (latlng) {
		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._vertexChanged(latlng, true);
	},

	_finishShape: function () {
		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	//Called to verify the shape is valid when the user tries to finish it
	//Return false if the shape is not valid
	_shapeIsValid: function () {
		return true;
	},

	_onZoomEnd: function () {
		this._updateGuide();
	},

	_onMouseMove: function (e) {
		var newPos = e.layerPoint,
			latlng = e.latlng;

		// Save latlng
		// should this be moved to _updateGuide() ?
		this._currentLatLng = latlng;

		// Update the guide line
		this._updateGuide(newPos);

		// Update the mouse marker position
		this._mouseMarker.setLatLng(latlng);

		L.DomEvent.preventDefault(e.originalEvent);
	},

	_vertexChanged: function () {
		this._updateFinishHandler();

		this._clearGuides();
	},

	_onMouseDown: function (e) {
		var originalEvent = e.originalEvent;
		this._mouseDownOrigin = L.point(originalEvent.clientX, originalEvent.clientY);
	},

	_onMouseUp: function (e) {
		if (this._mouseDownOrigin) {
			// We detect clicks within a certain tolerance, otherwise let it
			// be interpreted as a drag by the map
			var distance = L.point(e.originalEvent.clientX, e.originalEvent.clientY)
				.distanceTo(this._mouseDownOrigin);
			if (Math.abs(distance) < 9 * (window.devicePixelRatio || 1)) {
				this.addVertex(e.latlng);
			}
		}
		this._mouseDownOrigin = null;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;
		// The last marker should have a click handler to close the polyline
		if (markerCount > 1) {
			this._markers[markerCount - 1].on('click', this._finishShape, this);
		}

		// Remove the old marker click handler (as only the last point should close the polyline)
		if (markerCount > 2) {
			this._markers[markerCount - 2].off('click', this._finishShape, this);
		}
	},

	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset * 2
		});

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_updateGuide: function (newPos) {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			newPos = newPos || this._map.latLngToLayerPoint(this._currentLatLng);

			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}
	},

	_drawGuide: function (pointA, pointB) {
		var length = Math.floor(Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))),
			guidelineDistance = this.options.guidelineDistance,
			maxGuideLineLength = this.options.maxGuideLineLength,
			// Only draw a guideline with a max length
			i = length > maxGuideLineLength ? length - maxGuideLineLength : guidelineDistance,
			fraction,
			dashPoint,
			dash;

		//create the guides container if we haven't yet
		if (!this._guidesContainer) {
			this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane);
		}

		//draw a dash every GuildeLineDistance
		for (; i < length; i += this.options.guidelineDistance) {
			//work out fraction along line we are
			fraction = i / length;

			//calculate new x,y point
			dashPoint = {
				x: Math.floor((pointA.x * (1 - fraction)) + (fraction * pointB.x)),
				y: Math.floor((pointA.y * (1 - fraction)) + (fraction * pointB.y))
			};

			//add guide dash to guide container
			dash = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer);
			dash.style.backgroundColor = !this._errorShown ? this.options.shapeOptions.color : this.options.drawError.color;

			L.DomUtil.setPosition(dash, dashPoint);
		}
	},

	_updateGuideColor: function (color) {
		if (this._guidesContainer) {
			for (var i = 0, l = this._guidesContainer.childNodes.length; i < l; i++) {
				this._guidesContainer.childNodes[i].style.backgroundColor = color;
			}
		}
	},

	// removes all child elements (guide dashes) from the guides container
	_clearGuides: function () {
		if (this._guidesContainer) {
			while (this._guidesContainer.firstChild) {
				this._guidesContainer.removeChild(this._guidesContainer.firstChild);
			}
		}
	},

	_clearHideErrorTimeout: function () {
		if (this._hideErrorTimeout) {
			clearTimeout(this._hideErrorTimeout);
			this._hideErrorTimeout = null;
		}
	},

	_cleanUpShape: function () {
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].off('click', this._finishShape, this);
		}
	},

	_fireCreatedEvent: function () {
		var poly = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
	}
});
L.Draw.PolylineTouch = L.Draw.Polyline.extend({
	initialize: function (map, options) {
		L.Draw.Polyline.prototype.initialize.call(this, map, options);
	},
	addHooks: function () {
		L.Draw.Polyline.prototype.addHooks.call(this);
		if (!this._touchable) {
			this._touchable = new L.DrawTouch(this._map);
		}
		if (this._map) {
			this._touchable.on({
				down: this._onTouchStart,
				move: this._onTouchMove,
				up: this._onTouchEnd
			}, this).enable();
		}
	},
	removeHooks: function () {
		L.Draw.Polyline.prototype.removeHooks.call(this);
		if (this._map) {
			if (this._map) {
				this._touchable.off({
					down: this._onTouchStart,
					move: this._onTouchMove,
					up: this._onTouchEnd
				}, this).disable();
			}
		}
	},
	_updateFinishHandler: function () {
		L.Draw.Polyline.prototype._updateFinishHandler.call(this);
		var distance, distancePixels,
			markerCount = this._markers.length,
			resolution = this._map.containerPointToLatLng([0, 0]).distanceTo(this._map.containerPointToLatLng([0, 1]));

		// It's not a line if it's not two points
		if (markerCount > 2) {
			/* 	The last marker should have a click handler to close the Polygon.
				When the user touches the screen I don't use the click event for the marker, this is because 
				we would need a relatively large marker to click on.
			 	Graphically this can look a bit crap. With this model we exffectively have a 
			 	click area of 24 pixels from the center of the marker no matter graphical marker size.
			 */
			distance = this._markers[markerCount - 2].getLatLng().distanceTo(this._markers[markerCount - 1].getLatLng());
			distancePixels = Math.floor(distance / resolution);
			if (distancePixels < 12 * (window.devicePixelRatio || 1)) {
				// Bit of a hack should refactor so updateFinishHandler is triggered before
				// addVertex.
				this.deleteLastVertex();
				this._finishShape();
			}
		}


	},
	_onTouchStart: function (e) {
		// Make sure it's a one fingure gesture and record the starting point
		this._currentLatLng = e.latlng;
		this._touchOriginPoint = L.point(e.clientX, e.clientY);
		//Disable mouse move event
		this._map.off('mousemove', this._onMouseMove, this);
	},

	_onTouchMove: function (e) {
		// Ensure we saved the starting point
		if (this._touchOriginPoint) {
			this._touchEndPoint = L.point(e.clientX, e.clientY);
		}
	},

	_onTouchEnd: function () {
		// Make sure we have a starting point

		if (this._touchOriginPoint) {
			// If we have an end point we need to see how much it's moved before we decide if we save
			// If there is no _touchEndPoint we save straight away
			if (this._touchEndPoint) {
				// We detect clicks within a certain tolerance, otherwise let it
				// be interpreted as a drag by the map
				var distanceMoved = L.point(this._touchEndPoint).distanceTo(this._touchOriginPoint);
				if (Math.abs(distanceMoved) < 9 * (window.devicePixelRatio || 1)) {
					this.addVertex(this._currentLatLng);
				}
			} else {
				this.addVertex(this._currentLatLng);
			}
		}

		//Enable mouse move event
		this._map.on('mousemove', this._onMouseMove, this);

		// No matter what remove the start and end point ready for the next touch.
		this._touchOriginPoint = null;
		this._touchEndPoint = null;
	}
});
L.Draw.Polygon = L.Draw.Polyline.extend({
	statics: {
		TYPE: 'polygon'
	},

	Poly: L.Polygon,

	options: {
		showArea: false,
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		}
	},

	initialize: function (map, options) {
		L.Draw.Polyline.prototype.initialize.call(this, map, options);

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polygon.TYPE;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;


		// Add and update the double click handler
		if (markerCount > 3) {
			// The first marker should have a click handler to close the polygon
			this._markers[0].on('click', this._finishShape, this);
			this._markers[markerCount - 1].on('dblclick', this._finishShape, this);
			// Only need to remove handler if has been added before
			if (markerCount > 3) {
				this._markers[markerCount - 2].off('dblclick', this._finishShape, this);
			}
		}
	},

	_shapeIsValid: function () {
		return this._markers.length >= 3;
	},

	_vertexChanged: function (latlng, added) {
		var latLngs;

		// Check to see if we should show the area
		if (!this.options.allowIntersection && this.options.showArea) {
			latLngs = this._poly.getLatLngs();

			this._area = L.GeometryUtil.geodesicArea(latLngs);
		}

		L.Draw.Polyline.prototype._vertexChanged.call(this, latlng, added);
	},

	_cleanUpShape: function () {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			this._markers[0].off('click', this._finishShape, this);

			if (markerCount > 2) {
				this._markers[markerCount - 1].off('dblclick', this._finishShape, this);
			}
		}
	}
});
L.Draw.PolygonTouch = L.Draw.Polygon.extend({
	initialize: function (map, options) {
		L.Draw.Polygon.prototype.initialize.call(this, map, options);
	},
	addHooks: function () {
		L.Draw.Polygon.prototype.addHooks.call(this);
		if (!this._touchable) {
			this._touchable = new L.DrawTouch(this._map);
		}
		if (this._map) {
			this._touchable.on({
				down: this._onTouchStart,
				move: this._onTouchMove,
				up: this._onTouchEnd
			}, this).enable();
		}
	},
	removeHooks: function () {
		L.Draw.Polygon.prototype.removeHooks.call(this);
		if (this._map) {
			if (this._map) {
				this._touchable.off({
					down: this._onTouchStart,
					move: this._onTouchMove,
					up: this._onTouchEnd
				}, this).disable();
			}
		}
	},

	_updateFinishHandler: function () {
		L.Draw.Polygon.prototype._updateFinishHandler.call(this);
		var distance, distancePixels,
			markerCount = this._markers.length,
			resolution = this._map.containerPointToLatLng([0, 0]).distanceTo(this._map.containerPointToLatLng([0, 1]));

		// It's not really a polygon if it's less than four points (If start and end points are the same).
		// So we won't even try and close it until it is valid.
		if (markerCount > 2) {
			/* 	If you click the first marker you close the Polygon.
				When the user touches the screen I don 't use the click event for the marker, this is because 
				we would need a relatively large marker to click on.
			 	Graphically this can look a bit crap. With this model we exffectively have a 
			 	click area of 24 pixels from the center of the marker no matter graphical marker size.
			 */
			distance = this._markers[0].getLatLng().distanceTo(this._markers[markerCount - 1].getLatLng());
			distancePixels = Math.floor(distance / resolution);
			if (distancePixels < 12 * (window.devicePixelRatio || 1)) {
				// Bit of a hack should refactor so updateFinishHandler is triggered before
				// addVertex.
				this.deleteLastVertex();
				this._finishShape();
			}
		}
	},
	_onTouchStart: function (e) {
		this._currentLatLng = e.latlng;
		this._touchOriginPoint = L.point(e.clientX, e.clientY);

		// Disable mouse move event
		this._map.off('mousemove', this._onMouseMove, this);
	},

	_onTouchMove: function (e) {
		// Make sure there is a starting point
		if (this._touchOriginPoint) {
			this._touchEndPoint = L.point(e.clientX, e.clientY);
		}
	},

	_onTouchEnd: function () {
		// Make sure there is a starting point

		if (this._touchOriginPoint) {
			// If there is an end point we need to see how much it's moved before we decide if we save
			// If there is no _touchEndPoint we save straight away
			if (this._touchEndPoint) {
				// Detect clicks within a certain tolerance, otherwise let it
				// be interpreted as a drag by the map
				var distanceMoved = L.point(this._touchEndPoint).distanceTo(this._touchOriginPoint);
				if (Math.abs(distanceMoved) < 9 * (window.devicePixelRatio || 1)) {
					this.addVertex(this._currentLatLng);
				}
			} else {
				this.addVertex(this._currentLatLng);
			}
		}

		//Enable mouse move event
		this._map.on('mousemove', this._onMouseMove, this);

		// No matter what remove the start and end point ready for the next touch.
		this._touchOriginPoint = null;
		this._touchEndPoint = null;
	}
});
L.EditToolbar = L.EditToolbar || {};
L.EditToolbar.Edit = L.Handler.extend({
	statics: {
		TYPE: 'edit'
	},

	includes: L.Mixin.Events,

	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		// Set options to the default unless already set
		this._selectedPathOptions = options.selectedPathOptions;

		// Store the selectable layer group for ease of access
		this._featureGroup = options.featureGroup;

		if (!(this._featureGroup instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		this._uneditedLayerProps = {};

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Edit.TYPE;
	},

	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {
			handler: this.type
		});
		//this disable other handlers

		this._map.fire('draw:editstart', {
			handler: this.type
		});
		//allow drawLayer to be updated before beginning edition.

		L.Handler.prototype.enable.call(this);
		this._featureGroup
			.on('layeradd', this._enableLayerEdit, this)
			.on('layerremove', this._disableLayerEdit, this);
	},

	disable: function () {
		if (!this._enabled) {
			return;
		}
		this._featureGroup
			.off('layeradd', this._enableLayerEdit, this)
			.off('layerremove', this._disableLayerEdit, this);
		L.Handler.prototype.disable.call(this);
		this._map.fire('draw:editstop', {
			handler: this.type
		});
		this.fire('disabled', {
			handler: this.type
		});
	},

	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._featureGroup.eachLayer(this._enableLayerEdit, this);

		}
	},

	removeHooks: function () {
		if (this._map) {
			// Clean up selected layers.
			this._featureGroup.eachLayer(this._disableLayerEdit, this);

			// Clear the backups of the original layers
			this._uneditedLayerProps = {};

		}
	},

	revertLayers: function () {
		this._featureGroup.eachLayer(function (layer) {
			this._revertLayer(layer);
		}, this);
	},

	save: function () {
		console.log('saving');
		var editedLayers = new L.LayerGroup();
		this._featureGroup.eachLayer(function (layer) {
			if (layer.edited) {
				editedLayers.addLayer(layer);
				layer.edited = false;
			}
		});
		this._map.fire('draw:edited', {
			layers: editedLayers
		});
	},

	_backupLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._uneditedLayerProps[id]) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				this._uneditedLayerProps[id] = {
					latlngs: L.LatLngUtil.cloneLatLngs(layer.getLatLngs())
				};
			} else if (layer instanceof L.Circle) {
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng()),
					radius: layer.getRadius()
				};
			} else { // Marker
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng())
				};
			}
		}
	},

	_revertLayer: function (layer) {
		var id = L.Util.stamp(layer);
		layer.edited = false;
		if (this._uneditedLayerProps.hasOwnProperty(id)) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				layer.setLatLngs(this._uneditedLayerProps[id].latlngs);
			} else if (layer instanceof L.Circle) {
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
				layer.setRadius(this._uneditedLayerProps[id].radius);
			} else { // Marker
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
			}
		}
	},

	_toggleMarkerHighlight: function (marker) {
		if (!marker._icon) {
			return;
		}
		// This is quite naughty, but I don't see another way of doing it. (short of setting a new icon)
		var icon = marker._icon;

		icon.style.display = 'none';

		if (L.DomUtil.hasClass(icon, 'leaflet-edit-marker-selected')) {
			L.DomUtil.removeClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, -4);

		} else {
			L.DomUtil.addClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, 4);
		}

		icon.style.display = '';
	},

	_offsetMarker: function (icon, offset) {
		var iconMarginTop = parseInt(icon.style.marginTop, 10) - offset,
			iconMarginLeft = parseInt(icon.style.marginLeft, 10) - offset;

		icon.style.marginTop = iconMarginTop + 'px';
		icon.style.marginLeft = iconMarginLeft + 'px';
	},

	_enableLayerEdit: function (e) {
		var layer = e.layer || e.target || e,
			isMarker = layer instanceof L.Marker,
			pathOptions;

		// Don't do anything if this layer is a marker but doesn't have an icon. Markers
		// should usually have icons. If using Leaflet.draw with Leafler.markercluster there
		// is a chance that a marker doesn't.
		if (isMarker && !layer._icon) {
			return;
		}

		// Back up this layer (if haven't before)
		this._backupLayer(layer);

		// Update layer style so appears editable
		if (this._selectedPathOptions) {
			pathOptions = L.Util.extend({}, this._selectedPathOptions);

			if (isMarker) {
				this._toggleMarkerHighlight(layer);
			} else {
				layer.options.previousOptions = L.Util.extend({
					dashArray: null
				}, layer.options);

				// Make sure that Polylines are not filled
				if (!(layer instanceof L.Circle) && !(layer instanceof L.Polygon) && !(layer instanceof L.Rectangle)) {
					pathOptions.fill = false;
				}

				layer.setStyle(pathOptions);
			}
		}

		if (isMarker) {
			layer.dragging.enable();
			layer.on('dragend', this._onMarkerDragEnd);
		} else {
			console.dir(layer);
			layer.editing.enable();
		}
	},

	_disableLayerEdit: function (e) {
		var layer = e.layer || e.target || e;
		layer.edited = false;

		// Reset layer styles to that of before select
		if (this._selectedPathOptions) {
			if (layer instanceof L.Marker) {
				this._toggleMarkerHighlight(layer);
			} else {
				// reset the layer style to what is was before being selected
				layer.setStyle(layer.options.previousOptions);
				// remove the cached options for the layer object
				delete layer.options.previousOptions;
			}
		}

		if (layer instanceof L.Marker) {
			layer.dragging.disable();
			layer.off('dragend', this._onMarkerDragEnd, this);
		} else {
			layer.editing.disable();
		}
	},

	_onMarkerDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
	},


	_hasAvailableLayers: function () {
		return this._featureGroup.getLayers().length !== 0;
	}
});
L.Edit = L.Edit || {};

/*
 * L.Edit.Poly is an editing handler for polylines and polygons.
 */

L.Edit.Poly = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		})
	},

	initialize: function (poly, options) {
		this._poly = poly;
		L.setOptions(this, options);
	},

	addHooks: function () {
		if (this._poly._map) {
			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	removeHooks: function () {
		if (this._poly._map) {
			this._poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._poly._latlngs,
			i, j, len, marker;

		// TODO refactor holes implementation in Polygon to support it here

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		var marker = new L.Marker(latlng, {
			draggable: true,
			icon: this.options.icon
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker.on('drag', this._onMarkerDrag, this);
		marker.on('dragend', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_removeMarker: function (marker) {
		var i = marker._index;

		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._poly.spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		marker
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._fireEdit, this)
			.off('click', this._onMarkerClick, this);
	},

	_fireEdit: function () {
		this._poly.edited = true;
		this._poly.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;

		L.extend(marker._origLatLng, marker._latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
	},

	_onMarkerClick: function (e) {
		var minPoints = L.Polygon && (this._poly instanceof L.Polygon) ? 4 : 3,
			marker = e.target;

		// If removing this point would create an invalid polyline/polygon don't remove
		if (this._poly._latlngs.length < minPoints) {
			return;
		}

		// remove the marker
		this._removeMarker(marker);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._fireEdit();
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
			marker = this._createMarker(latlng),
			onClick,
			onDragStart,
			onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			var i = marker2._index;

			marker._index = i;

			marker
				.off('click', onClick, this)
				.on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._poly.spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);

			this._poly.fire('editstart');
		};

		onDragEnd = function () {
			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);
		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._fireEdit();
		};

		marker
			.on('click', onClick, this)
			.on('dragstart', onDragStart, this)
			.on('dragend', onDragEnd, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
			p1 = map.project(marker1.getLatLng()),
			p2 = map.project(marker2.getLatLng());

		return map.unproject(p1._add(p2)._divideBy(2));
	}
});

L.Polyline.addInitHook(function () {

	// Check to see if handler has already been initialized. This is to support versions of Leaflet that still have L.Handler.PolyEdit
	if (this.editing) {
		return;
	}

	if (L.Edit.Poly) {
		this.editing = new L.Edit.Poly(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});