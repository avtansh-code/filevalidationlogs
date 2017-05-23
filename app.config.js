angular.module('filevalidationlogs', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
.directive('fileTabs', function() {
  return {
    restrict: 'E',
	scope:{
		data: '=',
		textcolors: '=',
		labelcolors: '=',
		labelbg: '=',
		labelweight: '@',
		labelsize: '@',
		textsize: '@'
	},
	controller: function($scope){
		$scope.file_list = Object.keys($scope.data);
		$scope.lists = Object.keys($scope.data[$scope.file_list[0]]);
		$scope.labelStyle = new Array();
		for(var i=0;i<$scope.lists.length;i++){
			$scope.labelStyle[i]={
				'color': $scope.labelcolors[$scope.lists[i]],
				'font-weight': $scope.labelweight,
				'font-size': $scope.labelsize
			}
		}
		$scope.textStyle = new Array();
		for(var i=0;i<$scope.lists.length;i++){
			$scope.textStyle[i]={
				'font-size': $scope.textsize,
				'color': $scope.textcolors[$scope.lists[i]]
			}
		}
	},
    templateUrl: 'tags.html'	
  };
});
