import {IfcDataExchangeService} from './IfcDataExchangeService';

/**
 * Class to define the following service
 * This service is used to store the variables that need to be exchanged between the directives
 * These variables are used in multiple directives
 */
export class DataExchangeService implements IfcDataExchangeService{
    
    private _data:any;
    private _pagesize:number;
    private _listcolor:any;
    private _labelsize:string;
    private _textsize:string;

    
    /**
     * @param  {any} rdata
     * Strore the data - json data - the complete passed logs
     */
    public set data(rdata: any){
        this._data = rdata;
    }

    
    /**
     * @returns any
     * return the logs
     */
    public get data():any{
        return this._data;
    }

    /**
     * @param  {number} psize
     * store the page-size - items per page
     */
    public set pagesize(psize: number){
        this._pagesize = psize;
    }

    
    /**
     * @returns number
     * return the page-size - items per page
     */
    public get pagesize():number{
        return this._pagesize;
    }
    
    
    /**
     * @param  {} lcolor
     * stores the array which has the colors for all the lists
     */
    public set listcolor(lcolor){
        this._listcolor = lcolor;
    }

    
    /**
     * @returns any
     * stores the array which has the colors for all the lists
     */
    public get listcolor():any{
        return this._listcolor;
    }

    
    /**
     * @param  {string} lsize
     * store the font-size of the labels
     */
    public set labelsize(lsize:string){
        this._labelsize = lsize;
    }

    
    /**
     * @returns string
     * return the font-size of the labels
     */
    public get labelsize(): string {
        return this._labelsize;
    }


    /**
     * @param  {string} tsize
     * stores the font-size of the text to be displayed
     */
    public set textsize(tsize:string){
        this._textsize = tsize;
    }

    
    /**
     * @returns string
     * returns the font-size of the text
     */
    public get textsize():string{
        return this._textsize;
    }


    /**
     * @returns string
     * returns the array of all the file names present in the data
     */
    public get file_list():string[]{
        return (Object.keys(this._data));
    }

    
    /**
     * @returns string
     * returns the array of all the list names that are defined in th data
     */
    public get list_names():string[]{
        const files:string[] = this.file_list;
        return (Object.keys(this.data[files[0]]));
    }
}