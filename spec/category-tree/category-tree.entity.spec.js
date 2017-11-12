import Category from '../../src/category/category.entity';
import CategoryTreeItem from '../../src/category-tree/category-tree.entity';

describe('CategoryTreeItem', () => {
    describe('entity creation', () => {
        describe('should fail', () => {
            it('when the the given argument is not an object', () => {
                expect(() => new CategoryTreeItem(1)).toThrowError('The category must be a Category instance!');
            });

            it('when the given argument is not a Category instance', () => {
                expect(() => new CategoryTreeItem(new Date)).toThrowError('The category must be a Category instance!');
            });
        });

        describe('should pass', () => {
            it('when the given argument is a category instance', () => {
                const category = new Category(1, 'Title');

                expect(() => new CategoryTreeItem(category)).not.toThrowError();
            });
        });
    });

    describe('should provide proper value', () => {
        const id = 1;
        const title = 'Title';
        const parentId = 2;
        const isActive = true;
        const category = new Category(id, title, parentId, isActive);
        let categoryTreeItem = undefined;

        beforeEach(() => {
            categoryTreeItem = new CategoryTreeItem(category);
        });

        it('when getting ID', () => {
            expect(categoryTreeItem.id).toEqual(id);
        });

        it('when getting title', () => {
            expect(categoryTreeItem.title).toEqual(title);
        });

        it('when getting isActive value', () => {
            expect(categoryTreeItem.isActive).toEqual(isActive);
        });

        it('when getting children', () => {
            expect(categoryTreeItem.children).toEqual([]);
        });
    });
});
