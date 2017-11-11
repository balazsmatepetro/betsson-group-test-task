import map from 'lodash.map';
import Category from './category.entity';

/**
 * Description of CategoryService
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class CategoryService {
    /**
     * Creates a new CategoryService instance.
     * 
     * @param {ng.IHttpService} $http The $http service.
     * @param {ng.IQService} $q The $q service.
     */
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }

    /**
     * Fetches and returns the categories.
     * 
     * @returns {ng.IPromise<Array.<Category>>}
     */
    findAll() {
        const self = this;

        return this
            .$http
            .get(`/categories`)
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The categories couldn\'t be found!');
        }

        /**
         * Creates and returns a Category collection by the given response.
         * 
         * @param {ng.IHttpResponse} response The HTTP response.
         * @returns {Array.<Category>}
         */
        function onSuccess(response) {
            // TODO: Check response data structure!
            return map(response.data, self.constructor.mapCategory);
        }
    }

    /**
     * Fetches and returns the Category by ID.
     * 
     * @param {Number} id The category ID.
     * @returns {ng.IPromise<Category>}
     */
    findById(id) {
        const self = this;

        return this
            .$http
            .get(`/categories/${id}`)
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The category couldn\'t be found!');
        }

        /**
         * Creates and returns a Category instance by the given response.
         * 
         * @param {ng.IHttpResponse} response The HTTP response.
         * @returns {Category}
         */
        function onSuccess(response) {
            // TODO: Check response data structure!
            return self.constructor.mapCategory(response.data);
        }
    }

    /**
     * Maps and returns the given object to a Category instance.
     * 
     * @param {{id: Number, title: String, is_active: Boolean}} category The object to map.
     * @returns {Category} The mapped category.
     * @static
     */
    static mapCategory(category) {
        return new Category(
            category['id'],
            category['title'],
            category['is_active']
        );
    }

    /**
     * Returns the name of injected services.
     * 
     * @returns {Array.<String>}
     * @static
     */
    static get $inject() {
        return [
            '$http',
            '$q'
        ];
    }
}
