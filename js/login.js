let login = false;



if (!login) {
    document.querySelector('.signin-js').addEventListener('click', () => {
        login = true;
        let username = document.querySelector('#username-login').value;
        let password = document.querySelector('#password-login').value;
    
        let navHTML = `
        <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle p-0" role="button" data-bs-toggle="dropdown">
                <div class="d-inline-block mb-0">
                    <img src="../images/icon.png" alt="">
                    <span class="fs-6">Hello,<span class="fw-semibold"> ${username}</span> </span>
                </div>
            </a>
            <ul class="dropdown-menu">
                <li><a href="" class="dropdown-item">Profile</a></li>
                <li><a href="" class="dropdown-item">Logout</a></li>
            </ul>
        </li>`;
    
        let modal = document.querySelector('.signin-modal');
        $(modal).modal('hide');
    
        document.querySelector('.navbar-nav').innerHTML = navHTML;
    })
    
}

