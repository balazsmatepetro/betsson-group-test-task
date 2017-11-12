import angular from 'angular';
import service from './post.service';

export default angular
    .module('app.post', [])
    .service('postService', service)
    .name;
