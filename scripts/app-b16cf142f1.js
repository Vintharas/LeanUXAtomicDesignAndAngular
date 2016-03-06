/******/!function(e){function t(a){if(s[a])return s[a].exports;var o=s[a]={exports:{},id:a,loaded:!1};return e[a].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}// webpackBootstrap
/******/
var s={};return t.m=e,t.c=s,t.p="",t(0)}([function(e,t,s){"use strict";var a=s(1),o=s(2),n=s(3),r=s(4),i=s(6),c=s(7),l=s(5),u=s(8),v=s(9);angular.module("001Monolithic",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngRoute","toastr"]).constant("malarkey",malarkey).constant("moment",moment).config(a.config).config(o.routerConfig).run(n.runBlock).controller("MainController",r.MainController).controller("StatsController",i.StatsController).service("tasksService",l.TasksService).service("localStorageService",u.LocalStorageService).service("speechService",v.SpeechService).directive("acmeNavbar",c.NavbarDirective)},function(e,t){"use strict";function s(e,t){"ngInject";e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}s.$inject=["$logProvider","toastrConfig"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=s},function(e,t){"use strict";function s(e){"ngInject";e.when("/stats",{templateUrl:"app/stats/stats.html",controller:"StatsController",controllerAs:"stats"}).when("/tasks",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/tasks"})}s.$inject=["$routeProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=s},function(e,t){"use strict";function s(e){"ngInject";e.debug("runBlock end")}s.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=s},function(e,t,s){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return 1500}function n(e){return e.workedPomodoros%4===0?1200:300}function r(e){var t=Number.parseInt(e/60),s=Math.round(60*(e/60-t)),a=i(t),o=i(s);return a+":"+o}function i(e){return 10>e?"0"+e:e}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){var s=[],a=!0,o=!1,n=void 0;try{for(var r,i=e[Symbol.iterator]();!(a=(r=i.next()).done)&&(s.push(r.value),!t||s.length!==t);a=!0);}catch(c){o=!0,n=c}finally{try{!a&&i["return"]&&i["return"]()}finally{if(o)throw n}}return s}return function(t,s){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,s);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),u=s(5),v=function(){function e(t,s,n,i){"ngInject";a(this,e);var c=this,l=o();Object.assign(c,{timeLeft:r(l),currentTime:l,tasks:n.getTasks(),newTask:(0,u.Task)(),hasTasks:function(){return this.tasks.length>0},filterTerm:"",$interval:t,$log:s,tasksService:n,speechService:i}),c.activeTask=this.tasks.find(function(e){return e.isActive})}return e.$inject=["$interval","$log","tasksService","speechService"],l(e,[{key:"addNewTask",value:function(){this.tasks.push(this.newTask),1===this.tasks.length&&this.setTaskAsActive(this.newTask),this.tasksService.saveTask(this.newTask),this.newTask=(0,u.Task)()}},{key:"removeTask",value:function(e){var t=this.tasks.indexOf(e);-1!==t&&(e.isActive&&this.setNextTaskAsActive(t),this.tasks.splice(t,1),this.tasksService.removeTask(e))}},{key:"archiveTask",value:function(e){var t=this.tasks.indexOf(e);if(-1!==t){var s=this.tasks.splice(t,1),a=c(s,1),o=a[0];this.tasksService.archiveTask(o)}}},{key:"setNextTaskAsActive",value:function(e){this.tasks.length>e+1?this.setTaskAsActive(this.tasks[e+1]):e>0&&this.setTaskAsActive(this.tasks[e-1])}},{key:"setTaskAsActive",value:function(e){var t=this.tasks.find(function(e){return e.isActive});t&&(t.isActive=!1),e.isActive=!0,this.activeTask=e}},{key:"startPomodoro",value:function(){if(this.performingTask)throw new Error("Can't start a new pomodoro while one is already running");this.performingTask=!0,this.setTimerInterval(o()),this.speechService.say("ring ring ring start pomodoro now! Time to kick some ass!")}},{key:"cancelPomodoro",value:function(){this.stopPomodoro(),this.resetPomodoroTimer()}},{key:"advanceTimer",value:function(){this.$log.debug("advancing timer 1 second"),this.currentTime-=1,0===this.currentTime?this.performingTask?this.completePomodoro():this.completeRest():this.timeLeft=r(this.currentTime)}},{key:"stopPomodoro",value:function(){this.performingTask=!1,this.cleanInterval(),this.speechService.say("Stop! Time to rest and reflect!")}},{key:"completePomodoro",value:function(){this.activeTask.workedPomodoros++,this.stopPomodoro(),this.startRest()}},{key:"startRest",value:function(){this.resting=!0,this.setupRestTime(),this.setTimerInterval(n(this.activeTask))}},{key:"setTimerInterval",value:function(e){this.cleanInterval(),this.timerInterval=this.$interval(this.advanceTimer.bind(this),1e3,e)}},{key:"completeRest",value:function(){this.cleanInterval(),this.resting=!1,this.resetPomodoroTimer()}},{key:"cleanInterval",value:function(){this.timerInterval&&(this.$interval.cancel(this.timerInterval),this.timerInterval=null)}},{key:"resetPomodoroTimer",value:function(){this.setTime(o())}},{key:"setupRestTime",value:function(){this.setTime(n(this.activeTask))}},{key:"setTime",value:function(e){this.currentTime=e,this.timeLeft=r(this.currentTime)}}]),e}();t.MainController=v},function(e,t){"use strict";function s(e){if(Array.isArray(e)){for(var t=0,s=Array(e.length);t<e.length;t++)s[t]=e[t];return s}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.title,s=void 0===t?"":t,a=e.pomodoros,o=void 0===a?1:a,n=e.isActive,i=void 0===n?!1:n;return{title:s,pomodoros:o,workedPomodoros:0,isActive:i,id:r(),timestamp:new Date}}function n(){return[o({title:"Write dissertation on ewoks",pomodoros:3,isActive:!0}),o({title:"Buy flowers for Malin",pomodoros:1,isActive:!1})]}function r(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function i(e){e.forEach(function(e){return e.timestamp=new Date(e.timestamp)})}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}();t.Task=o;var l="tasks",u="archived tasks",v=function(){function e(t,s){"ngInject";a(this,e),Object.assign(this,{tasks:new Map,archivedTasks:new Map,localStorageService:s,$log:t}),this.loadTasks()}return e.$inject=["$log","localStorageService"],c(e,[{key:"loadTasks",value:function(){this.loadActiveTasks(),this.loadArchivedTasks()}},{key:"loadActiveTasks",value:function(){var e=this,t=this.localStorageService.get(l);null===t&&(this.initializeLocalStorage(l,n()),t=n()),this.$log.debug("restored tasks from local storage: ",t),t.forEach(function(t){return e.tasks.set(t.id,t)}),i(t)}},{key:"loadArchivedTasks",value:function(){var e=this,t=this.localStorageService.get(u);null===t&&(this.initializeLocalStorage(u,[]),t=[]),this.$log.debug("restored archived tasks from local storage: ",t),t.forEach(function(t){return e.archivedTasks.set(t.id,t)}),i(t)}},{key:"getTasks",value:function(){return[].concat(s(this.tasks.values()))}},{key:"getArchivedTasks",value:function(){return[].concat(s(this.archivedTasks.values()))}},{key:"saveTask",value:function(e){this.tasks.set(e.id,e),this.saveTasks()}},{key:"archiveTask",value:function(e){this.tasks["delete"](e.id),this.archivedTasks.set(e.id,e),this.saveTasks(),this.saveArchivedTasks()}},{key:"removeTask",value:function(e){this.tasks["delete"](e.id),this.saveTasks()}},{key:"removeArchivedTask",value:function(e){this.archivedTasks["delete"](e.id),this.saveArchivedTasks()}},{key:"saveTasks",value:function(){this.localStorageService.set(l,[].concat(s(this.tasks.values())))}},{key:"saveArchivedTasks",value:function(){this.localStorageService.set(u,[].concat(s(this.archivedTasks.values())))}},{key:"initializeLocalStorage",value:function(e,t){this.localStorageService.set(e,t)}}]),e}();t.TasksService=v},function(e,t){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){if(0===e.length)return v;var t=o(e),s=n(e),a=r(e),l=i(a),u=c(a);return{averageEstimatedPomodoros:t/e.length,averageWorkedPomodoros:s/e.length,averageEstimatedPomodorosPerDay:l.pomodoros/a.size,averageWorkedPomodorosPerDay:l.workedPomodoros/a.size,maxWorkedPomodorosPerDay:u}}function o(e){return e.map(function(e){return e.pomodoros}).reduce(function(e,t){return e+t},0)}function n(e){return e.map(function(e){return e.workedPomodoros}).reduce(function(e,t){return e+t},0)}function r(e){return e.reduce(function(e,t){if(e.has(t.timestamp.toDateString())){var s=e.get(t.timestamp.toDateString());s.pomodoros+=t.pomodoros,s.workedPomodoros+=t.workedPomodoros}else e.set(t.timestamp.toDateString(),{pomodoros:t.pomodoros,workedPomodoros:t.workedPomodoros});return e},new Map)}function i(e){return Array.from(e.values()).reduce(function(e,t){return{pomodoros:e.pomodoros+t.pomodoros,workedPomodoros:e.workedPomodoros+t.workedPomodoros}},{pomodoros:0,workedPomodoros:0})}function c(e){return Array.from(e.values()).reduce(function(e,t){return e>t.workedPomodoros?e:t.workedPomodoros},0)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),u=function(){function e(t,o){"ngInject";var n=this;s(this,e);var r=t.getArchivedTasks();Object.assign(this,{archivedTasks:r,searchTerm:"",tasksService:t},a(r)),o.$watch("stats.searchTerm",function(e){var t=n.archivedTasks.filter(function(t){return t.title.toLowerCase().includes(e.toLowerCase())});Object.assign(n,a(t))})}return e.$inject=["tasksService","$scope"],l(e,[{key:"removeTask",value:function(e){var t=this.archivedTasks.indexOf(e);-1!==t&&(this.archivedTasks.splice(t,1),this.tasksService.removeArchivedTask(e))}}]),e}();t.StatsController=u;var v={averageEstimatedPomodoros:0,averageWorkedPomodoros:0,averageEstimatedPomodorosPerDay:0,averageWorkedPomodorosPerDay:0,maxWorkedPomodorosPerDay:0}},function(e,t){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(){"ngInject";var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{},controller:n,controllerAs:"vm",bindToController:!0};return e}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}();t.NavbarDirective=a;var n=function(){function e(t){"ngInject";s(this,e),Object.assign(this,{$location:t})}return e.$inject=["$location"],o(e,[{key:"isActive",value:function(e){return this.$location.path().includes(e)}}]),e}()},function(e,t){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),o=function(){function e(){"ngInject";s(this,e)}return a(e,[{key:"get",value:function(e){return angular.fromJson(localStorage.getItem(e))}},{key:"set",value:function(e,t){localStorage.setItem(e,angular.toJson(t))}}]),e}();t.LocalStorageService=o},function(e,t){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),o=function(){function e(){"ngInject";s(this,e)}return a(e,[{key:"say",value:function(e){if(window.SpeechSynthesisUtterance&&window.speechSynthesis){var t=new SpeechSynthesisUtterance(e);t.lang="en-US",speechSynthesis.speak(t)}}}]),e}();t.SpeechService=o}]),angular.module("001Monolithic").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><section class="timer text-center"><h1>{{main.timeLeft}}</h1><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.startPomodoro()" ng-if="!main.performingTask" ng-disabled="!main.hasTasks()">Ready, Set, Go!</button> <button type="button" class="btn btn-lg btn-error" ng-click="main.cancelPomodoro()" ng-if="main.performingTask">Cancel Pomodoro!</button></p></section><section class="row row--with-margins"><div class="col-sm-6 col-sm-offset-3"><form class="row"><div class="col-xs-6"><input type="text" class="form-control" placeholder="title" ng-model="main.newTask.title"></div><div class="col-xs-2"><input type="number" class="form-control" placeholder="pomodoros" ng-model="main.newTask.pomodoros"></div><div class="col-xs-4"><button class="btn btn-default btn-block" ng-click="main.addNewTask()">Add new task</button></div></form></div></section><section class="row"><div class="col-sm-6 col-sm-offset-3"><input type="text" class="form-control" placeholder="search..." ng-model="main.searchTerm"><ul class="list-group list-group-tasks list-group-tasks-current"><li class="list-group-item" ng-repeat="task in main.tasks | filter:main.searchTerm" ng-class="{active: task.isActive}"><span class="btn btn-default" ng-click="main.setTaskAsActive(task)" ng-class="{\'btn-active\': task.isActive}"><i class="glyphicon glyphicon-play-circle"></i></span> {{ task.title }}<div class="pull-right"><button class="btn btn-default pull-right" ng-click="main.archiveTask(task)"><i class="glyphicon glyphicon-ok"></i></button> <button class="btn btn-default pull-right" ng-click="main.removeTask(task)"><i class="glyphicon glyphicon-remove"></i></button></div><div class="pull-right task-pomodoros"><span class="label label-default">{{ task.workedPomodoros }}</span> <span class="label label-success">{{ task.pomodoros }}</span></div></li></ul></div></section></div>'),e.put("app/stats/stats.html",'<section class="container"><section class="row"><div class="col-sm-6 col-sm-offset-3 kpis"><div class="panel panel-default panel-kpi"><div class="panel-heading">Average Estimated Pomo\'s</div><div class="panel-body">{{stats.averageEstimatedPomodoros | number}}</div></div><div class="panel panel-default panel-kpi"><div class="panel-heading">Average Worked Pomo\'s</div><div class="panel-body">{{stats.averageWorkedPomodoros | number}}</div></div><div class="panel panel-default panel-kpi"><div class="panel-heading">Average Estimated Pomo\'s/Day</div><div class="panel-body">{{stats.averageEstimatedPomodorosPerDay | number}}</div></div><div class="panel panel-default panel-kpi"><div class="panel-heading">Average Worked Pomo\'s/Day</div><div class="panel-body">{{stats.averageWorkedPomodorosPerDay | number}}</div></div><div class="panel panel-default panel-kpi"><div class="panel-heading">Max Worked Pomo\'s/Day</div><div class="panel-body">{{stats.maxWorkedPomodorosPerDay | number}}</div></div></div></section><section class="row"><div class="col-sm-6 col-sm-offset-3"><input type="text" class="form-control" placeholder="search..." ng-model="stats.searchTerm"><ul class="list-group list-group-tasks"><li class="list-group-item" ng-repeat="task in stats.archivedTasks | filter:stats.searchTerm"><span class="list-group-item-text">{{ task.title }}</span><div class="pull-right"><button class="btn btn-default pull-right" ng-click="stats.removeTask(task)"><i class="glyphicon glyphicon-remove"></i></button></div><div class="pull-right task-pomodoros"><span class="label label-default">{{ task.workedPomodoros }}</span> <span class="label label-success">{{ task.pomodoros }}</span></div></li></ul></div></section></section>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href=""><img src="assets/images/tomato-icon.png" height="20"></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li ng-class="{active: vm.isActive(\'tasks\')}"><a ng-href="#tasks">Tasks</a></li><li ng-class="{active: vm.isActive(\'stats\')}"><a ng-href="#stats">Stats</a></li></ul></div></div></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-b16cf142f1.js.map
