import angular from 'angular';
import component from './featured-post-list.component';
import service from './featured-post-list.service';

export default angular
    .module('app.featured-post-list', [])
    .component('featuredPostList', component)
    .service('featuredPostListService', service)
    .name;
