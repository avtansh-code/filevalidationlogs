import {fileTabsController} from './fileTabs.controller';

//Class defining the cirective fileTabs
export class FileTabs {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private scope = {
        data: '=',
        listcolors: '=',
        labelsize: '@',
        textsize: '@',
        downloadIcon: '@',
        pageSize: '@',
        title: '@'
    };
    private bindToController = {
        data: '=',
        listcolors: '=',
        labelsize: '@',
        textsize: '@',
        downloadIcon: '@',
        pageSize: '@',
        title: '@'
    };
    private controllerAs = 'vm';
    private controller = fileTabsController;
    private template = require('./fileTabs.html');

    public static Factory(): any {
        let directive = () => {
            return new FileTabs();
        };
        directive.$inject = [];
        return directive;
    }

    constructor() {
        FileTabs.prototype.link = (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {};
    }
}

export default FileTabs;