const activePage = window.location.pathname;
console.log(activePage)

const navLinks = document.querySelectorAll('.nav-reviews a').forEach(link => {
  if(link.href.includes(`${activePage}`)){
    link.classList.add('active');
    console.log(link);
  }
})