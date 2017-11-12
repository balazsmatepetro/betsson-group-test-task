import isObject from 'lodash.isobject';
import Category from '../category/category.entity';

/**
 * Description of CategoryTreeItem
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class CategoryTreeItem {
    /**
     * Creates a CategoryTreeItem instance.
     * 
     * @param {Category} category The category.
     * @throws {Error} Thrown when the given category is invalid.
     */
    constructor(category) {
        if (!isObject(category) || !(category instanceof Category)) {
            throw new Error('The category must be a Category instance!');
        }

        this.category = category;
        /**
         * @type {Array.<CategoryTreeItem>}
         */
        this.children = [];
    }

    /**
     * Returns the category ID.
     * 
     * @returns {Number}
     */
    get id() {
        return this.category.id;
    }

    /**
     * Returns the category title.
     * 
     * @returns {String}
     */
    get title() {
        return this.category.title;
    }

    /**
     * Returns the isActive value.
     * 
     * @returns {Boolean}
     */
    get isActive() {
        return this.category.isActive;
    }
}
