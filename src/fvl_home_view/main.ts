/// <reference path="../../typings/index.d.ts" />

import registerAppDirective from './appViewDirective';
export const AppName: string = 'fvl.home.view';

const angularmaterial = require('angular-material');
const uibootstrap = require('angular-ui-bootstrap');
const angularsanitize = require('angular-sanitize');

const App = angular.module(AppName, ['ngMaterial', 
				                    'ui.bootstrap',
				                    'ngSanitize',
                                    ]);

registerAppDirective(AppName);
