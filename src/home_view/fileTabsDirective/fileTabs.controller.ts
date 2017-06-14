import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';

export class fileTabsController{

    private facadeService: IfcFacadeService;
    private data:any;
    private pageSize:number;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private downloadIcon:string;
    // static AngularDependencies = [fileTabsController];

    constructor(facadeService: IfcFacadeService){
        this.facadeService = facadeService;
    }

    public datainit():void{
        if(this.downloadIcon === undefined)
				this.downloadIcon = 'block';

		if(this.pageSize === undefined)
				this.pageSize = 20;

        this.facadeService.pagesize = this.pageSize;
        this.facadeService.listcolor = this.listcolors;
        this.facadeService.labelsize = this.labelsize;
        this.facadeService.textsize = this.textsize;
    }
    public file_list():string[]{
        return (Object.keys(this.data));
    }

    public list_names():string[]{
        var files:string[] = this.file_list();
        return (Object.keys(this.data[files[0]]));
    } 

    public total_count(list:string):number{
        var file:string;
        var t_count:number = 0;
        for (let file of this.file_list()) 
        {
            t_count = t_count + this.data[file][list].length;
        }
        return t_count;
    }

    public file_count(file:string):number{
        var list:string;
        var f_count:number = 0;
        for (let list of this.list_names()) 
        {
            f_count = f_count + this.data[file][list].length;
        }
        return f_count;
    }

    public listcolor(list:string):string{
        return this.listcolors[list];
    }

    public filedata(file:string):any{
        return this.data[file];
    }

    public setupDownloadLink():void{
        /*Loops to build the logs file that has to be downloaded*/
        var logs:string;
        var list:string;
        var file:string;
        logs = 'The file(s) contains';
        var length:number = this.list_names().length;
        var count:number= 0;

        for(let list of this.list_names()){
            logs = `${logs} 
                <b>${this.total_count(list)} ${list} </b>`;
            if(count < length-1)
                logs = `${logs}and `;
            count++;
        }

        logs = `${logs}\n\n`;
        for (let file of this.file_list()) 
        {
                if(this.file_count(file) > 0){
                    logs = `${logs}\t<h1>${file}</h1>\n\t<div>\n`;
                    for(let list of this.list_names())
                    {
                        if(this.data[file][list].length>0)
                        {
                            logs = `${logs}\t\t<h4>${list}
                            (${this.data[file][list].length})</h4>\n`;
                            logs = `${logs}\t\t<ul>\n`;
                            for(var count = 0; 
                                count < this.data[file][list].length; 
                                count++)
                            {
                                
                                logs = `${logs}\t\t\t<li>
                                ${this.data[file][list][count]}
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

fileTabsController.$inject = ['FacadeService'];