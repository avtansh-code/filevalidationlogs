/// <reference path="../../typings/index.d.ts"/>

import registerAppDirective from './appViewDirective';
export const AppName: string = 'home.view';
const angular = require('angular');
const angularanimate = require('angular-animate');
const angulararia = require('angular-aria');
const angularmaterial = require('angular-material');
const uibootstrap = require('angular-ui-bootstrap');
const angularsanitize = require('angular-sanitize');
const jquery = require('jquery');
const bootstrap = require('bootstarp');

angular.module('filevalidationlogs', [angularmaterial, uibootstrap, angularsanitize]);

registerAppDirective(AppName);