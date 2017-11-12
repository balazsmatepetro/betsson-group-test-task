import angular from 'angular';
import component from './post-list.component';

export default angular
    .module('app.post-list', [])
    .component('postList', component)
    .name;
