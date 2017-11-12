import angular from 'angular';
import isArray from 'lodash.isarray';
import isString from 'lodash.isstring';
import Post from '../../src/post/post.entity';
import PostService from '../../src/post/post.service';

describe('PostService', () => {
    let __$http__ = undefined;
    let __$q__ = undefined;
    let __$rootScope__ = undefined;
    let service = undefined;

    beforeEach(() => {
        angular.injector(['ng']).invoke(($http, $q, $rootScope) => {
            __$http__ = $http;
            __$q__ = $q;
            __$rootScope__ = $rootScope;
        });

        service = new PostService(__$http__, __$q__);
    });

    describe('findById', () => {
        it('should provide a proper Post instance when the request was successful', () => {
            let isCatchCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => {
                return __$q__.resolve({
                    data: {
                        'id': 1,
                        'title': 'Title',
                        'description': 'Description',
                        'image_url': 'image-url',
                        'is_featured': false,
                        'is_active': false
                    }
                });
            });

            const mapSpy = spyOn(PostService, 'mapPost').and.callThrough();

            service
                .findById(1)
                .then(onSuccess)
                .catch(() => {
                    isCatchCalled = true;
                })
                .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(httpGetSpy).toHaveBeenCalled();
                expect(mapSpy).toHaveBeenCalledTimes(1);
                expect(isCatchCalled).toBe(false);
            }

            /**
             * @param {Post} post 
             */
            function onSuccess(post) {
                expect(post instanceof Post).toBe(true);
                expect(post.id).toEqual(1);
                expect(post.title).toEqual('Title');
                expect(post.description).toEqual('Description');
                expect(post.imageUrl).toEqual('image-url');
                expect(post.isFeatured).toBe(false);
                expect(post.isActive).toBe(false);
            }
        });

        it('should provide nothing when the request failed', () => {
            let isThenCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => __$q__.reject('reason'));

            const mapSpy = spyOn(PostService, 'mapPost').and.callThrough();

            service
                .findById(1)
                .then(() => {
                    isThenCalled = true;
                })
                .catch(onFailure)
                .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(httpGetSpy).toHaveBeenCalled();
                expect(mapSpy).not.toHaveBeenCalled();
                expect(isThenCalled).toBe(false);
            }

            /**
             * @param {String} reason 
             */
            function onFailure(reason) {
                expect(isString(reason)).toBe(true);
                expect(reason).toEqual('The post couldn\'t be found!');
            }
        });
    });

    describe('findByCategoryId', () => {
        it('should provide a proper Post collection when the request was successful', () => {
            let isCatchCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => {
                return __$q__.resolve({
                    data: [
                        {
                            'id': 1,
                            'title': 'Post 1',
                            'description': 'Description',
                            'image_url': 'image-url',
                            'is_featured': true,
                            'is_active': false
                        },
                        {
                            'id': 2,
                            'title': 'Post 2',
                            'description': 'Description',
                            'image_url': 'image-url',
                            'is_featured': false,
                            'is_active': true
                        }
                    ]
                });
            });

            const mapSpy = spyOn(PostService, 'mapPost').and.callThrough();

            service
                .findByCategoryId(1)
                .then(onSuccess)
                .catch(() => {
                    isCatchCalled = true;
                })
                .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(httpGetSpy).toHaveBeenCalled();
                expect(mapSpy).toHaveBeenCalledTimes(2);
                expect(isCatchCalled).toBe(false);
            }

            /**
             * @param {Array.<Post>} posts 
             */
            function onSuccess(posts) {
                expect(isArray(posts)).toBe(true);
                expect(posts.length).toEqual(2);
                
                expect(posts[0] instanceof Post).toBe(true);
                expect(posts[1] instanceof Post).toBe(true);

                expect(posts[0].id).toEqual(1);
                expect(posts[0].title).toEqual('Post 1');
                expect(posts[0].description).toEqual('Description');
                expect(posts[0].imageUrl).toEqual('image-url');
                expect(posts[0].isFeatured).toBe(true);
                expect(posts[0].isActive).toBe(false);

                expect(posts[1].id).toEqual(2);
                expect(posts[1].title).toEqual('Post 2');
                expect(posts[1].description).toEqual('Description');
                expect(posts[1].imageUrl).toEqual('image-url');
                expect(posts[1].isFeatured).toBe(false);
                expect(posts[1].isActive).toBe(true);
            }
        });

        it('should provide nothing when the request failed', () => {
            let isThenCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => __$q__.reject('reason'));

            const mapSpy = spyOn(PostService, 'mapPost').and.callThrough();

            service
            .findByCategoryId(1)
            .then(() => {
                isThenCalled = true;
            })
            .catch(onFailure)
            .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(httpGetSpy).toHaveBeenCalled();
                expect(mapSpy).not.toHaveBeenCalled();
                expect(isThenCalled).toBe(false);
            }

            /**
             * @param {String} reason 
             */
            function onFailure(reason) {
                expect(isString(reason)).toBe(true);
                expect(reason).toEqual('The posts couldn\'t be found!');
            }
        });
    });
});
