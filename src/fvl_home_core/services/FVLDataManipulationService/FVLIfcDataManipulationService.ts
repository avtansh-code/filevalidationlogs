export interface FVLIfcDataManipulationService{
    totalcount(list: string):number;
    filecount(file: string):number;
    downloadlinkHtml():void;
    initializestyles():void;
    labelstyle:any;
    textstyle:any;
    labeltext:any;
}