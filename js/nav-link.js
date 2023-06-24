// Get all the <a> tags within the .nav-reviews container
const navLinks = document.querySelectorAll('.nav-reviews a');

// Add click event listener to each <a> tag
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
       
        // Prevent the default behavior of the link
        event.preventDefault();

        // Remove the 'active' class from all <a> tags
        navLinks.forEach((link) => {
            link.classList.remove('active');
        });

        // Add the 'active' class to the clicked <a> tag
        event.target.classList.add('active');
        
    });    
});