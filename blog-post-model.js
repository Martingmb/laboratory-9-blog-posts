const uuid = require('uuid/v4');
const mongoose = require('mongoose');

let blogSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
})

let blogs = mongoose.model('Blogs', blogSchema, 'blogs');



const blogPosts = {
    get: function() {
        return blogs.find().then(blogs => {
            return blogs;
        }).catch(err => {
            throw new Error(err);
        });
    },
    getSportWithID: function(blogID) {
        return blogs.findOne({ id: blogID }).then(blog => {
            if (blog) {
                return blog
            }
            throw new Err("Blog not found");
        }).catch(err => {
            throw new Error(err);
        });
    },
    getAuthorBlogPost: function(author) {
        return blogs.find({ author: author }).then(authorBlogs => {
            if (authorBlogs) {
                return authorBlogs
            }
            throw new Err("Blog not found");
        }).catch(err => {
            throw new Error(err);
        });

    },
    addBlogPost: function(title, content, author) {
        let post = {
            id: uuid(),
            title: title,
            content: content,
            author: author,
            publishDate: Date.now()
        }
        return blogs.create(post).then(blog => {
            console.log(blog)
            return blog;
        }).catch(err => {
            throw new Error(err);
        })

    },
    deletePostWithID: function(id) {
        return blogs.deleteOne({ id: id }).catch(err => {
            throw new Error(err);
        });
    },
    updateBlogWithID: function(id, title, content, author) {
        let newPost = {
            id: uuid(),
            title: title,
            content: content,
            author: author,
            publishDate: Date.now()
        }
        return blogs.findOneAndUpdate({ id: id }, { $set: newPost }, { new: true }).then(blog => {
            if (blog) {
                return blog;
            }
            throw new Err("Blog not found");
        }).catch(err => {
            throw new Error(err);
        })
    }
}


module.exports = { blogPosts };