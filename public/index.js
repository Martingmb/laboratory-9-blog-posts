function displayResults(data) {
    $('.blog-list').empty();
    console.log(data)
    for (let i = 0; i < data.posts.length; i++) {
        $('.blog-list').append(`<li> ID: ${data.posts[i].id} <br> Title: ${data.posts[i].title} <p> ${data.posts[i].content} </p> Author ${data.posts[i].author} <br> Publish Date: ${data.posts[i].publishDate} <br> </li>`);
    }
}


function fetchBlogs() {
    let url = '/blog/api/blog-posts';

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => displayResults(responseJSON))
        .catch(err => {
            console.log(err);
        });

}

function createFetchBlog(blogTitle, blogAuthor, blogContent) {
    let url = '/blog/api/post-blog';
    let settings = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: blogTitle,
            content: blogContent,
            author: blogAuthor
        })
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Your blog was added correctly. Hit the CLICK ME BUTTON to load it")
        })
        .catch(err => {
            console.log(err);
        });
}

function updateFetchBlog(blogTitle, blogAuthor, blogContent, blogID) {
    let url = '/blog/api/update-blog/' + blogID;
    let settings = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: blogID,
            post: {
                id: blogID,
                title: blogTitle,
                author: blogAuthor,
                content: blogContent
            }
        })
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Your blog was updated correctly. Hit the CLICK ME BUTTON to load it")
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteFetchBlog(blogID) {
    let url = '/blog/api/delete-blog/' + blogID;
    let settings = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: blogID
        })
    };

    console.log(settings)

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Your blog was deleted correctly. Hit the CLICK ME BUTTON to load it")
        })
        .catch(err => {
            console.log(err);
        });
}

function watchForm() {
    $('.getBlogs').on('submit', function(e) {
        e.preventDefault();
        console.log("ENTRE A retriveBlogs")
        fetchBlogs();
    });

    $('.createBlog').on('submit', function(e) {
        e.preventDefault();
        let title = $('#blogTitle').val();
        let author = $('#blogAuthor').val();
        let content = $('#blogContent').val();
        createFetchBlog(title, author, content);
    });

    $('.updateBlog').on('submit', function(e) {
        e.preventDefault();
        let title = $('#ublogTitle').val();
        let author = $('#ublogAuthor').val();
        let content = $('#ublogContent').val();
        let id = $('#ublogID').val();
        updateFetchBlog(title, author, content, id);
    });

    $('.deleteBlog').on('submit', function(e) {
        e.preventDefault();
        let id = $('#blogID').val();
        deleteFetchBlog(id);
    });
}

$(watchForm);