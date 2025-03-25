document.addEventListener("DOMContentLoaded", function () {
    // ===== Mobile Menu Toggle =====
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        // Create toggle button (only once)
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement("button");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.classList.add("menu-toggle");
            navbar.insertBefore(menuToggle, navbar.children[1]);
        }

        // Initialize menu state
        function initMenu() {
            const links = document.querySelector(".links");
            const navButtons = document.querySelector(".nav-buttons");
            const menuToggle = document.querySelector(".menu-toggle");
            
            if (window.innerWidth <= 1400) {
                menuToggle.style.display = "block";
                links.style.display = "none";
                navButtons.style.display = "none";
            } else {
                menuToggle.style.display = "none";
                links.style.display = "flex";
                navButtons.style.display = "flex";
            }
        }

        // Toggle menu function
        function toggleMenu() {
            const links = document.querySelector(".links");
            const navButtons = document.querySelector(".nav-buttons");
            const menuToggle = document.querySelector(".menu-toggle");
            
            if (links.style.display === "none" || window.getComputedStyle(links).display === "none") {
                links.style.display = "flex";
                navButtons.style.display = "flex";
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                links.style.display = "none";
                navButtons.style.display = "none";
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }

        // Set up event listeners
        document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
        
        // Close menu when clicking links (for mobile)
        document.querySelectorAll(".links a").forEach(link => {
            link.addEventListener("click", function() {
                if (window.innerWidth <= 1400) {
                    toggleMenu();
                }
            });
        });

        // Handle window resize
        window.addEventListener("resize", initMenu);

        // Initial setup
        initMenu();
    }

    // ===== Form Submission =====
    document.getElementById("contactForm")?.addEventListener("submit", handleSubmit);

    // ===== Enhanced Popup Functions =====
    let isAnimating = false; // Flag to prevent rapid clicks

    function openPopup(popupId) {
        if (isAnimating) return;
        isAnimating = true;
        
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");

        if (popup && overlay) {
            // First fade out current popup if exists
            const currentActive = document.querySelector(".popup.active");
            if (currentActive) {
                currentActive.style.opacity = "0";
                setTimeout(() => {
                    currentActive.style.display = "none";
                    currentActive.classList.remove("active");
                    showNewPopup(popup, overlay);
                }, 300);
            } else {
                showNewPopup(popup, overlay);
            }
        }
    }

    function showNewPopup(popup, overlay) {
        popup.style.display = "flex";
        popup.style.opacity = "0";
        overlay.style.display = "block";
        
        // Force reflow to enable transition
        void popup.offsetWidth;
        
        popup.style.opacity = "1";
        popup.classList.add("active");
        
        // Update arrow navigation
        updateArrowNavigation(popup.id);
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");

        if (popup && overlay) {
            popup.style.opacity = "0";
            setTimeout(() => {
                popup.style.display = "none";
                popup.classList.remove("active");
                if (!document.querySelector(".popup.active")) {
                    overlay.style.display = "none";
                }
            }, 300);
        }
    }

    function navigatePopup(direction) {
        if (isAnimating) return;
        
        const currentPopup = document.querySelector(".popup.active");
        if (!currentPopup) return;

        const nextPopupId = direction === "next" 
            ? currentPopup.getAttribute("data-next") 
            : currentPopup.getAttribute("data-prev");

        if (nextPopupId) {
            openPopup(nextPopupId);
        }
    }

    function updateArrowNavigation(currentPopupId) {
        const currentPopup = document.getElementById(currentPopupId);
        if (!currentPopup) return;

        const popups = Array.from(document.querySelectorAll('.popup'));
        const currentIndex = popups.findIndex(popup => popup.id === currentPopupId);
        
        const prevPopup = currentIndex > 0 ? popups[currentIndex - 1].id : popups[popups.length - 1].id;
        const nextPopup = currentIndex < popups.length - 1 ? popups[currentIndex + 1].id : popups[0].id;

        currentPopup.setAttribute('data-prev', prevPopup);
        currentPopup.setAttribute('data-next', nextPopup);
    }

    // Initialize popup navigation
    document.querySelectorAll('.popup').forEach(popup => {
        updateArrowNavigation(popup.id);
        
        // Add transition style dynamically
        popup.style.transition = "opacity 0.3s ease";
    });

    // Close popup when clicking outside
    const overlay = document.getElementById("popupOverlay");
    if (overlay) {
        overlay.addEventListener("click", function () {
            document.querySelectorAll(".popup.active").forEach(popup => {
                closePopup(popup.id);
            });
        });
    }

    // Arrow navigation event listeners
    document.querySelector('.arrow-left')?.addEventListener('click', () => navigatePopup('prev'));
    document.querySelector('.arrow-right')?.addEventListener('click', () => navigatePopup('next'));

    // Make popup functions globally accessible
    window.openPopup = openPopup;
    window.closePopup = closePopup;
    window.navigatePopup = navigatePopup;

    // ===== Certification Container =====
    const container = document.querySelector('.certification-container');
    if (container) {
        const downArrow = container.querySelector('.down-arrow');
        const upArrow = container.querySelector('.up-arrow');
        
        if (downArrow) {
            downArrow.addEventListener('click', function() {
                container.classList.remove('collapsed');
                container.classList.add('expanded');
            });
        }
        
        if (upArrow) {
            upArrow.addEventListener('click', function() {
                container.classList.remove('expanded');
                container.classList.add('collapsed');
            });
        }
    }

    // ===== Toggle Buttons =====
    document.querySelectorAll(".toggle-button").forEach(button => {
        button.addEventListener("click", function () {
            let content = this.closest(".certification-container")?.querySelector(".subtitle-collapsed-content");
            if (content) {
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
            }
        });
    });

    // ===== Collapsed Content Toggle =====
    const yourButton = document.getElementById("your-button-id");
    if (yourButton) {
        yourButton.addEventListener("click", function () {
            document.querySelector(".collapsed-content").classList.toggle("hidden");
        });
    }
});

// Handle Form Submission
async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("http://localhost:8000/api/submit-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
            alert("Form submitted successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert("Error submitting form!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred!");
    }
}