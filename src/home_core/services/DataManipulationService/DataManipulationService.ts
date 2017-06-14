import {IfcDataExchangeService} from '../DataExchangeService/IfcDataExchangeService';
import {IfcDataManipulationService} from './IfcDataManipulationService'

export class DataManipulationService implements IfcDataManipulationService{
    private DataExchangeService: IfcDataExchangeService;
    private labelText:any = [];
    private labelStyle:any = [];
    private textStyle:any = [];

    constructor(DataExchangeService: IfcDataExchangeService){
        this.DataExchangeService = DataExchangeService;
    }

    public totalcount(list: string):number{
        let t_count:number = 0;
        for (let file of this.DataExchangeService.file_list) 
        {
            t_count = t_count + this.DataExchangeService.data[file][list].length;
        }
        return t_count;
    }

    public filecount(file:string):number{
        let f_count:number = 0;
        for (let list of this.DataExchangeService.list_names) 
        {
            f_count = f_count + this.DataExchangeService.data[file][list].length;
        }
        return f_count;
    }

    public downloadlinkHtml():void{
        /*Loops to build the logs file that has to be downloaded*/
        let logs:string = 'The file(s) contains';
        let length:number = this.DataExchangeService.list_names.length;
        let count:number= 0;

        for(let list of this.DataExchangeService.list_names){
            logs = `${logs} 
                <b>${this.totalcount(list)} ${list} </b>`;
            if(count < length-1)
                logs = `${logs}and `;
            count++;
        }

        logs = `${logs}\n\n`;
        for (let file of this.DataExchangeService.file_list) 
        {
                if(this.filecount(file) > 0){
                    logs = `${logs}\t<h1>${file}</h1>\n\t<div>\n`;
                    for(let list of this.DataExchangeService.list_names)
                    {
                        if(this.DataExchangeService.data[file][list].length>0)
                        {
                            logs = `${logs}\t\t<h4>${list}
                            (${this.DataExchangeService.data[file][list].length})</h4>\n`;
                            logs = `${logs}\t\t<ul>\n`;
                            for(let count = 0; 
                                count < this.DataExchangeService.data[file][list].length; 
                                count++)
                            {
                                
                                logs = `${logs}\t\t\t<li>
                                ${this.DataExchangeService.data[file][list][count]}
                                </li>\n`;
                            }
                            logs = `${logs}\t\t</ul><br/>\n`;
                        }
                    }
                    logs = `${logs}\t</div><br/><br/>\n`;
                }

        }	
 
        /*This section generates the action of download when the download button is clicked.
        It generates a temporary anchor tag that is used to download the required html file.
        And then it deletes that anchor tag once done.*/

        let uri = 'data:text/html;charset=utf-8,' + encodeURIComponent(logs);
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", uri);
        downloadLink.setAttribute("download", "errors and warnings.html");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    /*This function is used to convert the hex value of a color to its RGB format.
    It takes in a hex string as input and outputs three variablesiables R,G and B, ie, their 
    cooresponding values*/

    private hexToRgb(hex:string):any {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    public initializestyles():void{
         /*A loop to build the styling objects for the template*/
    
        let r,g,b;
        for(let count = 0; count<this.DataExchangeService.list_names.length; count++){
            if(this.DataExchangeService.listcolor === undefined){
                this.labelText[count] = {
                    'color': '#000000',
                    'font-size': this.DataExchangeService.labelsize
                }
                this.textStyle[count] = {
                    'font-size': this.DataExchangeService.textsize,
                    'color': '#000000'
                }
                r = this.hexToRgb('#000000').r;
                g = this.hexToRgb('#000000').g;
                b = this.hexToRgb('#000000').b;
                this.labelStyle[count] = {
                    'background-color': `rgba(${r},${g},${b},0.3)`,
                    'border-bottom': `0.5px solid #000`
                }
                continue;	
            }
            this.labelText[count] = {
                'color': this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]],
                'font-size': this.DataExchangeService.labelsize
            }
            this.textStyle[count] = {
                'font-size': this.DataExchangeService.textsize,
                'color': this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]]
            }
            r = this.hexToRgb(this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]]).r;
            g = this.hexToRgb(this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]]).g;
            b = this.hexToRgb(this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]]).b;
            this.labelStyle[count] = {
                'background-color': `rgba(${r},${g},${b},0.3)`,
                'border-bottom': `1px solid ${this.DataExchangeService.listcolor[this.DataExchangeService.list_names[count]]}`
            }
        }
    }
    
    public get textstyle():any{
        return this.textStyle;
    }

    public get labelstyle():any{
        return this.labelStyle;
    }

    public get labeltext():any{
        return this.labelText;
    }

}

DataManipulationService.$inject = ['DataExchangeService'];