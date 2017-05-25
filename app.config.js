angular.module('filevalidationlogs', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ui.bootstrap']);
angular.module('filevalidationlogs').directive('fileTabs', function() {
  	return {
	    restrict: 'E',
		scope:{
			data: '=',
			textcolors: '=',
			labelcolors: '=',
			labelbg: '=',
			labelweight: '@',
			labelsize: '@',
			textsize: '@',
			downloadIcon: '@'
		},
		controller: function($scope){
			if($scope.downloadIcon === undefined)
				$scope.downloadIcon = 'block';
			$scope.file_list = Object.keys($scope.data);
			$scope.list_names = Object.keys($scope.data[$scope.file_list[0]]);
			$scope.labelStyle = new Array();
			for(var i=0;i<$scope.list_names.length;i++){
				$scope.labelStyle[i]={
					'color': $scope.labelcolors[$scope.list_names[i]],
					'font-weight': $scope.labelweight,
					'font-size': $scope.labelsize
				}
			}
			$scope.textStyle = new Array();
			for(var i=0;i<$scope.list_names.length;i++){
				$scope.textStyle[i]={
					'font-size': $scope.textsize,
					'color': $scope.textcolors[$scope.list_names[i]]
				}
			}  
			$scope.logs = '';
			for (var i = 0; i < $scope.file_list.length; i++) {
					$scope.logs = $scope.logs + '\t<h1>'+$scope.file_list[i]+'</h1>\n\t<div>\n';
					for(var j = 0; j < $scope.list_names.length; j++){
						$scope.logs = $scope.logs + '\t\t<h4>'+$scope.list_names[j]+'</h4>\n';
						$scope.logs = $scope.logs + '\t\t<ul>\n';
						for(var k = 0; k < $scope.data[$scope.file_list[i]][$scope.list_names[j]].length; k++){
							$scope.logs = $scope.logs + '\t\t\t<li>'+$scope.data[$scope.file_list[i]][$scope.list_names[j]][k]+'</li>\n';
						}
						$scope.logs = $scope.logs + '\t\t</ul><br/>\n';
					}
					$scope.logs = $scope.logs + '\t</div><br/><br/>\n';
			}			

			$scope.setupDownloadLink = function(code) {
			    var uri = 'data:text/html;charset=utf-8,' + encodeURIComponent($scope.logs);
			    var downloadLink = document.createElement("a");
			    downloadLink.setAttribute("href", uri);
			    downloadLink.setAttribute("download", "errors and warnings.html");
			    document.body.appendChild(downloadLink);
		       	downloadLink.click();
		       	document.body.removeChild(downloadLink);
			};
		},
	    templateUrl: 'pageView.html'	
  	};
});

angular.module('filevalidationlogs').directive('listDisplay', function(){
	return {
		restrict: 'A',
		scope:{
			list: '=',
			listType: '=',
			styling: '='
		},
		controller: function($scope){
			if($scope.list.length === 0){
				$scope.list[0] = 'No '+$scope.listType+'s to show.';
			}
			$scope.totalItems = $scope.list.length;
  			$scope.currentPage = 1;
  			$scope.itemsPerPage = 5;
  			$scope.maxSize = 5; //Number of pager buttons to show

  			$scope.setPage = function (pageNo) {
    			$scope.currentPage = pageNo;
  			};

  			$scope.pageChanged = function() {
    			console.log('Page changed to: ' + $scope.currentPage);
  			};

			$scope.setItemsPerPage = function(num) {
			  	$scope.itemsPerPage = num;
			  	$scope.currentPage = 1; //reset to first paghe
			}
		},
		templateUrl: 'listView.html'
	};
});