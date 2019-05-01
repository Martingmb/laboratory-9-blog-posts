const express = require('express');
const router = express.Router();
const { blogPosts } = require('./blog-post-model');


router.get('/blog-posts', (req, res, next) => {

    blogPosts.get().then(blogs => {
        res.status(200).json({
            message: "Succesfully sent the list of blogs",
            status: 200,
            posts: blogs
        });
    }).catch(err => {
        res.status(500).json({
            message: `Internal server error.`,
            status: 500
        });
        return next();

    });

})

router.get('/blog-posts/:author', (req, res, next) => {
    let author = req.params.author;

    if (author == "" || author == undefined) {
        res.status(406).json({
            message: "Author not specified",
            status: 406
        });
        return next();
    }

    let authorPosts = blogPosts.getAuthorBlogPost(author);

    if (authorPosts.length > 0) {
        res.status(200).json({
            message: "Succesfully sent the list of blogs",
            status: 200,
            posts: authorPosts
        });
        return next();
    } else {
        res.status(404).json({
            message: "Author doesn't exist",
            status: 404
        });
        return next();
    }


})

router.post('/post-blog', (req, res, next) => {

    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;

    if (title == undefined || title == "" || content == undefined || author == undefined) {
        res.status(406).json({
            message: "A value is missing",
            status: 400
        });
        return next();
    }

    blogPosts.addBlogPost(title, content, author).then(blog => {
        res.status(201).json({
            message: "Succesfully added new post",
            status: 201,
            blogs: blog
        });
    }).catch(err => {
        res.status(500).json({
            message: `Internal server error.`,
            status: 500
        });
        return next();
    });



})

router.delete('/delete-blog/:id', (req, res, next) => {
    let idP = req.params.id;
    let idB = req.body.id;


    if (idP != idB) {
        res.status(406).send('Not matching values in body and params!');
    } else {
        if (blogPosts.deletePostWithID(idP)) {
            res.status(204).json({
                message: "Post deleted succesfully!",
                status: 204
            });
            return next();
        } else {
            res.status(404).json({
                message: "Blog doesn't exist",
                status: 404
            });
            return next();
        }
    }

})

router.put('/update-blog/:id', (req, res, next) => {
    let idP = req.params.id;
    let idB = req.body.post.id;
    let post = req.body.post;

    if (idP != idB) {
        res.status(406).json({
            message: "Not matching values in body and params!",
            status: 406
        });
        return next();
    } else if (Object.keys(post).length <= 1) {
        res.status(404).json({
            message: "The object needs to have at least one field",
            status: 404
        });
        return next();
    } else {

        blogPosts.updateBlogWithID(idP, post.title, post.content, post.author).then(blog => {
            res.status(200).json({
                message: "Updated Sucessfully",
                status: 200,
                blog: blog
            });
        }).catch(err => {
            res.status(404).json({
                message: "Blog not found",
                status: 404
            });

            next();
        });
    }

})

module.exports = router;