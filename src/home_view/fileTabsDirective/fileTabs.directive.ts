import {fileTabsHtml} from './fileTabs.html';
import {fileTabsController} from './fileTabs.controller';

export class fileTabs {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private template = fileTabsHtml;
    private restrict = 'E';
    private controller = fileTabsController;
    private controllerAs = 'vm';
    private scope = {
        data: '=',
        listcolors: '=',
        labelsize: '@',
        textsize: '@',
        downloadIcon: '@',
        pageSize: '@'
    };
    private bindToController = true;

    public static Factory(): any {
        let directive = () => {
            return new fileTabs();
        };
        directive.$inject = [];
        return directive;
    }

    constructor() {
        fileTabs.prototype.link = (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {
        };
    }
}

export default fileTabs;