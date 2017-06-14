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

    //store data jsonfile in the DataExchangeService
    public set data(rdata: any){
        this.DataExchangeService.data = rdata;
    }

    //return data jsonfile from the DataExchangeService
    public get data(){
        return this.DataExchangeService.data;
    }

    //store pagesize in the DataExchangeService
    public set pagesize(psize:number){
        this.DataExchangeService.pagesize = psize;
    }
    
    //return pagesize from the DataExchangeService
    public get pagesize():number{
        return this.DataExchangeService.pagesize;
    }

    //store listcolor scope variable in DataExchangeService
    public set listcolor(lcolor){
        this.DataExchangeService.listcolor = lcolor;
    }

    //return listcolor stored in DataExchangeService
    public get listcolor(){
        return this.DataExchangeService.listcolor;
    }

    //store labelsize scope variable in DataExchangeService
    public set labelsize(lsize){
        this.DataExchangeService.labelsize = lsize;
    }

    //return labelsize variable stored in DataExchangeService
    public get labelsize(){
        return this.DataExchangeService.labelsize;
    }

    //store textsize scope variable in DataExchangeService
    public set textsize(tsize){
        this.DataExchangeService.textsize = tsize;
    }

    //return textsize variable stored in DataExchangeService
    public get textsize(){
        return this.DataExchangeService.textsize;
    }

    /*Returns the names of all the lists in the data
    These names are extracted in the DataExchangeService*/
    public get list_names(){
        return this.DataExchangeService.list_names;
    }

    /*returns the names of all the files that are present in the data
    these names are extracted in the DataExchangeService*/
    public get file_list(){
        return this.DataExchangeService.file_list;
    }

    /*returns the total count of logs for a particular list - errors or warnings 
    This value is calculated in the DataManipulationService*/
    public totalcount(list:string):number{
        return this.DataManipulationService.totalcount(list);
    }

    /*returns the total count of logs for a particular file - errors and warnings 
    This value is calculated in the DataManipulationService*/
    public filecount(file:string):number{
        return this.DataManipulationService.filecount(file);
    }

    /*Funnction call for setting up the download functionality
    the action and the html are generated in DataManipulationService*/
    public downloadlinkHtml():void{
        this.DataManipulationService.downloadlinkHtml();
    }

    /*Function call for initializing the style arrays
    The arrays are generated in the DataManipulationService */
    public initializestyles():void{
        this.DataManipulationService.initializestyles();
    }

    /*returns the labelstyle(styling for the label container) array 
    generated in DataManipulationService*/
    public get labelstyle():any{
        return this.DataManipulationService.labelstyle;
    }

    /*returns the textstyle(styling for the list displayed) array 
    generated in DataManipulationService*/
    public get textstyle():any{
        return this.DataManipulationService.textstyle;
    }

    /*returns the labeltext(styling for the text displayed as the label) array 
    generated in DataManipulationService*/
    public get labeltext():any{
        return this.DataManipulationService.labeltext;
    }
}

FacadeService.$inject = ['DataExchangeService','DataManipulationService'];