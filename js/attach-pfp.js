const imgDiv = document.querySelector('.user-img');
const file = document.querySelector('#file');
const uploadbtn = document.querySelector('#uploadbtn');
const img = document.querySelector('#pfp-input');

file.addEventListener('change', function(){
    const chosedfile = this.files[0];
    if (chosedfile) {
        const reader = new FileReader();
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        })
        reader.readAsDataURL(chosedfile);
    }
})
