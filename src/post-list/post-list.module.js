import angular from 'angular';
import postListComponent from './post-list.component';

export default angular
    .module('app.post-list', [])
    .component('postList', postListComponent)
    .name;
