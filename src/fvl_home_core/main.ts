/// <reference path="../../typings/index.d.ts" />
import registerAppService from './services/registerAppServices';
export const AppName: string = 'fvl.home.core';

angular.module(AppName, []);

registerAppService(AppName);
