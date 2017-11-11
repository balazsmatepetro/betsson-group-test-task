import Post from '../../src/post/post.entity';

describe('Post entity', () => {
    const id = 1;
    const title = 'Title';
    const description = 'Description';
    const imageUrl = 'image-url';

    describe('creation', () => {
        describe('should fail', () => {
            it('when ID is not a number', () => {
                expect(() => new Post('ID')).toThrowError('The ID must be number!');
            });
    
            it('when title is not a string', () => {
                expect(() => new Post(id, true)).toThrowError('The title must be a string!');
            });
    
            it('when title is an empty string', () => {
                expect(() => new Post(id, '')).toThrowError('The title cannot be an empty string!');
            });
    
            it('when description is not a string', () => {
                expect(() => new Post(id, title, true)).toThrowError('The description must be a string!');
            });
    
            it('when description is an empty string', () => {
                expect(() => new Post(id, title, '')).toThrowError('The description cannot be an empty string!');
            });
    
            it('when imageUrl is not a string', () => {
                expect(() => new Post(id, title, description, true)).toThrowError('The image URL must be a string!');
            });
    
            it('when imageUrl is an empty string', () => {
                expect(() => new Post(id, title, description, '')).toThrowError('The image URL cannot be an empty string!');
            });
        });

        describe('should pass', () => {
            let post = undefined;

            beforeEach(() => {
                post = new Post(id, title, description, imageUrl);
            });

            it('when ID is a valid number', () => {
                expect(post.id).toEqual(id);
            });

            it('when title is a valid string', () => {
                expect(post.title).toEqual(title);
            });

            it('when description is a valid string', () => {
                expect(post.description).toEqual(description);
            });

            it('when imageUrl is a valid string', () => {
                expect(post.imageUrl).toEqual(imageUrl);
            });

            it('when isFeatured value is not provided', () => {
                expect(post.isFeatured).toBe(true);
            });

            it('when isActive value is not provided', () => {
                expect(post.isActive).toBe(true);
            });

            it('when isFeatured value is provided', () => {
                const post = new Post(id, title, description, imageUrl, false, false);

                expect(post.isFeatured).toBe(false);
            });

            it('when isActive value is provided', () => {
                const post = new Post(id, title, description, imageUrl, false, false);

                expect(post.isActive).toBe(false);
            });
        });
    });

    describe('validateStringValue', () => {
        describe('should throw exception', () => {
            it('when the given value is not a string', () => {
                expect(() => Post.validateStringValue(1, 'field name')).toThrowError('The field name must be a string!');
            });
    
            it('when the given value is an empty string', () => {
                expect(() => Post.validateStringValue('', 'field name')).toThrowError('The field name cannot be an empty string!');
            });
        });

        describe('should not throw exception', () => {
            it('when the given value is a valid string', () => {
                expect(() => Post.validateStringValue('value', 'field name')).not.toThrowError();
            });
        });
    });
});
