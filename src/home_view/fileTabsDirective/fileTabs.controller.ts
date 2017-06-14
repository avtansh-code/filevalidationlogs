import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';

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
    public file_list():string[]{
        return this.facadeService.file_list;
    }

    public list_names():string[]{
        return this.facadeService.list_names;
    } 

    public total_count(list:string):number{
        return this.facadeService.totalcount(list);
    }

    public file_count(file:string):number{
        return this.facadeService.filecount(file);
    }

    public listcolor(list:string):string{
        return this.listcolors[list];
    }

    public filedata(file:string):any{
        return this.data[file];
    }

    public setupDownloadLink():void{ 
        this.facadeService.downloadlinkHtml();
    }
}

fileTabsController.$inject = ['FacadeService'];