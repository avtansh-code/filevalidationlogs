export const AppName: string = 'filevalidationlogs';

import {AppName as HomeCore} from './fvl_home_core/main';
import {AppName as HomeView} from './fvl_home_view/main';

angular
    .module( AppName, [HomeCore,HomeView]);
