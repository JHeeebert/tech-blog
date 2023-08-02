// Purpose: signup.js is used to handle the signup form submission
async function signupForm(event) {
// prevent the default form behavior
    event.preventDefault();
// get the user name, email, and password from the form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
// if the user name, email, and password exist, use the add user route to add the user to the database
    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
// if the response is ok, reload the page, otherwise display the error
        if (response.ok) {
            console.log('Success, logging you in!');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
// add an event listener to the form to call the signup function when the form is submitted
document.querySelector('.signup-form').addEventListener('submit', signupForm);