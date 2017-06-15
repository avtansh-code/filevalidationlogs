import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';

//Class defining the controller for accordionView directive
export class accordionViewController{

    private facadeService: IfcFacadeService;
    private filedata:any;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private labelText:any = [];
    private labelStyle:any = [];
    private textStyle:any = [];

    constructor(facadeService: IfcFacadeService){
        this.facadeService = facadeService;
    }
    
    
    /**
     * @returns void
     * initializing the variables with their default values
     * some variables are given a value that have been stored in services
     */
    private datainit():void{
        this.listcolors = this.facadeService.listcolor;
        this.labelsize = this.facadeService.labelsize;
        this.textsize = this.facadeService.textsize;
        
        this.facadeService.initializestyles();

        this.labelText = this.facadeService.labeltext;
        this.labelStyle = this.facadeService.labelstyle;
        this.textStyle = this.facadeService.textstyle;
    }

    
    /**
     * @returns string
     * returning the names of the lists that are present in the data
     */
    private list_names():string[]{
        return this.facadeService.list_names;
    }
}

accordionViewController.$inject = ['FacadeService'];