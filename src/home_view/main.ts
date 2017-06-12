/// <reference path="../../typings/index.d.ts"/>

import registerAppDirective from './appViewDirective';

const angular = require('angular');
const angularanimate = require('angular-animate');
const angulararia = require('angular-aria');
const angularmaterial = require('angular-material');
const uibootstrap = require('angular-ui-bootstrap');
const angularsanitize = require('angular-sanitize');
const jquery = require('jquery');
const bootstrap = require('bootstarp');

export const AppName: string = 'home.view';

angular.module(AppName, [angularanimate, 
                        angulararia, 
                        angularmaterial, 
                        uibootstrap, 
                        angularsanitize,
                        jquery,
                        bootstrap]);

registerAppDirective(AppName);