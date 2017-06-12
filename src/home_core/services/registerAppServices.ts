/// <reference path="../../../typings/index.d.ts"/>

import {DataExchangeService} from './DataExchangeService/DataExchangeService';
import {FacadeService} from './FacadeService/FacadeService';
export default function registerService(AppName: string): void {

    angular
        .module(AppName)
        .service('DataExchangeService', DataExchangeService)
        .service('FacadeService', FacadeService);
}