// async function to edit a user:
async function editUser(event) {
    event.preventDefault(); // prevent the default form behavior
// get the user name from the form and trim any whitespace
    let username = document.querySelector('#username').value.trim();
    if (username.length) username = '"username":"' + username + '"';
// get the email from the form and trim any whitespace
    let email = document.querySelector('#email').value.trim();
    if (email.length) email = '"email":"' + email + '"';
// get the password from the form and trim any whitespace
    let password = document.querySelector('#password').value.trim();
    if (password.length) { // if the password is blank, alert the user and return
        alert('Please enter your current password to change it.');
        return;
    } else { // otherwise, add the password to the userUpdate string
        password = '"password":"' + password + '"';
    }
// get the user id from the url
    const id = document.querySelector('#user-id').value.trim();
// create the userUpdate string to pass to the fetch call
    let updateData = "{" + [username, email, password].filter((value) => value).join(",") + "}";
    updateData = JSON.parse(userUpdate);
// if the comment text exists, use the add comment route to add the comment to the database
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
    });
// if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
            }
}
// add an event listener to the form to call the commentForm function when the form is submitted
document.querySelector('.edit-user-form').addEventListener('submit', editUser);