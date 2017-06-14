import {accordionViewController} from './accordionView.controller';

export class accordionView {

    private link: (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => void;
    private scope = {
        filedata: '='
    };
    private bindToController = {
        filedata: '='
    };
    private controllerAs = 'vm';
    private controller = accordionViewController;
    private template = require('./accordionView.html');

    public static Factory(): any {
        let directive = () => {
            return new accordionView();
        };
        directive.$inject = [];
        return directive;
    }

    constructor() {
        accordionView.prototype.link = (scope: angular.IScope, element: Element, attrs: angular.IAttributes) => {};
    }
}

export default accordionView;