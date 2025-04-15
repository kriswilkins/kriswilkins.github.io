document.addEventListener("DOMContentLoaded", function() {
    const pageTitles = {
        "index.html": "About",
        "resume.html": "Resume",
        "projects.html": "Projects",
        "contact.html": "Contact"
    };

    // Get current page's file name
    const currentPage = window.location.pathname.split("/").pop();
    
    // Set the dynamic title
    if (pageTitles[currentPage]) {
        document.title = `Kris Wilkins | ${pageTitles[currentPage]}`;
    } else {
        document.title = "Kris Wilkins"; // Fallback title
    }

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Highlights current page
        } else {
            link.classList.remove("active");
        }
    });
});

document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("nav-menu").classList.toggle("show");
});

