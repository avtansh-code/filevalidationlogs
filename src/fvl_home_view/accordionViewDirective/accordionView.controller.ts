import { FVLIfcFacadeService } from '../../fvl_home_core/services/FVLFacadeService/FVLIfcFacadeService';

//Class defining the controller for accordionView directive
export class accordionViewController{

    private fvlFacadeService: FVLIfcFacadeService;
    private filedata:any;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private labelText:any = [];
    private labelStyle:any = [];
    private textStyle:any = [];

    constructor(fvlFacadeService: FVLIfcFacadeService){
        this.fvlFacadeService = fvlFacadeService;
    }
    
    
    /**
     * @returns void
     * initializing the variables with their default values
     * some variables are given a value that have been stored in services
     */
    private datainit():void{
        this.listcolors = this.fvlFacadeService.listcolor;
        this.labelsize = this.fvlFacadeService.labelsize;
        this.textsize = this.fvlFacadeService.textsize;
        
        this.fvlFacadeService.initializestyles();

        this.labelText = this.fvlFacadeService.labeltext;
        this.labelStyle = this.fvlFacadeService.labelstyle;
        this.textStyle = this.fvlFacadeService.textstyle;
    }

    
    /**
     * @returns string
     * returning the names of the lists that are present in the data
     */
    private list_names():string[]{
        return this.fvlFacadeService.list_names;
    }
}

accordionViewController.$inject = ['FVLFacadeService'];