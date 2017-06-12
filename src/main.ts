/// <reference path="../typings/index.d.ts" /> 
export const AppName: string = 'filevalidationlogs';

angular.module( AppName, ['home.core', 'home.view']);


angular
    .module(AppName)
    .config( ($interpolateProvider: angular.IInterpolateProvider): void => {
        $interpolateProvider
            .startSymbol('{[')
            .endSymbol(']}');
    });