import FileTabs from './fileTabsDirective/fileTabs.directive';
import accordionView from './accordionViewDirective/accordionView.directive';
import listView from './listViewDirective/listView.directive';

export default function registerAppDirective(AppName: string): void {

    'use strict';

    angular
        .module(AppName)
        .directive('fileTabs', FileTabs.Factory())
        .directive('accordionView',accordionView.Factory())
        .directive('listView',listView.Factory())        
}