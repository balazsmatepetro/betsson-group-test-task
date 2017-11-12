import Category from '../../src/category/category.entity';

describe('Category entity creation', () => {
    const id = 1;
    const title = 'Category 1';
    const parentId = null;

    describe('should fail', () => {
        it('when the ID is not a number', () => {
            expect(() => new Category('id')).toThrowError('The ID must be a number!');
        });

        it('when the title is not a string', () => {
            expect(() => new Category(id, true)).toThrowError('The title must be a string!');
        });

        it('when the title is an empty string', () => {
            expect(() => new Category(id, '')).toThrowError('The title cannot be an empty string!');
        });

        it('when the parent ID is not null or number', () => {
            expect(() => new Category(id, title, 'parentId')).toThrowError('The parent ID must be a number or null!');
        });
    });

    describe('should pass', () => {
        let category = undefined;

        beforeEach(() => {
            category = new Category(id, title, parentId);
        });

        it('when the ID is a number', () => {
            expect(category.id).toEqual(id);
        });

        it('when the title is a not empty string', () => {
            expect(category.title).toEqual(title);
        });

        it('when the isActive value is not provided', () => {
            expect(category.isActive).toEqual(true);
        });

        it('when the parentId is null', () => {
            const category = new Category(id, title, null, true);

            expect(category.parentId).toEqual(null);
        });

        it('when the parentId is a number', () => {
            const category = new Category(id, title, 10, true);

            expect(category.parentId).toEqual(10);
        });

        it('when the isActive value is provided', () => {
            const category = new Category(id, title, parentId, false);

            expect(category.isActive).toEqual(false);
        });
    });
});
