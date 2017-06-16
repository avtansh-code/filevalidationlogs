import { FVLIfcFacadeService } from '../../fvl_home_core/services/FVLFacadeService/FVLIfcFacadeService';


//Class defining the controller for the listVew directive

export class listViewController{

    private fvlFacadeService: FVLIfcFacadeService;
    private list:string[];
    private styling:any;
    private totalItems:number;
    private currentPage:number;
    private itemsPerPage:number;
    private maxSize:number;

    constructor(fvlFacadeService: FVLIfcFacadeService){
        this.fvlFacadeService = fvlFacadeService;
    }
    
    
    /**
     * @returns void
     * Initializing the variables in the controller for their initial values
     */
    private datainit():void{
        this.totalItems = this.list.length;
        this.currentPage = 1;
        this.itemsPerPage = this.fvlFacadeService.pagesize;
        this.maxSize = 5; 
    }

}

listViewController.$inject = ['FVLFacadeService'];