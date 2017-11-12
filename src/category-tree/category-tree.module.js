import angular from 'angular';
import component from './category-tree.component';
import service from './category-tree.service';

export default angular
    .module('app.category-tree', [])
    .component('categoryTree', component)
    .service('categoryTreeService', service)
    .name;
