/// <reference path="../../typings/index.d.ts" />

import registerAppDirective from './appViewDirective';
export const AppName: string = 'fvl.home.view';

const App = angular.module(AppName, ['ngMaterial', 
				                    'ui.bootstrap',
				                    'ngSanitize',
                                    ]);

registerAppDirective(AppName);
