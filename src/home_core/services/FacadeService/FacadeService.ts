import {IfcDataExchangeService} from '../DataExchangeService/IfcDataExchangeService';
import {IfcFacadeService} from './IfcFacadeService'

export class FacadeService implements IfcFacadeService{
    private DataExchangeService: IfcDataExchangeService;

    constructor(DataExchangeService: IfcDataExchangeService){
        this.DataExchangeService = DataExchangeService;
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
}

FacadeService.$inject = ['DataExchangeService'];