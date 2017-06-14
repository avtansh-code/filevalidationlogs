import { IfcFacadeService } from '../../home_core/services/FacadeService/IfcFacadeService';

export class accordionViewController{

    private facadeService: IfcFacadeService;
    private filedata:any;
    private listcolors:any;
    private labelsize:string;
    private textsize:string;
    private labelText:any = [];
    private labelStyle:any = [];
    private textStyle:any = [];

    constructor(facadeService: IfcFacadeService){
        this.facadeService = facadeService;
    }
    
    private datainit(){
        this.listcolors = this.facadeService.listcolor;
        this.labelsize = this.facadeService.labelsize;
        this.textsize = this.facadeService.textsize;
         /*A loop to build the styling objects for the template*/
    
        var r,g,b;
        for(var count = 0; count<this.list_names().length; count++){
            if(this.listcolors === undefined){
                this.labelText[count] = {
                    'color': '#000000',
                    'font-size': this.labelsize
                }
                this.textStyle[count] = {
                    'font-size': this.textsize,
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
                'color': this.listcolors[this.list_names()[count]],
                'font-size': this.labelsize
            }
            this.textStyle[count] = {
                'font-size': this.textsize,
                'color': this.listcolors[this.list_names()[count]]
            }
            r = this.hexToRgb(this.listcolors[this.list_names()[count]]).r;
            g = this.hexToRgb(this.listcolors[this.list_names()[count]]).g;
            b = this.hexToRgb(this.listcolors[this.list_names()[count]]).b;
            this.labelStyle[count] = {
                'background-color': `rgba(${r},${g},${b},0.3)`,
                'border-bottom': `1px solid ${this.listcolors[this.list_names()[count]]}`
            }
        }
    }
    

    /*This function is used to convert the hex value of a color to its RGB format.
    It takes in a hex string as input and outputs three variables R,G and B, ie, their 
    cooresponding values*/

    private hexToRgb(hex:string):any {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    private list_names():string[]{
        return (Object.keys(this.filedata));
    }
}

accordionViewController.$inject = ['FacadeService'];