// async function to edit a user:
async function editUser(event) {
    event.preventDefault();
    let username = document.querySelector('#username').value.trim();
    if (username.length) username = '"username":"' + username + '"';
    let email = document.querySelector('#email').value.trim();
    if (email.length) email = '"email":"' + email + '"';
    let password = document.querySelector('#password').value.trim();
    if (password.length) {
        alert('Please enter your current password to change it.');
        return;
    } else {
        password = '"password":"' + password + '"';
    }
    const id = document.querySelector('#user-id').value.trim();
    let updateData = "{" + [username, email, password].filter((value) => value).join(",") + "}";
    updateData = JSON.parse(userUpdate);
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
            }
}
document.querySelector('.edit-user-form').addEventListener('submit', editUser);