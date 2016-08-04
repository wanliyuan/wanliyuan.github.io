/**
 * Created by hywanliyuan on 16/8/3.
 */
function getData() {
    return [
        ['', 'Kia', 'Nissan', 'Toyota', 'Honda'],
        ['2008', 10, 11, 12, 13],
        ['2009', 20, 11, 14, 13],
        ['2010', 30, 15, 12, 13]
    ];
}
var example1 = document.getElementById('hot'),
    settings1,
    hot1;

settings1 = {
    data: getData(),
    startRows: 5,
    startCols: 5,
    minRows: 5,
    minCols: 5,
    maxRows: 10,
    maxCols: 10,
    rowHeaders: true,
    mergeCells: true,
    colHeaders: true,
    minSpareRows: 1,
    contextMenu: {
        items:{
            "row_above":{
                name:"向上插入一行"
            },
            "row_below":{
                name:"向下插入一行"
            },
            "col_left":{
                name:"向左插入一列"
            },
            "col_right":{
                name:"向右插入一列"
            },
            "remove_row":{
                name:"删除行"
            },
            "remove_col":{
                name:"删除列"
            }
        }
    }
};
hot1 = new Handsontable(example1, settings1);