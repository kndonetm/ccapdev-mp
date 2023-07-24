const form = document.querySelector("form");
const usernameError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    // reset errors
    usernameError.textContent = "";
    passwordError.textContent = "";

    // get values
    const username = form.username.value;
    const password = form.password.value;

    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
            usernameError.textContent = data.errors.username;
            passwordError.textContent = data.errors.password;
        }
        if (data.user) {
            //change
            console.log(data.user.name)
            // localStorage.setItem('savedUsername', data.user.username);
            // localStorage.setItem('descProf', data.user.description);
            // localStorage.setItem('pfp',  data.user.pfp);

            localStorage.setItem('currentLogin', 'true')
            const redirect = "/users/" + username;
            location.assign(redirect);
        }
    } catch (err) {
        console.log(err);
    }
});