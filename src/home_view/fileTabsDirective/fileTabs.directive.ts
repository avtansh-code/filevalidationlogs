import {fileTabsController} from './fileTabs.controller';

export class FileTabs {

    private link: (ctrl: fileTabsController, scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private scope = {
        data: '=',
        listcolors: '=',
        labelsize: '@',
        textsize: '@',
        downloadIcon: '@',
        pageSize: '@'
    };
    private bindToController = {
        data: '=',
        listcolors: '=',
        labelsize: '@',
        textsize: '@',
        downloadIcon: '@',
        pageSize: '@'
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
        FileTabs.prototype.link = (ctrl: fileTabsController, scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {};
    }
}

export default FileTabs;