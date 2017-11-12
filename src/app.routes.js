export default function appRouting($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('app', {
            template: '<category-tree data-categories="categoryTree"></category-tree><div ui-view></div>',
            controller: ['$scope', 'categoryTreeResolver', ($scope, categoryTreeResolver) => {
                $scope.categoryTree = categoryTreeResolver.categories;
            }],
            resolve: {
                categoryTreeResolver: [
                    '$q',
                    'categoryService',
                    'categoryTreeService',
                    ($q, categoryService, categoryTreeService) => {
                        return categoryService
                            .findAll()
                            .then(onSuccess)
                            .catch(onError);

                        function onError() {
                            return $q.reject('The categories couldn\'t be located!');
                        }

                        function onSuccess(categories) {
                            return $q.resolve({
                                categories: categoryTreeService.build(categories)
                            });
                        }
                    }
                ]
            }
        })
        .state('app.featured', {
            url: '/',
            component: 'featuredPostList',
            resolve: {
                posts: [
                    'featuredPostListService',
                    (featuredPostListService) => featuredPostListService.findAll()
                ]
            }
        })
        .state('app.category', {
            component: 'categoryDetailed',
            url: '/categories/{id}/posts',
            resolve: {
                category: [
                    '$stateParams',
                    'categoryService',
                    ($stateParams, categoryService) => categoryService.findById($stateParams.id)
                ],
                posts: [
                    '$stateParams',
                    'postService',
                    ($stateParams, postService) => postService.findByCategoryId($stateParams.id)
                ]
            }
        })
        .state('app.post', {
            component: 'postDetailed',
            url: '/posts/{id}/show',
            resolve: {
                post: [
                    '$stateParams',
                    'postService',
                    ($stateParams, postService) => postService.findById($stateParams.id)
                ]
            }
        });

    $urlRouterProvider.otherwise('/');
}
