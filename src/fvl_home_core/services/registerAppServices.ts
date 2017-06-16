/// <reference path="../../../typings/index.d.ts"/>

import {FVLDataExchangeService} from './FVLDataExchangeService/FVLDataExchangeService';
import {FVLDataManipulationService} from './FVLDataManipulationService/FVLDataManipulationService';
import {FVLFacadeService} from './FVLFacadeService/FVLFacadeService';
export default function registerService(AppName: string): void {

    angular
        .module(AppName)
        .service('FVLDataExchangeService', FVLDataExchangeService)
        .service('FVLDataManipulationService', FVLDataManipulationService)
        .service('FVLFacadeService', FVLFacadeService);
}