import {listViewController} from './listView.controller';

export class listView {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private scope = {
        list: '=',
        styling: '='
    };
    private bindToController = {
        list: '=',
        styling: '='
    };
    private controllerAs = 'vm';
    private controller = listViewController;
    private template = require('./listView.html');

    public static Factory(): any {
        let directive = () => {
            return new listView();
        };
        directive.$inject = [];
        return directive;
    }

    constructor() {
        listView.prototype.link = (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {};
    }
}

export default listView;