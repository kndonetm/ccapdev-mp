const loginForm = document.querySelector("#user-login-form");
const registerForm = document.querySelector("#user-register-form");
const loginErrorElement = document.querySelector("#error-text-login");
const registerErrorElement = document.querySelector("#register-text-login");

updateNavbar();

function login(username, desc, modal, image) {
    localStorage.setItem('currentLogin', 'true');
    localStorage.setItem('savedUsername', username);
    localStorage.setItem('descProf', desc);

    image ? localStorage.setItem('pfp', image) : localStorage.setItem('pfp', '/static/assets/user-pfp-placeholders/unknown.jpg');

    if (localStorage.getItem('savedUsername') && (document.querySelector('#password-reg').value || document.querySelector('#password-login').value)) {
        $(modal).modal('hide');
        updateNavbar();
    }
}


registerForm.addEventListener('submit', async () => {
    const formData = new FormData(registerForm);

    const dataObj = {
        "username": formData.get("username-reg"),
        "password": formData.get("password-reg"),
        "about": formData.get("about-you-reg"),

        // TEMP: no profile pic uploads yet
        "profilePicture": "/static/assets/user-pfp-placeholders/unknown.jpg",
    }

    const jsonData = JSON.stringify(dataObj);
    console.log(jsonData);

    try {
        const response = await fetch("/register", {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.status === 200) {
            login(dataObj.username, dataObj.about, document.querySelector(".reg-modal"), dataObj.profilePicture);
            location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.log(err);
    }

    // const fileInput = document.querySelector('#file');
    // const file = fileInput.files[0];

    // if (file) {
    //     const reader = new FileReader();
    //     reader.onload = function(event) {
    //         const imageData = event.target.result;
    //         login(document.querySelector('#username-reg').value, document.querySelector('#about-you-reg').value, document.querySelector('.reg-modal'), imageData);
    //     }
    //     reader.readAsDataURL(file);
    // } else {
    //     login(document.querySelector('#username-reg').value, document.querySelector('#about-you-reg').value, document.querySelector('.reg-modal'));
    // }      
});

loginForm.addEventListener('submit', async () => {
    const formData = new FormData(loginForm);

    const dataObj = {
        "username": formData.get("username-login"),
        "password": formData.get("password-login"),
    }

    const jsonData = JSON.stringify(dataObj);

    try {
        const response = await fetch("/login", {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log(result);
            login(result.username, result.description, document.querySelector(".signin-modal"), result.profilePicture);
            location.reload();
        } else if (response.status === 403) {
            const result = await response.json();
            loginErrorElement.innerHTML = result.err;
            console.log("Status code received: " + response.status);
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.log(err);
    }

    // desc = "Hello, I'm " + document.querySelector('#username-login').value
    // login(document.querySelector('#username-login').value, desc, document.querySelector('.signin-modal'));
});



document.addEventListener('click', (event) => {
    if (event.target.classList.contains('logout')) {
        localStorage.setItem('currentLogin', 'false');
        localStorage.clear();
        updateNavbar();
    }
});

function updateNavbar() {
    let navHTML = '';

    if (localStorage.getItem('currentLogin') === 'true') {
        navHTML = `
            <li class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle p-0" role="button" data-bs-toggle="dropdown">
                    <div class="d-inline-block mb-0">
                        <img src="${localStorage.getItem('pfp')}" alt="" class="pfp">
                        <span class="fs-6">Hello,<span class="fw-semibold"> ${localStorage.getItem('savedUsername')}</span> </span>
                    </div>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="/users/" class="dropdown-item profile-view">Profile</a></li>
                    <li><a href="#" class="dropdown-item logout">Logout</a></li>
                </ul>
            </li>`;
    } else {
        // Default navbar HTML when the user is not logged in
        navHTML = `
            <li class="nav-item me-2">
            <button class="btn btn-success rounded-5" data-bs-target="#signin" data-bs-toggle="modal">Sign in</button>
            </li>
            <li class="nav-item">
                <button class="btn btn-success rounded-5" data-bs-target="#register" data-bs-toggle="modal">Sign up</button>
            </li>`;
    }

    document.querySelector('.navbar-nav').innerHTML = navHTML;
}
