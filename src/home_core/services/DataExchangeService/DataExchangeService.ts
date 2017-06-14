import {IfcDataExchangeService} from './IfcDataExchangeService';

/*Class to define the following service
This service is used to store the variables that need to be exchanged between the directives
These variables are used in multiple directives*/
export class DataExchangeService implements IfcDataExchangeService{
    
    private _data:any;
    private _pagesize:number;
    private _listcolor:any;
    private _labelsize:string;
    private _textsize:string;

    //Strore the data - json data - the complete passed logs
    public set data(rdata: any){
        this._data = rdata;
    }

    //return the logs
    public get data(){
        return this._data;
    }

    //store the page-size - items per page
    public set pagesize(psize: number){
        this._pagesize = psize;
    }

    //return the page-size - items per page
    public get pagesize(){
        return this._pagesize;
    }
    
    //stores the array which has the colors for all the lists
    public set listcolor(lcolor){
        this._listcolor = lcolor;
    }

    //stores the array which has the colors for all the lists
    public get listcolor():any{
        return this._listcolor;
    }

    //store the font-size of the labels
    public set labelsize(lsize:string){
        this._labelsize = lsize;
    }

    //return the font-size of the labels
    public get labelsize() {
        return this._labelsize;
    }

    //stores the font-size of the text to be displayed
    public set textsize(tsize:string){
        this._textsize = tsize;
    }

    //returns the font-size of the text
    public get textsize(){
        return this._textsize;
    }

    //returns the array of all the file names present in the data
    public get file_list(){
        return (Object.keys(this._data));
    }

    //returns the array of all the list names that are defined in th data
    public get list_names(){
        const files:string[] = this.file_list;
        return (Object.keys(this.data[files[0]]));
    }
}