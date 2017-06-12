import {accordionViewHtml} from './accordionView.html';
import {accordionViewController} from './accordionView.controller';

export class fileTabs {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private template = accordionViewHtml;
    private restrict = 'E';
    private controller = accordionViewController;
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