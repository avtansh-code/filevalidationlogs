/// <reference path="../../typings/index.d.ts" />
import registerAppService from './services/registerAppServices';
export const AppName: string = 'home.core';

angular.module(AppName, []);

angular
    .module(AppName)
    .config( ($interpolateProvider: angular.IInterpolateProvider): void => {
        $interpolateProvider
            .startSymbol('{[')
            .endSymbol(']}');
    });

registerAppService(AppName);
