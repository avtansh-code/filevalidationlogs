import {listViewHtml} from './listView.html';
import {listViewController} from './listView.controller';

export class listView {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private template = listViewHtml;
    private restrict = 'A';
    private controller = listViewController;
    private controllerAs = 'vm';
    private scope = {
    };
    private bindToController = true;

    public static Factory(): any {
        let directive = () => {
            return new listView();
        };
        directive.$inject = [];
        return directive;
    }

    constructor() {
        listView.prototype.link = (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {
        };
    }
}

export default listView;