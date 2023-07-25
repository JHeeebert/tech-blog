// Purpose: comment.js is used to handle the comment form submission and add the comment to the database
async function commentForm(event) {
    event.preventDefault(); // prevent the default form behavior
// get the comment text from the form
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
// get the post id from the url
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
// if the comment text exists, use the add comment route to add the comment to the database
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_text }),
            headers: { 'Content-Type': 'application/json' }
        });
// if the response is ok, reload the page, otherwise display the error
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
// add an event listener to the form to call the commentForm function when the form is submitted
document.querySelector('.comment-form').addEventListener('submit', commentForm);