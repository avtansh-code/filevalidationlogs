var mod = angular.module('filevalidationlogs', [
				'ngMaterial', 
				'ui.bootstrap',
				'ngSanitize']);

mod.directive('fileTabs', function() {
  	return {
	    restrict: 'E',
		scope:{
			data: '=',
			listcolors: '=',
			labelsize: '@',
			textsize: '@',
			downloadIcon: '@',
			pageSize: '@',
			title: '@'
		},

		controller: ['$scope',function($scope){

			/*This function is used to convert the hex value of a color to its RGB format.
			It takes in a hex string as input and outputs three variables R,G and B, ie, their 
			cooresponding values*/

			$scope.hexToRgb = function(hex){
				var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
				hex = hex.replace(shorthandRegex, function(m, r, g, b) {
					return r + r + g + g + b + b;
				});

				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : null;
			}

			if($scope.downloadIcon === undefined)
			{	
				$scope.downloadIcon = 'block';
			}

			if($scope.pageSize === undefined)
			{	
				$scope.pageSize = 20;
			}

			$scope.customTitle = "true";
			if($scope.title === undefined){
				$scope.customTitle = false;
			}

			console.log($scope.customTitle);
			$scope.file_list = Object.keys($scope.data);
			$scope.list_names = Object.keys($scope.data[$scope.file_list[0]]);

			$scope.labelText = new Array();
			$scope.textStyle = new Array();
			$scope.labelStyle = new Array();
			var r,g,b;

			/*A loop to build the styling objects for the template*/

			for(var count = 0; count<$scope.list_names.length; count++){
				if($scope.listcolors === undefined){
					$scope.labelText[count] = {
						'color': '#000000',
						'font-size': $scope.labelsize
					}
					$scope.textStyle[count] = {
						'font-size': $scope.textsize,
						'color': '#000000',
						'font-weight': 'bold'
					}
					r = $scope.hexToRgb('#000000').r;
					g = $scope.hexToRgb('#000000').g;
					b = $scope.hexToRgb('#000000').b;
					$scope.labelStyle[count] = {
						'background-color': 'rgba('+r+','+g+','+b+','+'0.3)',
						'border-bottom': '0.5px solid #000'
					}
					continue;	
				}
				$scope.labelText[count] = {
					'color': $scope.listcolors[$scope.list_names[count]],
					'font-size': $scope.labelsize,
					'font-weight': 'bold'
				}
				$scope.textStyle[count] = {
					'font-size': $scope.textsize,
					'color': $scope.listcolors[$scope.list_names[count]]
				}
				r = $scope.hexToRgb($scope.listcolors[$scope.list_names[count]]).r;
				g = $scope.hexToRgb($scope.listcolors[$scope.list_names[count]]).g;
				b = $scope.hexToRgb($scope.listcolors[$scope.list_names[count]]).b;
				$scope.labelStyle[count] = {
					'background-color': 'rgba('+r+','+g+','+b+','+'0.3)',
					'border-bottom': '1px solid '+$scope.listcolors[$scope.list_names[count]]
				}
			}
				
			$scope.total_count = new Array();
			$scope.file_count = new Array();

			//Loops to initialize the arrays
			for (var file_no = 0; file_no < $scope.list_names.length; file_no++)
				$scope.total_count[file_no] = 0;

			for (var file_no = 0; file_no < $scope.file_list.length; file_no++)
				$scope.file_count[file_no] = 0;
			
			//Loops to count the number of errors and warnings in each file and in total
			for (var file_no = 0; file_no < $scope.file_list.length; file_no++) 
			{
					for(var list_no = 0; list_no < $scope.list_names.length; list_no++)
					{
						$scope.total_count[list_no] = $scope.total_count[list_no] + 
														$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length;
						$scope.file_count[file_no] = $scope.file_count[file_no] + 
														$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length;
					}
			}		
			
			/*Loops to build the logs file that has to be downloaded*/

			$scope.logs = 'The file(s) contains ';
			for(var list_no = 0; list_no < $scope.list_names.length; list_no++){
				$scope.logs += '<b>'+$scope.total_count[list_no]+$scope.list_names[list_no]+'</b> ';
				if(list_no < $scope.list_names.length - 1)
					$scope.logs += 'and ';
			}


			$scope.logs += '\n\n';
			for (var file_no = 0; file_no < $scope.file_list.length; file_no++) 
			{
					if($scope.file_count[file_no] > 0){
						$scope.logs += '\t<h1>'+$scope.file_list[file_no]+'</h1>\n\t<div>\n';
						for(var list_no = 0; list_no < $scope.list_names.length; list_no++)
						{
							if($scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length>0)
							{
								$scope.logs += '\t\t<h4>'+$scope.list_names[list_no]+
								'('+$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length
								+')</h4>\n';
								$scope.logs += '\t\t<ul>\n';
								for(var count = 0; 
									count < $scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length; 
									count++)
								{
									
									$scope.logs += '\t\t\t<li>'+
									$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]][count]+
									'</li>\n';
								}
								$scope.logs += '\t\t</ul><br/>\n';
							}
						}
						$scope.logs += '\t</div><br/><br/>\n';
					}

			}		

			/*This funtion generates the action of download when the download button is clicked.
			It generates a temporary anchor tag that is used to download the required html file.
			And then it deletes that anchor tag once done.*/

			$scope.setupDownloadLink = function(code) {
			    var uri = 'data:text/html;charset=utf-8,' + encodeURIComponent($scope.logs);
			    var downloadLink = document.createElement("a");
			    downloadLink.setAttribute("href", uri);
			    downloadLink.setAttribute("download", "errors and warnings.html");
			    document.body.appendChild(downloadLink);
		       	downloadLink.click();
		       	document.body.removeChild(downloadLink);
			};
		}],

		templateUrl: 'filetabs.html'	
  	};
});

mod.directive('listDisplay', function(){
	return {
		restrict: 'A',
		scope:{
			list: '=',
			listType: '=',
			styling: '='
		},
		controller: ['$scope',function($scope){
			$scope.totalItems = $scope.list.length;
  			$scope.currentPage = 1;
  			$scope.itemsPerPage = $scope.$parent.pageSize;
  			$scope.maxSize = 5; //Number of pager buttons to show
		}],
		template: 
'<ul class="list-group"> <li ng-repeat="list_item in list.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))" ng-style="styling"> <div ng-bind-html="list_item"></div> </li> </ul> <center> <ul uib-pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" rotate="false" items-per-page="itemsPerPage" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" data-ng-show="list.length > itemsPerPage"> </ul> </center>'	
	};
});