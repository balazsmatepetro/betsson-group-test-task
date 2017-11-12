import map from 'lodash.map';
import Post from './post.entity';

/**
 * Description of PostService
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class PostService {
    /**
     * Creates a new PostService instance.
     * 
     * @param {ng.IHttpService} $http The $http service.
     * @param {ng.IQService} $q The $q service.
     */
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }

    /**
     * Fetches and returns a Post collection.
     * 
     * @returns {ng.IPromise<Array.<Post>>}
     */
    findAll() {
        const self = this;

        return this
            .$http
            .get('/posts')
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The posts couldn\'t be found!');
        }

        /**
         * Creates and returns a Post collection by the given response.
         * 
         * @param {ng.IHttpResponse} response The HTTP response.
         * @returns {Array.<Post>}
         */
        function onSuccess(response) {
            // TODO: Code duplication, it could be moved to a static method or something like this!
            // TODO: Check response data structure!
            return map(response.data, self.constructor.mapPost);
        }
    }

    /**
     * Fetches and returns the Post by ID.
     * 
     * @param {Number} id The post ID.
     * @returns {ng.IPromise<Post>}
     */
    findById(id) {
        const self = this;

        return this
            .$http
            .get(`/posts/${id}`)
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The post couldn\'t be found!');
        }

        /**
         * Creates and returns a Post instance by the given response.
         * 
         * @param {ng.IHttpResponse} response The HTTP response.
         * @returns {Post}
         */
        function onSuccess(response) {
            // TODO: Check response data structure!
            return self.constructor.mapPost(response.data);
        }
    }

    /**
     * Fetches and returns a Post collection by category ID.
     * 
     * @param {Number} id The post ID.
     * @returns {ng.IPromise<Array.<Post>>}
     */
    findByCategoryId(categoryId) {
        const self = this;

        return this
            .$http
            .get(`/categories/${categoryId}/posts`)
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The posts couldn\'t be found!');
        }

        /**
         * Creates and returns a Post collection by the given response.
         * 
         * @param {ng.IHttpResponse} response The HTTP response.
         * @returns {Array.<Post>}
         */
        function onSuccess(response) {
            // TODO: Code duplication, it could be moved to a static method or something like this!
            // TODO: Check response data structure!
            return map(response.data, self.constructor.mapPost);
        }
    }

    /**
     * Maps and returns the given object to a Post instance.
     * 
     * @param {{id: Number, title: String, description: String, image_url: String, is_featured:Boolean, is_active: Boolean}} post The object to map.
     * @returns {Post} The mapped post.
     * @static
     */
    static mapPost(post) {
        return new Post(
            post['id'],
            post['title'],
            post['description'],
            post['image_url'],
            post['is_featured'],
            post['is_active']
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
