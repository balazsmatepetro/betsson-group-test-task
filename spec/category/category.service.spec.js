import angular from 'angular';
import isArray from 'lodash.isarray';
import isString from 'lodash.isstring';
import Category from '../../src/category/category.entity';
import CategoryService from '../../src/category/category.service';

describe('CategoryService', () => {
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

        service = new CategoryService(__$http__, __$q__);
    });

    describe('findAll', () => {
        it('should provide a proper Category collection when the request was successful', () => {
            let isCatchCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => {
                return __$q__.resolve({
                    data: [
                        {
                            'id': 1,
                            'title': 'Category 1',
                            'parent_category_id': null,
                            'is_active': true
                        },
                        {
                            'id': 2,
                            'title': 'Category 2',
                            'parent_category_id': 1,
                            'is_active': false
                        }
                    ]
                });
            });

            const mapSpy = spyOn(CategoryService, 'mapCategory').and.callThrough();

            service
                .findAll()
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
             * @param {Array.<Category>} categories 
             */
            function onSuccess(categories) {
                expect(isArray(categories)).toBe(true);
                expect(categories.length).toEqual(2);

                expect(categories[0] instanceof Category).toBe(true);
                expect(categories[1] instanceof Category).toBe(true);

                expect(categories[0].id).toEqual(1);
                expect(categories[0].title).toEqual('Category 1');
                expect(categories[0].parentId).toEqual(null);
                expect(categories[0].isActive).toBe(true);

                expect(categories[1].id).toEqual(2);
                expect(categories[1].title).toEqual('Category 2');
                expect(categories[1].parentId).toEqual(1);
                expect(categories[1].isActive).toBe(false);
            }
        });

        it('should provide nothing when the request failed', () => {
            let isThenCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => __$q__.reject('reason'));

            const mapSpy = spyOn(CategoryService, 'mapCategory').and.callThrough();

            service
                .findAll()
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
                expect(reason).toEqual('The categories couldn\'t be found!');
            }
        });
    });

    describe('findById', () => {
        it('should provide a proper Category instance when the request was successful', () => {
            let isCatchCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => {
                return __$q__.resolve({
                    data: {
                        'id': 1,
                        'title': 'Category 1',
                        'parent_category_id': null,
                        'is_active': false
                    }
                });
            });

            const mapSpy = spyOn(CategoryService, 'mapCategory').and.callThrough();

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
             * @param {Category} category 
             */
            function onSuccess(category) {
                expect(category instanceof Category).toBe(true);
                expect(category.id).toEqual(1);
                expect(category.title).toEqual('Category 1');
                expect(category.parentId).toEqual(null);
                expect(category.isActive).toBe(false);
            }
        });

        it('should provide nothing when the request failed', () => {
            let isThenCalled = false;

            const httpGetSpy = spyOn(__$http__, 'get').and.callFake(() => __$q__.reject('reason'));

            const mapSpy = spyOn(CategoryService, 'mapCategory').and.callThrough();

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
                expect(reason).toEqual('The category couldn\'t be found!');
            }
        });
    });
});
