export interface IfcFacadeService{
    data:any;
    pagesize:number;
    listcolor:any;
    labelsize:string;
    textsize:string;
    list_names:string[];
    file_list:string[];
    totalcount(list:string):number;
    filecount(file:string):number;
    downloadlinkHtml():void;
    initializestyles():void;
    labelstyle:any;
    textstyle:any;
    labeltext:any;
}