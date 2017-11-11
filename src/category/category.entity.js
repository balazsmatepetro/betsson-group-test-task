import isNumber from 'lodash.isnumber';
import isString from 'lodash.isstring';

/**
 * Description of Category.
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Category {
    /**
     * Creates a Category instance.
     * 
     * @param {Number} id The category ID.
     * @param {String} title The category name.
     * @param {Boolean} [isActive] The category is active or not.
     * @throws {Error} Thrown when one of the arguments is invalid.
     */
    constructor(id, title, isActive = true) {
        if (!isNumber(id)) {
            throw new Error('The ID must be a number!');
        }

        if (!isString(title)) {
            throw new Error('The title must be a string!');
        }

        if (0 === title.length) {
            throw new Error('The title cannot be an empty string!');
        }

        this.id = id;
        this.title = title;
        this.isActive = !!isActive;
    }
}
