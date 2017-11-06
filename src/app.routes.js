export default function appRouting($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('featured', {
            component: 'postList',
            url: '/'
        });

    $urlRouterProvider.otherwise('/');
}
