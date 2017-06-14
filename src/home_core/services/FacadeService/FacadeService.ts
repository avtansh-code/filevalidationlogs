import {IfcDataExchangeService} from '../DataExchangeService/IfcDataExchangeService';
import {IfcDataManipulationService} from '../DataManipulationService/IfcDataManipulationService';
import {IfcFacadeService} from './IfcFacadeService'

export class FacadeService implements IfcFacadeService{
    private DataExchangeService: IfcDataExchangeService;
    private DataManipulationService: IfcDataManipulationService;    

    constructor(DataExchangeService: IfcDataExchangeService, DataManipulationService: IfcDataManipulationService){
        this.DataExchangeService = DataExchangeService;
        this.DataManipulationService = DataManipulationService;
    }

    public set data(rdata: any){
        this.DataExchangeService.data = rdata;
    }
    public get data(){
        return this.DataExchangeService.data;
    }

    public set pagesize(psize:number){
        this.DataExchangeService.pagesize = psize;
    }
    public get pagesize():number{
        return this.DataExchangeService.pagesize;
    }

    public set listcolor(lcolor){
        this.DataExchangeService.listcolor = lcolor;
    }
    public get listcolor(){
        return this.DataExchangeService.listcolor;
    }

    public set labelsize(lsize){
        this.DataExchangeService.labelsize = lsize;
    }
    public get labelsize(){
        return this.DataExchangeService.labelsize;
    }

    public set textsize(tsize){
        this.DataExchangeService.textsize = tsize;
    }
    public get textsize(){
        return this.DataExchangeService.textsize;
    }

    public get list_names(){
        return this.DataExchangeService.list_names;
    }

    public get file_list(){
        return this.DataExchangeService.file_list;
    }

    public totalcount(list:string):number{
        return this.DataManipulationService.totalcount(list);
    }

    public filecount(file:string):number{
        return this.DataManipulationService.filecount(file);
    }

    public downloadlinkHtml():void{
        this.DataManipulationService.downloadlinkHtml();
    }

    public initializestyles():void{
        this.DataManipulationService.initializestyles();
    }

    public get labelstyle():any{
        return this.DataManipulationService.labelstyle;
    }
    public get textstyle():any{
        return this.DataManipulationService.textstyle;
    }

    public get labeltext():any{
        return this.DataManipulationService.labeltext;
    }
}

FacadeService.$inject = ['DataExchangeService','DataManipulationService'];