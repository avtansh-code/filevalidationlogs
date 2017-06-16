import { AppName } from '../../../main';
import { IfcDataManipulationService } from '../../../services/DataManipulationService/IfcDataManipulationService';
import { DataManipulationService } from '../../../services/DataManipulationService/DataManipulationService';
import { IfcDataExchangeService } from '../../../services/DataExchangeService/IfcDataExchangeService';
import { DataExchangeService } from '../../../services/DataExchangeService/DataExchangeService';

    
describe ('testing data manipulation service',() =>{
    let _data:object = {
			"file 1": {
				"errors": ["error1", "error2", "error3", "error4", "error5", "error6"],
				"warnings": []
			},
			"file 2": {
				"errors": ["error1", "error2", "error3", "error4"],
				"warnings": ["warning1", "warning2", "warning3", "warning4"]
			},
			"file 3": {
				"errors": ["error1", "error2", "error3"],
				"warnings": ["warning1", "warning2", "warning3", "warning4", "warning5", "warning6"]
			},
			"file 4": {
				"errors": [],
				"warnings": [],
			},
			"file 5": {
				"errors": [],
				"warnings": ["warning1", "warning2", "warning3", "warning4", "warning5"]
			},
			"file 6": {
				"errors": ["error1"],
				"warnings": ["warning1"]
			}
		};
    let _listcolors:object = {errors:"#EA4436",warnings:"#C57D00"};
    let _labelsize:string = '1.9em';
    let _textsize:string = '1em';
    let _pageSize:number = 5;
    let _textstyle = [
            {
                "font-size" : "1em",
                "color" : "#EA4436"
            },
            {
                "font-size" :  "1em",
                "color" : "#C57D00"
            }
        ];
    
    let _labelstyle = [
            {
                "background-color" : "rgba(234,68,54,0.3)",
                "border-bottom" : "1px solid #EA4436" 
            },
            {
                "background-color" : "rgba(197,125,0,0.3)",
                "border-bottom" : "1px solid #C57D00" 
            }
        ];
    
    let _labeltext = [
            {
                "font-size" : "1.9em",
                "color" : "#EA4436" 
            },
            {
                "font-size" :  "1.9em",
                "color" : "#C57D00"
            }
        ];

    beforeEach(
        angular.mock.module(AppName)
    );

    let dataExchangeService : IfcDataExchangeService;
    let dataManipulationService : IfcDataManipulationService;

    beforeEach( () => {
        dataExchangeService = new DataExchangeService();
        dataExchangeService.data = _data;
        dataExchangeService.labelsize = _labelsize;
        dataExchangeService.listcolor = _listcolors;
        dataExchangeService.textsize = _textsize;
        dataExchangeService.pagesize = _pageSize;
        dataManipulationService = new DataManipulationService(dataExchangeService);
        dataManipulationService.initializestyles();
   });


    describe('constructor', () => {
        it('should instantiate', () => {
            expect(dataManipulationService).toBeDefined();
        })
    });

    it('returns the total count of the list - errors here', () =>{
        let result =  dataManipulationService.totalcount("errors");
        expect(result).toBe(14);
        expect(typeof result).toBe('number');
    });

    it('returns the count of logs in a file - file 2 here', () =>{
        let result =  dataManipulationService.filecount("file 2");
        expect(result).toBe(8);
        expect(typeof result).toBe('number');
    });

    it('returns the object for the text style', () =>{
        let result = dataManipulationService.textstyle;
        expect(result).toEqual(_textstyle);
    });

    it('returns the object for the label style', () =>{
        let result = dataManipulationService.labelstyle;
        expect(result).toEqual(_labelstyle);
    });

    it('returns the object for the label text style', () =>{
        let result = dataManipulationService.labeltext;
        expect(result).toEqual(_labeltext);
    });

});
