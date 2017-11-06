import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appRouting from './app.routes';
import postListModule from './post-list/post-list.module';

const moduleName = 'app';

angular
    .module(moduleName, [
        uiRouter,
        postListModule
    ])
    .config(['$urlRouterProvider', '$stateProvider', appRouting]);

angular
    .element(document)
    .ready(() => {
        angular.bootstrap(document, [moduleName]);
    });
