import filter from 'lodash.filter';
import map from 'lodash.map';
import CategoryTreeItem from './category-tree.entity';

/**
 * Description of CategoryTreeService
 * 
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class CategoryTreeService {
    /**
     * Builds and returns a category tree by the given Category flat list.
     * 
     * @param {Array.<Category>} entities The category flat list.
     * @param {Category} parent The parent instance.
     * @param {Array.<CategoryTreeItem>} tree The tree
     * @returns {Array.<CategoryTreeItem>} The created tree.
     * @throws {Error} Thrown when one of the items is not a Category instance.
     */
    build(entities, parent = { id: null }, tree = []) {
        let children = map(filter(entities, {
            parentId: parent.id
        }), (category) => new CategoryTreeItem(category));

        if (0 !== children.length) {
            if (parent.id == null) {
                tree = children;
            } else {
                parent.children = children;
            }
            map(children, (child) => this.build(entities, child));
        }

        return tree;
    }
}
