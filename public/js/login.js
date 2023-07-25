// async function to make a fetch request to the login route
async function login(event) {
    event.preventDefault(); // prevent default form submission
// get the user email and password from the form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
// if the email and password exist, use the login route to login the user 
    if (email && password) { 
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
// if the response is ok, reload the page, otherwise display the error
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            let result = await response.json();
            alert(result.message);
        }
    }
}
// add an event listener to the form to call the login function when the form is submitted
document
    .querySelector('.login-form')
    .addEventListener('submit', login);
    
