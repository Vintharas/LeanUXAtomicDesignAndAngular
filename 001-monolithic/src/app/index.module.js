/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { StatsController } from './stats/stats.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { TasksService } from '../app/components/tasks/tasks.service';
import { LocalStorageService } from '../app/components/tasks/localstorage.service';
import { SpeechService } from '../app/components/speech.service';

angular.module('001Monolithic', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngRoute', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('StatsController', StatsController)
  .service('tasksService', TasksService)
  .service('localStorageService', LocalStorageService)
  .service('speechService', SpeechService)
  .directive('acmeNavbar', NavbarDirective)
