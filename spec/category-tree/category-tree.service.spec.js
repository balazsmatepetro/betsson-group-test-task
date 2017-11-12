import isArray from 'lodash.isarray';
import Category from '../../src/category/category.entity';
import CategoryTreeService from '../../src/category-tree/category-tree.service';

describe('CategoryTreeService', () => {
    const categories = [
        new Category(1, 'Category 1'),
        new Category(2, 'Category 2 - Sub 1', 8),
        new Category(3, 'Category 3'),
        new Category(4, 'Category 5', 3),
        new Category(5, 'Category 2 - Sub 1 - Sub - 1', 2),
        new Category(6, 'Category 4', 3),
        new Category(7, 'Category 2 - Sub 1 - Sub - 2', 2),
        new Category(8, 'Category 2')
    ];
    const service = new CategoryTreeService;

    describe('build', () => {
        it('should provide a proper tree based on the given Category collection', () => {
            const buildSpy = spyOn(service, 'build').and.callThrough();

            const tree = service.build(categories);

            expect(isArray(tree)).toBe(true);
            expect(tree.length).toEqual(3);

            expect(tree[0].children.length).toEqual(0);
            expect(tree[0].title).toEqual('Category 1');

            expect(tree[1].children.length).toEqual(2);
            expect(tree[1].title).toEqual('Category 3');
            expect(tree[1].children[0].children.length).toEqual(0);
            expect(tree[1].children[1].children.length).toEqual(0);
            expect(tree[1].children[0].title).toEqual('Category 5');
            expect(tree[1].children[1].title).toEqual('Category 4');

            expect(tree[2].children.length).toEqual(1);
            expect(tree[2].title).toEqual('Category 2');
            expect(tree[2].children[0].title).toEqual('Category 2 - Sub 1');
            expect(tree[2].children[0].children.length).toEqual(2);
            expect(tree[2].children[0].children[0].title).toEqual('Category 2 - Sub 1 - Sub - 1');
            expect(tree[2].children[0].children[1].title).toEqual('Category 2 - Sub 1 - Sub - 2');

            expect(buildSpy).toHaveBeenCalledTimes(9);
        });

        it('should throw exception when one of the items is not a Category instance', () => {
            const modifiedCategories = categories.slice(0);
            modifiedCategories.push({
                id: 9,
                title: 'Category - X',
                parentId: null,
                isActive: true
            });

            expect(() => service.build(modifiedCategories)).toThrowError('The category must be a Category instance!');
        });
    });
});
