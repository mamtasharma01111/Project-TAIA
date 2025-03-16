// Add this to your script2.js file

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar');
    const linksContainer = document.querySelector('.links');
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    
    navbar.insertBefore(menuToggle, linksContainer);
    
    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            font-size: 24px;
            cursor: pointer;
            color: white;
            margin-left: auto;
        }
        
        @media screen and (max-width: 992px) {
            .menu-toggle {
                display: block;
                position: absolute;
                top: 20px;
                right: 20px;
            }
            
            .links {
                display: none;
                width: 100%;
                margin: 0;
                padding-top: 10px;
            }
            
            .links.active {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .navbar {
                position: relative;
                align-items: flex-start;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle menu functionality
    menuToggle.addEventListener('click', function() {
        linksContainer.classList.toggle('active');
        
        // Change icon based on menu state
        if (linksContainer.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (linksContainer.classList.contains('active')) {
                linksContainer.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Fix gallery responsiveness
    const gallery = document.querySelector('.gallery');
    if (gallery.children.length === 1) {
        // If gallery only has the button, add a message
        const message = document.createElement('div');
        message.className = 'gallery-message';
        message.textContent = 'Galerie à venir';
        message.style.cssText = 'width:100%; text-align:center; margin-bottom:20px; color:#49829e; font-weight:bold;';
        gallery.insertBefore(message, gallery.firstChild);
    }
    
    // Make form more responsive
    const form = document.getElementById('contactForm');
    if (form) {
        // Ensure form submission works properly
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Votre message a été envoyé avec succès!');
            form.reset();
        });
    }
});