function createAccount(e){
    e.preventDefault();

    // Form Fields
    const login = $('input[name="login"]').val();
    const displayName = $('input[name="displayName"]').val();
    const password = $('input[name="password"]').val();
    const formFields = {login, displayName, password};
    
    fetch('/api/createaccount', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formFields)})
    .then((response) => {
        response.json().then(data => {
            const {error} = data;
            // Handle errors sent by server
            if (response.status === 400) {
                // Error associated with the login
                if (error && error.login) {
                    $('#loginError').text(error.login);
                }    
            }
            else {
                // the '?accountCreated' query tells the '/login' route to display a message telling the user his account was successfully created.
                window.location.href='/login?accountCreated=true';
            }
        });
    }).catch(error => {
        console.log(error);
    })
}

function attemptLogin(e){
    e.preventDefault();
    
    // Form Fields
    const login = $('input[name="login"]').val();
    const password = $('input[name="password"]').val();
    const formFields = {login, password};
    
    fetch('/api/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formFields)})
    .then(response => {
        response.json().then(data => {
            const {error} = data;
            // Handle errors sent by server
            if (response.status === 400) {
                if (error && error.form){
                    $('#formError').text(data.error.form);
                }
            }
            else {
                // Redirect user to the index page, after being logged in
                window.location.href = '/';
            }
        }).catch(error => {
            console.log(error);
        })
    });
}

function createWeatherCard(e) {
    e.preventDefault();
    const input = $('input[name="q"]');
    const inputVal = input.val();
    const inputName = input.attr('name');
    fetch(`/api/weather?${inputName}=${inputVal}`).then(response => {
        response.json().then((data) => {
            const {error} = data;
            // Handle errors associated with creation of a weather card
            if (response.status === 404) {
                if (error) {
                    console.log(response.status);
                    $('#searchError').text(error).removeClass('d-none');
                }
            }
            else {
                window.location.replace('/');
            }
        });
    })
}

function removeWeatherCard(e){
    const cardId = e.currentTarget.dataset.id;
    fetch(`/api/weather?id=${cardId}`, {method: 'DELETE'})
    .then(response => {
        response.json()
        .then((data) => {
                window.location.replace('/');
        });
    })
    .catch(error => console.log(error))
}

/**
 * Checks whether the login input in the signup page conforms to the following rules, and appends
 * error messages accordingly:
 * 1. Has between 4 and 32 characters
 * 2. Doesn't start with a number
 * 3. Doesn't have special characters 
 *  */
function checkLoginConformity(e){
    const currVal = e.currentTarget.value;
    const loginError = $('#loginError');
    // Checks input length
    if (currVal.length > 32 || currVal.length < 4){
        loginError.text('Login needs to have between 4 and 32 characters.');
    }
    // Does the login value start with a number?
    else if(/^[\d]+/gi.test(currVal)){
        loginError.text('Login cannot start with numbers.');
    }
    else if(/[\W]/gi.test(currVal)) {
        loginError.text('Special characters such as "@", "." and spaces are not allowed.');
    }
    else {
        loginError.text('');
    }
}

$(document).ready(function(){
    // Append removeWeatherCard to every 'remove card' button
    $('.btn-delete-card').on('click', removeWeatherCard);
});