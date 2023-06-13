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
    textarea.style.display = "flex";
    textarea.innerHTML = desc.innerHTML.trim();
    editButton.innerHTML = "Finish editing";
}

function finishEditing() {
    desc = document.querySelector("#profile-description");
    textarea = document.querySelector("#profile-description-textarea");
    
    textarea.style.display = "none";
    desc.style.display = "flex";
    desc.innerHTML = textarea.value.trim();
    editButton.innerHTML = "Edit Profile";
}

editButton.addEventListener("click", toggleEditing);

