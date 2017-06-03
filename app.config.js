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
			downloadIcon: '=',
			pageSize: '='
		},
		controller: function($scope){
			
			if($scope.downloadIcon === undefined)
				$scope.downloadIcon = 'block';

			if($scope.pageSize === undefined)
				$scope.pageSize = 10;

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
			for (var file_no = 0; file_no < $scope.list_names.length; file_no++)
				$scope.total_count[file_no] = 0;

			$scope.file_count = new Array();
			for (var file_no = 0; file_no < $scope.file_list.length; file_no++)
				$scope.file_count[file_no] = 0;


			$scope.logs = '';
			for (var file_no = 0; file_no < $scope.file_list.length; file_no++) 
			{
					$scope.logs = `${$scope.logs}\t<h1>${$scope.file_list[file_no]}</h1>\n\t<div>\n`;
					for(var list_no = 0; list_no < $scope.list_names.length; list_no++)
					{
						if($scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length>0)
						{
							$scope.logs = `${$scope.logs}\t\t<h4>${$scope.list_names[list_no]}</h4>\n`;
							$scope.logs = `${$scope.logs}\t\t<ul>\n`;
							for(var count = 0; 
								count < $scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length; 
								count++)
							{
								
								$scope.logs = `${$scope.logs}\t\t\t<li>
								${$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]][count]}
								</li>\n`;
							}
							$scope.logs = `${$scope.logs}\t\t</ul><br/>\n`;
						}
						$scope.total_count[list_no] = $scope.total_count[list_no] + 
														$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length;
						$scope.file_count[file_no] = $scope.file_count[file_no] + 
														$scope.data[$scope.file_list[file_no]][$scope.list_names[list_no]].length;
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

	    link: function($scope,element){
	    	$(function ($) {
				$('.collapse').on('show.bs.collapse hidden.bs.collapse', function () {
			    	$(this).prev().find('.glyphicon').toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
			    })
			});	
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
						  label="{{file}}"
						  ng-if="file_count[$index]>0">
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
												ng-class="{'glyphicon-chevron-down': status.open, 'glyphicon-chevron-right': !status.open}" 
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

mod.controller('myCtrl',function($scope){
	$scope.sample_data1 = {
		"raw_input_file_0.txt":{
			"errors":[
				"Row Number <b>21</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>6</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>32</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>18</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>12</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>11</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>102</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>44</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>73</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>97</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>20</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>15</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value"
				],
			"warnings":[
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8192</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8197</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>6</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>7</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>10</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>11</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>12</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>13</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>14</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>20</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>22</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>23</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>24</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>25</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>26</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9562</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>30</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>31</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>32</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>33</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>34</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>35</b> : column <b>Area</b> has <b>missing</b> value"
				]
			},
		"metadata_mq_0.xlsx":{
			"errors":[
				"Row Number <b>21</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>6</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value"
				],
			"warnings":[
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>14</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>20</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>22</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>23</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>24</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>25</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>26</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9562</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>30</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>31</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>32</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>33</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>34</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>35</b> : column <b>Area</b> has <b>missing</b> value"
			]
		}
	};
	$scope.sample_data2 = {
		"raw_input_file_0.txt":{
			"errors":[],
			"warnings":[
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>14</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>20</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>22</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>23</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>24</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>25</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>26</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9562</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>30</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>31</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>32</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>33</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>34</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>35</b> : column <b>Area</b> has <b>missing</b> value"
			]
		},
		"metadata_mq_0.xlsx":{
			"errors":[
				"Row Number <b>211</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>16</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>21</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>6</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>32</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>18</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>12</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>11</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>102</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>44</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>73</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>97</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>20</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>15</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value"
				],
				"warnings":[]
			}
		};
		$scope.sample_data3 = {
		"raw_input_file_0.txt":{
			"errors":[
				"Row Number <b>21</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>6</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>32</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>18</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>12</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>11</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>102</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>44</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>73</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>97</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value",
				"Row Number <b>20</b> : column <b>SAMPLE_#SNYGTT5_2_5</b> has <b>negative</b> value", 
				"Row Number <b>15</b> : column <b>SAMPLE_#SNYGTT5_2_10</b> has <b>negative</b> value"
				],
			"warnings":[
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8192</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8197</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>6</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>7</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>8</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>10</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>11</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>12</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>13</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>14</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>20</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>22</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>23</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>24</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>25</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>26</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>9562</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>30</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>31</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>32</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>33</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>34</b> : column <b>Area</b> has <b>missing</b> value",
				"<b>Action</b>: Missing value of columns replaced with 0<br/><b>Message</b>: Row Number <b>35</b> : column <b>Area</b> has <b>missing</b> value"
				]
			},
		"metadata_mq_0.xlsx":{
			"errors":[],
			"warnings":[]
		}
	};
	$scope.dataset = 1;
	$scope.paginationsize = 10;
});