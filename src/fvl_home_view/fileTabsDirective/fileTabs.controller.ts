import { FVLIfcFacadeService } from '../../fvl_home_core/services/FVLFacadeService/FVLIfcFacadeService';

//Class defining the controller for the main fileTabs directive
export class fileTabsController{

    private fvlFacadeService: FVLIfcFacadeService;
    private data:any;
    private pageSize:number;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private downloadIcon:string;

    constructor(fvlFacadeService: FVLIfcFacadeService){
        this.fvlFacadeService = fvlFacadeService;
    }

    
    /**
     * @returns void
     * initialize the variables with initial values
     * some values are stored in the services
     */
    public datainit():void{
        if(this.downloadIcon === undefined){
				this.downloadIcon = 'block';
        }

		if(this.pageSize === undefined){
				this.pageSize = 20;
        }
                
        this.fvlFacadeService.data = this.data;
        this.fvlFacadeService.pagesize = this.pageSize;
        this.fvlFacadeService.listcolor = this.listcolors;
        this.fvlFacadeService.labelsize = this.labelsize;
        this.fvlFacadeService.textsize = this.textsize;
    }

    
    /**
     * @returns string
     * return the list of files present in the data
     * returned value called from fvlFacadeService
     */
    public file_list():string[]{
        return this.fvlFacadeService.file_list;
    }

    
    /**
     * @returns string
     * returns the names of all the lists present in the data
     * returned value called from fvlFacadeService
     */
    public list_names():string[]{
        return this.fvlFacadeService.list_names;
    } 

    
    /**
     * @param  {string} list
     * @returns number
     * returns the total count of the logs present in all the files for the passed listname
     * returned value called from fvlFacadeService
     */
    public total_count(list:string):number{
        return this.fvlFacadeService.totalcount(list);
    }

    
    /**
     * @param  {string} file
     * @returns number
     * returns the count of the total logs given in the passed filename
     * returned value called from fvlFacadeService
     */
    public file_count(file:string):number{
        return this.fvlFacadeService.filecount(file);
    }

    
    /**
     * @param  {string} list
     * @returns string
     * returns the color associated to the passed list
     */
    public listcolor(list:string):string{
        return this.listcolors[list];
    }

    
    /**
     * @param  {string} file
     * @returns any
     * returns the data for a particular file(the one passed as argument)
     */
    public filedata(file:string):any{
        return this.data[file];
    }

   
    /**
     * @returns void
     * setting up the download link - including the download action
     */
    public setupDownloadLink():void{ 
        this.fvlFacadeService.downloadlinkHtml();
    }
}

fileTabsController.$inject = ['FVLFacadeService'];