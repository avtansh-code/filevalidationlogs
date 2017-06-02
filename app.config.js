var mod = angular.module('filevalidationlogs', [
				'ngMaterial', 
				'ui.bootstrap',
				'ngSanitize']);

mod.directive('fileTabs', function() {
  	return {
	    restrict: 'E',
		scope:{
			data: '=',
			textcolors: '=',
			labelbg: '=',
			labelweight: '@',
			labelsize: '@',
			textsize: '@',
			downloadIcon: '@',
			pageSize: '@'
		},
		controller: function($scope){
			if($scope.downloadIcon === undefined)
				$scope.downloadIcon = 'block';

			if($scope.pageSize === undefined)
				$scope.pageSize = 2;

			$scope.file_list = Object.keys($scope.data);

			$scope.list_names = Object.keys($scope.data[$scope.file_list[0]]);
			$scope.labelStyle = new Array();
			for(var count = 0; count<$scope.list_names.length; count++){
				$scope.labelStyle[count] = {
					'color': $scope.textcolors[$scope.list_names[count]],
					'font-weight': $scope.labelweight,
					'font-size': $scope.labelsize
				}
			}
			$scope.textStyle = new Array();
			for(var count = 0; count<$scope.list_names.length; count++){
				$scope.textStyle[count] = {
					'font-size': $scope.textsize,
					'color': $scope.textcolors[$scope.list_names[count]]
				}
			}  
				
			$scope.total_count = new Array();
			for (var i = 0; i < $scope.list_names.length; i++)
				$scope.total_count[i] = 0;

			$scope.file_log_count = new Array();
			for (var i = 0; i < $scope.file_list.length; i++)
				$scope.file_log_count[i] = 0;

			$scope.logs = '';
			for (var i = 0; i < $scope.file_list.length; i++) 
			{
					$scope.logs = `${$scope.logs}\t<h1>${$scope.file_list[i]}</h1>\n\t<div>\n`;
					for(var j = 0; j < $scope.list_names.length; j++)
					{
						if($scope.data[$scope.file_list[i]][$scope.list_names[j]].length>0)
						{
							$scope.logs = `${$scope.logs}\t\t<h4>${$scope.list_names[j]}</h4>\n`;
							$scope.logs = `${$scope.logs}\t\t<ul>\n`;
							for(var k = 0; 
								k < $scope.data[$scope.file_list[i]][$scope.list_names[j]].length; 
								k++)
							{
								
								$scope.logs = `${$scope.logs}\t\t\t<li>
								${$scope.data[$scope.file_list[i]][$scope.list_names[j]][k]}
								</li>\n`;
							}
							$scope.logs = `${$scope.logs}\t\t</ul><br/>\n`;
						}
						$scope.total_count[j] = $scope.total_count[j] + $scope.data[$scope.file_list[i]][$scope.list_names[j]].length;
						$scope.file_log_count[i] = $scope.file_log_count[i] + $scope.data[$scope.file_list[i]][$scope.list_names[j]].length;
					}
					$scope.logs = `${$scope.logs}\t</div><br/><br/>\n`;
					
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

	    template: 	`<div class="top_bar" style="font-size: 1.8em; padding-right: 0.8em;
	    				padding-left: 0.8em; padding-bottom: 0.5em; padding-top: 0.2em; font-weight: bold;">
	    				|<span ng-repeat="list in list_names track by $index">
	    					{{list | uppercase}} = {{total_count[$index]}} | 
	    				</span>
						<p class="download" 
							ng-click="setupDownloadLink()" 
							ng-style='{"display": downloadIcon}'
							style="float: right; right:0; top: 0;">
								<span class="glyphicon glyphicon-download-alt" style="margin: 0px;"></span>
						</p>
	    			</div>
	    			<div ng-cloak="" class="tabsdemoDynamicHeight tabs">
					  <md-content style="background: white; border: 1px solid #e1e1e1; margin-top: 0;">
					    <md-tabs md-dynamic-height md-border-bottom
					    style="background: white; border: 1px solid #e1e1e1; ">
					      <md-tab ng-repeat="file in file_list track by $index" 
						  	ng-if="file_log_count[$index]>0"
						  label="{{file}}">
					        <md-content class="md-padding">
								  <uib-accordion>
									<div uib-accordion-group
								  		ng-repeat="lname in list_names" data-ng-show="data[file][lname].length>0"
								  		style="border:1px solid #000000;" is-open="status.open">
										<uib-accordion-heading ng-style="{'background-color': '{{labelbg[lname]}}'}">
											<h4 ng-style="labelStyle[{{$index}}]">{{lname | uppercase}} |
											<span style="font-size:0.75em; font-weight:normal">
													Count: {{data[file][lname].length}}
												</span>
										    <i class="pull-right glyphicon" 
												ng-class="{'glyphicon-chevron-down': status.open, 
												'glyphicon-chevron-right': !status.open}"
										    	style="float:right;"></i></h4>
										</uib-accordion-heading>
										<div list-display list="data[file][lname]" list-type="lname" 
											styling="textStyle[$index]">
										</div>
									</div>
								</uib-accordion>
							</md-content>
					      </md-tab>    
					    </md-tabs>  
					  </md-content>
					</div>`
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
		controller: function($scope){
			$scope.totalItems = $scope.list.length;
  			$scope.currentPage = 1;
  			$scope.itemsPerPage = $scope.$parent.pageSize;
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
		template: `<ul class="list-group" style="padding-left:2em;">
					<li ng-repeat="list_item in list.slice(((currentPage-1)*itemsPerPage), 
						((currentPage)*itemsPerPage))" 
						ng-style="styling">
								<div ng-bind-html="list_item"></div>
					</li>
				</ul>
				<center>
					<ul uib-pagination total-items="totalItems" 
						ng-model="currentPage" 
						max-size="maxSize" 
						class="pagination-sm"
						rotate="false"
						items-per-page="itemsPerPage" 
						previous-text="&lsaquo;" 
						next-text="&rsaquo;" 
						first-text="&laquo;" 
						last-text="&raquo;"
						data-ng-show="list.length > itemsPerPage">
					</ul>
				</center>`
	};
});