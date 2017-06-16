import {FVLIfcDataExchangeService} from '../FVLDataExchangeService/FVLIfcDataExchangeService';
import {FVLIfcDataManipulationService} from '../FVLDataManipulationService/FVLIfcDataManipulationService';
import {FVLIfcFacadeService} from './FVLIfcFacadeService'

export class FVLFacadeService implements FVLIfcFacadeService{
    private DataExchangeService: FVLIfcDataExchangeService;
    private DataManipulationService: FVLIfcDataManipulationService;    

    constructor(DataExchangeService: FVLIfcDataExchangeService, DataManipulationService: FVLIfcDataManipulationService){
        this.DataExchangeService = DataExchangeService;
        this.DataManipulationService = DataManipulationService;
    }

    
    /**
     * @param  {any} rdata
     * store data jsonfile in the DataExchangeService
     */
    public set data(rdata: any){
        this.DataExchangeService.data = rdata;
    }

    
    /**
     * @returns any
     * return data jsonfile from the DataExchangeService
     */
    public get data():any{
        return this.DataExchangeService.data;
    }

    
    /**
     * @param  {number} psize
     * store pagesize in the DataExchangeService
     */
    public set pagesize(psize:number){
        this.DataExchangeService.pagesize = psize;
    }
    
    
    /**
     * @returns number
     * return pagesize from the DataExchangeService
     */
    public get pagesize():number{
        return this.DataExchangeService.pagesize;
    }

    
    /**
     * @param  {any} lcolor
     * store listcolor scope variable in DataExchangeService
     */
    public set listcolor(lcolor:any){
        this.DataExchangeService.listcolor = lcolor;
    }

    /**
     * @returns any
     * returns the object that stores the colors associated to each list
     */
    public get listcolor():any{
        return this.DataExchangeService.listcolor;
    }

    
    /**
     * @param  {string} lsize
     * store labelsize scope variable in DataExchangeService
     */
    public set labelsize(lsize:string){
        this.DataExchangeService.labelsize = lsize;
    }

    
    /**
     * @returns string
     * return labelsize variable stored in DataExchangeService
     */
    public get labelsize():string{
        return this.DataExchangeService.labelsize;
    }

    
    /**
     * @param  {string} tsize
     * store textsize scope variable in DataExchangeService
     */
    public set textsize(tsize:string){
        this.DataExchangeService.textsize = tsize;
    }

    
    /**
     * @returns string
     * return textsize variable stored in DataExchangeService
     */
    public get textsize():string{
        return this.DataExchangeService.textsize;
    }

    /**
     * @returns string
     * Returns the names of all the lists in the data 
     * These names are extracted in the DataExchangeService
     */
    public get list_names():string[]{
        return this.DataExchangeService.list_names;
    }

    
    /**
     * @returns string
     * returns the names of all the files that are present in the data
     * these names are extracted in the DataExchangeService
     */
    public get file_list():string[]{
        return this.DataExchangeService.file_list;
    }

   
    /**
     * @param  {string} list
     * @returns number
     * returns the total count of logs for a particular list - errors or warnings 
     * This value is calculated in the DataManipulationService
     */
    public totalcount(list:string):number{
        return this.DataManipulationService.totalcount(list);
    }

    
    /**
     * @param  {string} file
     * @returns number
     * returns the total count of logs for a particular file - errors and warnings 
     * This value is calculated in the DataManipulationService
     */
    public filecount(file:string):number{
        return this.DataManipulationService.filecount(file);
    }

    
    /**
     * @returns void
     * Function call for setting up the download functionality
     * the action and the html are generated in DataManipulationService
     */
    public downloadlinkHtml():void{
        this.DataManipulationService.downloadlinkHtml();
    }

    
    /**
     * @returns void
     * Function call for initializing the style arrays
     * The arrays are generated in the DataManipulationService
     */
    public initializestyles():void{
        this.DataManipulationService.initializestyles();
    }

    
    /**
     * @returns any
     * returns the labelstyle(styling for the label container) array 
     * generated in DataManipulationService
     */
    public get labelstyle():any{
        return this.DataManipulationService.labelstyle;
    }

    
    /**
     * @returns any
     * returns the textstyle(styling for the list displayed) array 
     * generated in DataManipulationService
     */
    public get textstyle():any{
        return this.DataManipulationService.textstyle;
    }

    
    /**
     * @returns any
     * returns the labeltext(styling for the text displayed as the label) array 
     * generated in DataManipulationService
     */
    public get labeltext():any{
        return this.DataManipulationService.labeltext;
    }
}

FVLFacadeService.$inject = ['FVLDataExchangeService','FVLDataManipulationService'];