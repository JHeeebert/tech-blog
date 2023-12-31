// Purpose: addPost.js is used to add a new post to the database
async function addPostForm(event) {
    event.preventDefault();
// get the post title and post content from the form
    const title = document.querySelector('input[name="post-title"]').value;
// get content from the form and trim any whitespace
    const post_text = document.querySelector('textarea[name="post-text]').value;
// use the add post route to add the post to the database
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
// if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}
// add an event listener to the form to call the addPost function when the form is submitted
document.querySelector('.new-post-form').addEventListener('submit', addPostForm);
