/**
 * @author Priya Gupta
 * @LastModifiedDate August 6 2016
 * Description Registering directive on appName.
 */

/// <reference path="../../typings/index.d.ts" />

import fileTabs from './fileTabsDirective/fileTabs.directive';
import accordianView from './accordionViewDirective/accordionView.directive';
import listView from './listViewDirective/listView.directive';

export default function registerAppDirective( AppName: string ): void {

    'use strict';

    angular
        .module(AppName)
        .directive('mainView', fileTabs.Factory())
        .directive('uploadFile', accordianView.Factory())
        .directive('selectTypeUpload', listView.Factory());

}
