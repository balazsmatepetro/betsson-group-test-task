import angular from 'angular';
import isArray from 'lodash.isarray';
import isString from 'lodash.isstring';
import postModule from '../../src/post/post.module';
import Post from '../../src/post/post.entity';
import FeaturedPostListService from '../../src/featured-post-list/featured-post-list.service';

describe('FeaturedPostListService', () => {
    let __$q__ = undefined;
    let __$rootScope__ = undefined;
    let __postService__ = undefined;
    let service = undefined;

    beforeEach(() => {
        angular.injector(['ng', postModule]).invoke(($q, $rootScope, postService) => {
            __$q__ = $q;
            __$rootScope__ = $rootScope;
            __postService__ = postService;
        });

        service = new FeaturedPostListService(__$q__, __postService__);
    });

    describe('findAll', () => {
        it('it should provide only featured posts when the request was successful', () => {
            let isCatchCalled = false;

            const findAllSpy = spyOn(__postService__, 'findAll').and.callFake(() => {
                return __$q__.resolve([
                    new Post(1, 'Post 1', 'Description', 'image-url', true, true),
                    new Post(2, 'Post 2', 'Description', 'image-url', false, true),
                    new Post(3, 'Post 3', 'Description', 'image-url', true, true),
                    new Post(4, 'Post 4', 'Description', 'image-url', false, true)
                ]);
            });

            service
                .findAll()
                .then(onSuccess)
                .catch(() => {
                    isCatchCalled = true;
                })
                .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(findAllSpy).toHaveBeenCalled();
                expect(isCatchCalled).toBe(false);
            }

            /**
             * @param {Array.<Post>} posts 
             */
            function onSuccess(posts) {
                expect(isArray(posts)).toBe(true);
                expect(posts.length).toEqual(2);

                expect(posts[0].id).toEqual(1);
                expect(posts[1].id).toEqual(3);
            }
        });

        it('should provide nothing when the request failed', () => {
            let isThenCalled = false;

            const findAllSpy = spyOn(__postService__, 'findAll').and.callFake(() => __$q__.reject('reason'));

            service
                .findAll()
                .then(() => {
                    isThenCalled = true;
                })
                .catch(onFailure)
                .finally(onEnd);

            __$rootScope__.$digest();

            function onEnd() {
                expect(findAllSpy).toHaveBeenCalled();
                expect(isThenCalled).toBe(false);
            }

            /**
             * @param {String} reason 
             */
            function onFailure(reason) {
                expect(isString(reason)).toBe(true);
                expect(reason).toEqual('The featured posts couldn\'t be found!');
            }
        });
    });
});
