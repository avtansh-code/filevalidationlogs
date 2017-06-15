import { AppName } from '../../../main';
import { IfcDataExchangeService } from '../../../services/DataExchangeService/IfcDataExchangeService';
import { DataExchangeService } from '../../../services/DataExchangeService/DataExchangeService';


    
describe ('testing data exchange service',() =>{
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

    beforeEach(
        angular.mock.module(AppName)
    );

    let dataExchangeService : IfcDataExchangeService;

    beforeEach( () => {
        dataExchangeService = new DataExchangeService();
        dataExchangeService.data = _data;
        dataExchangeService.labelsize = _labelsize;
        dataExchangeService.listcolor = _listcolors;
        dataExchangeService.textsize = _textsize;
        dataExchangeService.pagesize = _pageSize;
   });


    describe('constructor', () => {
        it('should instantiate', () => {
            expect(dataExchangeService).toBeDefined();
        })
    });


    it('data should return the json data taken as attribute', () =>{
        let result = dataExchangeService.data;
        expect(typeof result).toBe('object');
    });

    it('pagesize should return a string taken as attribute', ()  =>{
        let result = dataExchangeService.pagesize;
        expect(typeof result).toBe('number');
    });

    it('listcolor should return a json object taken as attribute', ()  =>{
        let result = dataExchangeService.listcolor;
        expect(typeof result).toBe('object');
    });

    it('labelsize should return a string taken as attribute', ()  =>{
        let result = dataExchangeService.labelsize;
        expect(typeof result).toBe('string');
    });

    it('textsize should return a string taken as attribute', ()  =>{
        let result = dataExchangeService.textsize;
        expect(typeof result).toBe('string');
    });

    it('file_list should return a string array', ()  =>{
        let result = dataExchangeService.file_list;
        expect(typeof result).toBe('object');
    });

    it('list_names should return a string array', ()  =>{
        let result = dataExchangeService.list_names;
        expect(typeof result).toBe('object');
    });
});
