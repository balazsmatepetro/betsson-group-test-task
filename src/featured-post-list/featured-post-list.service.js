import filter from 'lodash.filter';

/**
 * Description of FeaturedPostListService
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class FeaturedPostListService {
    /**
     * Creates a new FeaturedPostListService instance.
     * 
     * @param {ng.IQService} $q The $q service.
     * @param {PostService} postService The PostService instance.
     */
    constructor($q, postService) {
        this.$q = $q;
        this.postService = postService;
    }

    /**
     * Fetches and returns the featured posts.
     * 
     * @returns {ng.IPromise<Array.<Post>>} The featured posts.
     */
    findAll() {
        const self = this;

        return this
            .postService
            .findAll()
            .then(onSuccess)
            .catch(onFailure);

        /**
         * Returns a rejected promise.
         * 
         * @returns {ng.IPromise}
         */
        function onFailure() {
            return self.$q.reject('The featured posts couldn\'t be found!');
        }

        /**
         * Creates and returns only the featured items by the given Post collection.
         * 
         * @param {Array.<Post>} posts The Post collection.
         * @returns {Array.<Post>}
         */
        function onSuccess(posts) {
            return filter(posts, {
                isFeatured: true
            });
        }
    }

    /**
     * Returns the name of injected services.
     * 
     * @returns {Array.<String>}
     * @static
     */
    static get $inject() {
        return [
            '$q',
            'postService'
        ];
    }
}
