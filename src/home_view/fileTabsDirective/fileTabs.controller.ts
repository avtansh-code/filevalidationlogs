import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';

//Class defining the controller for the main fileTabs directive
export class fileTabsController{

    private facadeService: IfcFacadeService;
    private data:any;
    private pageSize:number;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private downloadIcon:string;

    constructor(facadeService: IfcFacadeService){
        this.facadeService = facadeService;
    }

    /*initialize the variables with initial values
    some values are stored in the services*/
    public datainit():void{
        if(this.downloadIcon === undefined)
				this.downloadIcon = 'block';

		if(this.pageSize === undefined)
				this.pageSize = 20;
                
        this.facadeService.data = this.data;
        this.facadeService.pagesize = this.pageSize;
        this.facadeService.listcolor = this.listcolors;
        this.facadeService.labelsize = this.labelsize;
        this.facadeService.textsize = this.textsize;
    }

    /*return the list of files present in the data
    returned value called from facadeservice*/
    public file_list():string[]{
        return this.facadeService.file_list;
    }

    /*returns the names of all the lists present in the data
    returned value called from facadeservice*/
    public list_names():string[]{
        return this.facadeService.list_names;
    } 

    /*returns the total count of the logs present in all the files for the passed listname
    returned value called from facadeservice*/
    public total_count(list:string):number{
        return this.facadeService.totalcount(list);
    }

    /*returns the count of the total logs given in the passed filename
    returned value called from facadeservice*/
    public file_count(file:string):number{
        return this.facadeService.filecount(file);
    }

    //returns the colors of the list passed
    public listcolor(list:string):string{
        return this.listcolors[list];
    }

    //returns the data for a particular file(the one passed as argument)
    public filedata(file:string):any{
        return this.data[file];
    }

    /*setting up the download link
    returned value called from facadeservice*/
    public setupDownloadLink():void{ 
        this.facadeService.downloadlinkHtml();
    }
}

fileTabsController.$inject = ['FacadeService'];