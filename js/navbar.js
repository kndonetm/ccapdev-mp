document.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        document.querySelector('.navbar-custom').classList.add('floating-nav');
    } else {
        document.querySelector('.navbar-custom').classList.remove('floating-nav');
    }
})

class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-custom navbar-light sticky-top">
      <div class="container p-1">
          <a href="index.html" class="navbar-brand h1 mb-0">
              <img src="../assets/icon.png" alt="">
              Navbar
          </a>
          <form class="d-flex position-relative search-container">
              <input type="text" class="form-control" placeholder="Search establishments">
              <button type="submit" class="btn btn-success position-absolute end-0"><i class="fa fa-search"></i></button>
          </form>
          <ul class="navbar-nav">
          </ul>
      </div>
  </nav>

  <!--Modal-->
  <div class="modal modal-xl fade signin-modal" id="signin" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <div class="modal-body">
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                  <div class="d-flex">
                      <div class="myform">
                          <div class="d-flex mt-2">
                              <img src="../assets/icon.png" alt="" class="me-2">
                              <h5>Navbar</h5>
                          </div>
                          <h1 class="text-center mt-5 text-dark">Welcome Back!</h1>
                          <form>
                              <div class="mb-3 mt-4 form-floating">
                                  <input placeholder="username" type="text" class="form-control" id="username-login">
                                  <label for="username-login" class="form-label">Username</label>
                              </div>
                              <div class="mb-3 form-floating">
                                  <input placeholder="password" type="password" class="form-control" id="password-login">
                                  <label for="password-login" class="form-label">Password</label>
                              </div>
                              <input type="checkbox" id="remember-me">
                              <label for="remember-me"><p class="subtext">Remember Me</p></label>
                              <button type="button" class="btn btn-light mt-4 gy-0 signin-js">SIGN IN</button>
                              <p class="pt-3 subtext">Don't have an account? <a href="#" data-bs-target="#register" data-bs-toggle="modal">Sign up</a></p>
                          </form>
                      </div>
                      <img src="../assets/modal-placeholder.jpg" alt="" class="d-block">
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="modal modal-xl fade reg-modal" id="register" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <div class="modal-body">
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                  <div class="d-flex">
                      <div class="myform">
                          <div class="d-flex mt-2">
                              <img src="../assets/icon.png" alt="" class="me-2">
                              <h5>Navbar</h5>
                          </div>
                          <div class="d-flex justify-content-between">
                              <div class="register-intro">
                                  <h2 class="mt-5">Create your account</h2>
                                  <p class="text-start caption">Write food reviews for your fellow Lasallians!</p>
                              </div> 
                              <div class="user-img">
                                  <img src="../assets/store-placeholder.png" alt="" id="pfp-input">
                                  <input type="file" id="file">
                                  <label for="file" id="uploadbtn"><i class="fas fa-camera"></i></label>
                              </div>
                          </div>
                          <form>
                              <div class="mb-3 mt-4 form-floating">
                                  <input placeholder="username" type="text" class="form-control" id="username-reg">
                                  <label for="username-reg" class="form-label">Username</label>
                              </div>
                              <div class="mb-3 form-floating">
                                  <input placeholder="password" type="password" class="form-control" id="password-reg">
                                  <label for="password-reg" class="form-label">Password</label>
                              </div>
                              <div class="mb-3 form-floating">
                                  <input placeholder="about-you" type="text" class="form-control" id="about-you-reg">
                                  <label for="about-you-reg" class="form-label">About You</label>
                              </div>
                              <button type="button" class="btn btn-light mt-4 gy-0 reg-js">SIGN UP</button>
                              <p class="pt-3 subtext">Already have an account? <a href="#" data-bs-target="#signin" data-bs-toggle="modal">Sign in</a></p>
                          </form>
                      </div>
                      <img src="../assets/modal-placeholder.jpg" alt="" class="d-block">
                  </div>
              </div>
          </div>
      </div>
  </div>
      `;
    }
  }
  
customElements.define('nav-component', Header);



