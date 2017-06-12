export class fileTabsController{

    static AngularDependencies = ['$scope', fileTabsController];

    constructor(private $scope: ng.IScope){
        if($scope.downloadIcon === undefined)
				$scope.downloadIcon = 'block';

		if($scope.pageSize === undefined)
				$scope.pageSize = 20;
    }
    private file_list():string[]{
        return (Object.keys(this.$scope.data));
    }

    private list_names():string[]{
        var files = this.file_list;
        return (Object.keys(files[0]));
    } 

    private total_count(list:string):number{
        var file:string;
        var total_count:number;
        while (file in this.file_list) 
        {
            total_count = total_count + this.$scope.data[file][list].length;
        }
        return total_count;
    }
    private file_count(file:string):number{
        var list:string;
        var file_count:number;
        for (list in this.list_names) 
        {
            file_count = file_count + this.$scope.data[file][list].length;
        }
        return file_count;
    }
    private listcolor(list:string):string{
        return this.$scope.listcolors[list];
    }
    private setupDownloadLink():void{
        /*Loops to build the logs file that has to be downloaded*/

        var logs:string;
        var list:string;
        var file:string;
        logs = 'The file(s) contains';
        for(list in this.list_names){
            logs = `${logs} 
                <b>${this.total_count(list)} ${list} </b>`;
            if(list != this.list_names[this.list_names.length])
                logs = `${logs}and `;
        }


        logs = `${logs}\n\n`;
        for (file in this.file_list) 
        {
                if(this.file_count(file) > 0){
                    logs = `${logs}\t<h1>${file}</h1>\n\t<div>\n`;
                    for(list in this.list_names)
                    {
                        if(this.$scope.data[file][list].length>0)
                        {
                            logs = `${logs}\t\t<h4>${list}
                            (${this.$scope.data[file][list].length})</h4>\n`;
                            logs = `${logs}\t\t<ul>\n`;
                            for(var count = 0; 
                                count < this.$scope.data[file][list].length; 
                                count++)
                            {
                                
                                logs = `${logs}\t\t\t<li>
                                ${this.$scope.data[file][list][count]}
                                </li>\n`;
                            }
                            logs = `${logs}\t\t</ul><br/>\n`;
                        }
                    }
                    logs = `${logs}\t</div><br/><br/>\n`;
                }

        }		

        /*This section generates the action of download when the download button is clicked.
        It generates a temporary anchor tag that is used to download the required html file.
        And then it deletes that anchor tag once done.*/

        var uri = 'data:text/html;charset=utf-8,' + encodeURIComponent(logs);
        var downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", uri);
        downloadLink.setAttribute("download", "errors and warnings.html");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}