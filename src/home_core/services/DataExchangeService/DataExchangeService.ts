import {IfcDataExchangeService} from './IfcDataExchangeService';

export class DataExchangeService implements IfcDataExchangeService{
    
    private _data;
    private _pagesize:number;
    private _listcolor;
    private _labelsize:string;
    private _textsize:string;

    public set data(recdata){
        this._data = recdata;
    }
    public get data(){
        return this._data;
    }

    public set pagesize(psize: number){
        this._pagesize = psize;
    }
    public get pagesize(){
        return this._pagesize;
    }

    public set listcolor(lcolor){
        this._listcolor = lcolor;
    }
    public get listcolor(){
        return this.listcolor;
    }

    public set labelsize(lsize:string){
        this._labelsize = lsize;
    }
    public get labelsize() {
        return this._labelsize;
    }

    public set textsize(tsize:string){
        this._textsize = tsize;
    }
    public get textsize(){
        return this._textsize;
    }

}