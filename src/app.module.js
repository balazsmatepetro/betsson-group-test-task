import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appRouting from './app.routes';
import categoryModule from './category/category.module';
import categoryDetailedModule from './category-detailed/category-detailed.module';
import categoryTreeModule from './category-tree/category-tree.module';
import featuredPostListModule from './featured-post-list/featured-post-list.module';
import postModule from './post/post.module';
import postDetailedModule from './post-detailed/post-detailed.module';
import postListModule from './post-list/post-list.module';
import postListItemModule from './post-list-item/post-list-item.module';

const moduleName = 'app';

angular
    .module(moduleName, [
        uiRouter,
        categoryModule,
        categoryDetailedModule,
        categoryTreeModule,
        featuredPostListModule,
        postModule,
        postDetailedModule,
        postListModule,
        postListItemModule
    ])
    .config([
        '$urlRouterProvider',
        '$stateProvider',
        appRouting
    ]);

angular
    .element(document)
    .ready(() => {
        angular.bootstrap(document, [moduleName]);
    });
