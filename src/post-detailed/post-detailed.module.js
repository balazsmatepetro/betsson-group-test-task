import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import component from './post-detailed.component';

export default angular
    .module('app.post-detailed', [
        ngSanitize
    ])
    .component('postDetailed', component)
    .name;
