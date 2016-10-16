/**
 * Created by ZhangJikai on 2016/10/16.
 */
var updatedNodes = [];
// look for all the 'Jillian' nodes
$scope.gridOptions.api.forEachNode( function(node) {
    var data = node.data;
    data.ratio = 0;
    updatedNodes.push(node);
});

$scope.gridOptions.api.refreshCells(updatedNodes, ['ratio']);