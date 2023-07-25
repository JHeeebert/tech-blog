// async function to edit a post:
async function editPost(event) {
    event.preventDefault(); // prevent the default form behavior
// get the post id from the url
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
// get the post title and post content from the form
    const title = document.querySelector('#post-title').value.trim();
// get content from the form and trim any whitespace
    const content = document.querySelector('#post-content').value.trim();
// if the comment text exists, use the add comment route to add the comment to the database
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
    });
// if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}
// add an event listener to the form to call the commentForm function when the form is submitted
document.querySelector('.edit-post-form').addEventListener('submit', editPost);