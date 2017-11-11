import angular from 'angular';
import service from './category.service';

export default angular
    .module('app.category', [])
    .service('categoryService', service)
    .name;
