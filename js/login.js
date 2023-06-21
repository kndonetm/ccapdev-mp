let currentLogin = false;

document.querySelector('.signin-js').addEventListener('click', () => {
    login(document.querySelector('#username-login').value, document.querySelector('.signin-modal'));
})

document.querySelector('.reg-js').addEventListener('click', () => {
    const fileInput = document.querySelector('#file');
    const file = fileInput.files[0];
    file ? login(document.querySelector('#username-reg').value, document.querySelector('.reg-modal'), file.name) :
           login(document.querySelector('#username-reg').value, document.querySelector('.reg-modal'));
})

function login(username, modal, image = 'icon.png') {
    if (!currentLogin) {
        login = true;

        let navHTML = `
        <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle p-0" role="button" data-bs-toggle="dropdown">
                <div class="d-inline-block mb-0">
                    <img src="../images/${image}" alt="" class="pfp">
                    <span class="fs-6">Hello,<span class="fw-semibold"> ${username}</span> </span>
                </div>
            </a>
            <ul class="dropdown-menu">
                <li><a href="" class="dropdown-item">Profile</a></li>
                <li><a href="" class="dropdown-item">Logout</a></li>
            </ul>
        </li>`;

        $(modal).modal('hide');

        document.querySelector('.navbar-nav').innerHTML = navHTML;
    }
}