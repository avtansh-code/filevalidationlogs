/// <reference path="../../../typings/index.d.ts"/>

import {DataExchangeService} from './DataExchangeService/DataExchangeService';
import {DataManipulationService} from './DataManipulationService/DataManipulationService';
import {FacadeService} from './FacadeService/FacadeService';
export default function registerService(AppName: string): void {

    angular
        .module(AppName)
        .service('DataExchangeService', DataExchangeService)
        .service('DataManipulationService', DataManipulationService)
        .service('FacadeService', FacadeService);
}