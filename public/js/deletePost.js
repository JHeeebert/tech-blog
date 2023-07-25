// Initiated by clicking the delete button on the dashboard page
async function deletePost(event) {
    event.preventDefault(); // prevent default form submission
// get the post id from the url
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
// use the delete post route to delete the post from the database
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
// if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
// add an event listener to the delete button to call the deletePost function when the button is clicked
document.querySelector('.delete-post-btn').addEventListener('click', deletePost);
