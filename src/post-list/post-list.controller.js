export default class PostListController {
    constructor($scope) {
        this.$scope = $scope;
    }

    /**
     * Returns the name of injected services.
     * 
     * @returns {Array.<String>}
     * @readonly
     * @static
     */
    static get $inject() {
        return [
            '$scope'
        ];
    }
}
