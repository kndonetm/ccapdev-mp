const editButton = document.querySelector("#edit-profile-btn")

var currentlyEditing = false;

function toggleEditing() {
    if (!currentlyEditing) {
        editProfile();
    } else {
        finishEditing();
    }

    currentlyEditing = !currentlyEditing;
}

function editProfile() {
    desc = document.querySelector("#profile-description");
    textarea = document.querySelector("#profile-description-textarea");

    desc.style.display = "none";
    textarea.style.display = null;
    textarea.innerHTML = desc.innerHTML.trim();
    editButton.innerHTML = "Finish editing";
}

function finishEditing() {
    desc = document.querySelector("#profile-description");
    textarea = document.querySelector("#profile-description-textarea");
    
    textarea.style.display = "none";
    desc.style.display = null;
    desc.innerHTML = textarea.value.trim();
    editButton.innerHTML = "Edit Profile";
}

editButton.addEventListener("click", toggleEditing);

window.addEventListener("load", event=> {
    if ( document.URL.includes("user-profile-view.html") ) {
    thename = document.querySelector('.username')
    thename.innerHTML = localStorage.getItem('savedUsername')
    profdesc = document.querySelector('#profile-description')
    profdesc.innerHTML =  localStorage.getItem('descProf')
    anchor = document.querySelector('a.logout')
    anchor.href = "index.html"
    dpic = document.querySelector("#profile-img-top")
    dpic.src = `${localStorage.getItem('pfp')}`;
    pfP = document.querySelectorAll(".samplePfp")
    sName = document.querySelectorAll(".sampleName")
    for (let i=0; i < pfP.length; i++) {
        pfP[i].src = `${localStorage.getItem('pfp')}`;
    } for (let i=0; i < sName.length; i++) {
        sName[i].innerHTML = localStorage.getItem('savedUsername')
    }
}})

document.addEventListener ("change", events=>{
    const fileInputs = document.querySelector('#profile-img-caption');
    const file = fileInputs.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageDatas = event.target.result;
            localStorage.setItem('pfp', imageDatas)
        }
        reader.readAsDataURL(file);
        dpic = document.querySelector("#profile-img-top")
        dpic.src = localStorage.getItem('pfp')
        updateNavbar();
        anchor = document.querySelector('a.logout')
        anchor.href = "index.html"
        pfP = document.querySelectorAll(".samplePfp")
        for (let i=0; i < pfP.length; i++) {
            pfP[i].src = localStorage.getItem('pfp');
        }
        location.reload();
    }

})