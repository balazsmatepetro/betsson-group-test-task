const express = require('express');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const distPath = __dirname + '/dist';

app.use('/dist', express.static(distPath));

/**
 * @type {Array}
 */
const categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf8'));

/**
 * @type {Array}
 */
const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));

// TODO: Serve from dist!
app.get('/', (request, response) => response.sendFile(__dirname + '/index.html'));

app.get('/categories', (request, response) => response.json(categories));

app.get('/categories/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);

    const category = findCategoryById(id);

    if (!category) {
        response.sendStatus(404);
    }

    return response.json(category);
});

app.get('/categories/:id/posts', (request, response) => {
    const id = parseInt(request.params.id, 10);

    if (!findCategoryById(id)) {
        response.sendStatus(404);
    }

    const categoryPosts = posts.filter((post) => id === post['category_id']).map(createPostListItem);

    return response.json(categoryPosts);
});

app.get('/posts', (request, response) => response.json(posts.map(createPostListItem)));

app.get('/posts/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);

    const post = posts.find((post) => {
        return id === post.id;
    });

    if (!post) {
        return response.sendStatus(404);
    }

    return response.json(post);
});

function createPostListItem(post) {
    const clone = Object.assign({}, post);
    const dom = new JSDOM(clone.description);

    clone.description = dom.window.document.querySelector('p').textContent;

    return clone;
}

function findCategoryById(categoryId) {
    return categories.find((category) => categoryId === category.id);
}

app.listen(3000);
