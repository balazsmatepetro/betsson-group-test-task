import Category from '../../src/category/category.entity';

describe('Category entity creation', () => {
    const id = 1;
    const title = 'Category 1';

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
    });

    describe('should pass', () => {
        let category = undefined;

        beforeEach(() => {
            category = new Category(id, title);
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

        it('when the isActive value is provided', () => {
            const category = new Category(id, title, false);

            expect(category.isActive).toEqual(false);
        });
    });
});
