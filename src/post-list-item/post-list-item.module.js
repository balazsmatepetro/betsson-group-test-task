import angular from 'angular';
import component from './post-list-item.component';

export default angular
    .module('app.post-list-item', [])
    .component('postListItem', component)
    .name;
