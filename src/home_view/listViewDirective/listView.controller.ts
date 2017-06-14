import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';


//Class defining the controller for the listVew directive

export class listViewController{

    private facadeService: IfcFacadeService;
    private list:string[];
    private styling:any;
    private totalItems:number;
    private currentPage:number;
    private itemsPerPage:number;
    private maxSize:number;

    constructor(facadeService: IfcFacadeService){
        this.facadeService = facadeService;
    }
    
    //Initializing the variables in the controller for their initial values
    private datainit(){
        this.totalItems = this.list.length;
        this.currentPage = 1;
        this.itemsPerPage = this.facadeService.pagesize;
        this.maxSize = 5; 
    }

}

listViewController.$inject = ['FacadeService'];