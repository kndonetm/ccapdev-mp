let searchKey = document.querySelector("#search-key");
const formElement = document.forms.search_form;

search_btn.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(formElement);
    const searchInput = formData.get("search_input");

    searchKey.innerHTML = `${searchInput}`;
    console.log("1");
});