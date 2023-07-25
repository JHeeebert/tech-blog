// Initiated by clicking on the logout button in the nav bar
async function logout() {
// use the logout route to logout the user
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
// if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
        document.location.replace('/');
    } else { // if the response is not ok, display the error
        alert(response.statusText);
    }
}
// add an event listener to the logout button to call the logout function when the button is clicked
document.querySelector('#logout').addEventListener('click', logout);