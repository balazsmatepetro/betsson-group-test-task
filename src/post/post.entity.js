import isNumber from 'lodash.isnumber';
import isString from 'lodash.isstring';

/**
 * Description of Post
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Post {
    /**
     * Creates a Post instance.
     * 
     * @param {Number} id The post ID.
     * @param {String} title The post title.
     * @param {String} description The post description.
     * @param {String} imageUrl The image URL.
     * @param {Boolean} [isFeatured] The post is featured or not.
     * @param {Boolean} [isActive] The post is active or not.
     * @throws {Error} Thrown when one of the arguments is invalid.
     */
    constructor(id, title, description, imageUrl, isFeatured = true, isActive = true) {
        if (!isNumber(id)) {
            throw new Error('The ID must be number!');
        }

        this.constructor.validateStringValue(title, 'title');
        this.constructor.validateStringValue(description, 'description');
        this.constructor.validateStringValue(imageUrl, 'image URL');

        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.isFeatured = !!isFeatured;
        this.isActive = !!isActive;
    }

    /**
     * Checks the validity of the given string.
     * 
     * @param {String} value The value to check
     * @param {String} fieldName The name of field.
     * @throws {Error} Thrown when the given string value is invalid.
     */
    static validateStringValue(value, fieldName) {
        if (!isString(value)) {
            throw new Error(`The ${fieldName} must be a string!`);
        }

        if (0 === value.length) {
            throw new Error(`The ${fieldName} cannot be an empty string!`);
        }
    }
}
