export const fileTabsHtml: string = `
<div class="top_bar">
    The file(s) contains 
    <span ng-repeat="list in list_names() track by $index"
    ng-style="{'color': listcolor(list)}"
    ng-if="total_count(list)>0">
        <b>{{total_count(list)}} {{list | uppercase}}</b>
            <span ng-if="$index < list_names().length-1" class="and-text">
            and
            </span>
    </span>
    <p class="download" 
        ng-click="setupDownloadLink()" 
        ng-style='{"display": downloadIcon()}'>
            <span class="glyphicon glyphicon-download-alt"></span>
    </p>
</div>
<div ng-cloak="" class="tabsdemoDynamicHeight tabs">
    <md-content>
    <md-tabs md-dynamic-height md-border-bottom>
        <md-tab ng-repeat="file in file_list() track by $index" 
        label="{{file}}"
        ng-if="file_count(file)>0">
        <md-content class="md-padding">
                <div accordion-view filedata=data[file]>
                </div>
        </md-content>
        </md-tab>    
    </md-tabs>  
    </md-content>
</div>`;