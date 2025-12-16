const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleBtn = document.querySelector('.toggle-btn');
const barsIcon = toggleBtn.querySelector('i');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Function to check if the current view is mobile (screen width <= 992px)
const isMobileView = () => window.innerWidth <= 992;

// Function to close sidebar
const closeSidebar = () => {
    if (sidebar.classList.contains('show')) {
        // Toggle off the 'show' class
        sidebar.classList.remove('show');

        if (isMobileView()) {
            // Remove blur effect
            mainContent.classList.remove('blurred');
            // Revert icon to bars
            barsIcon.classList.remove('bi-box-arrow-left');
            barsIcon.classList.add('bi-box-arrow-right');
            // Reset button position
            toggleBtn.style.left = '20px';
        }
    }
};

// Function to toggle sidebar visibility (used by button click)
function toggleSidebar() {
    if (sidebar.classList.contains('show')) {
        // If open, close it
        closeSidebar();
    } else {
        // If closed, open it
        sidebar.classList.add('show');

        if (isMobileView()) {
            // Add blur effect
            mainContent.classList.add('blurred');
            // Change icon to 'X'
            barsIcon.classList.remove('bi-box-arrow-right');
            barsIcon.classList.add('bi-box-arrow-left');

            // Adjust button position dynamically (based on calculated CSS width)
            const sidebarWidth = sidebar.offsetWidth;
            toggleBtn.style.left = `${sidebarWidth + 20}px`;
        }
    }
}

// 1. Close sidebar when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Use setTimeout to allow smooth scroll to happen before closing
        setTimeout(closeSidebar, 300);
    });
});

// 2. Close sidebar when clicking outside (on blurred main content)
mainContent.addEventListener('click', () => {
    // Only close if sidebar is open and we are on a mobile view
    if (isMobileView() && sidebar.classList.contains('show')) {
        closeSidebar();
    }
});


// Active menu link highlighting on scroll (unchanged functionality)
window.addEventListener('scroll', () => {
    let current = '';
    // Determine the current section visible in the viewport
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            current = sec.id;
        }
    });

    // Update the active class on the navigation links
    navLinks.forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href').substring(1);

        if (href === current) {
            a.classList.add('active');
        }
        else if (window.scrollY === 0 && href === 'home') {
            a.classList.add('active');
        }
    });
});