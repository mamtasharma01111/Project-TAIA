document.addEventListener("DOMContentLoaded", function () {
    // Create a menu toggle button for mobile navigation
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        const menuToggle = document.createElement("button");
        menuToggle.innerHTML = "☰";
        menuToggle.classList.add("menu-toggle");
        navbar.insertBefore(menuToggle, navbar.children[1]);

        menuToggle.addEventListener("click", function () {
            document.querySelector(".links").classList.toggle("show");
        });
    }

    // Attach form submission event
    document.getElementById("contactForm")?.addEventListener("submit", handleSubmit);

    // Popup Functions
    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");

        if (popup && overlay) {
            // Hide any other open popups
            document.querySelectorAll(".popup").forEach(p => p.classList.remove("active"));

            popup.style.display = "flex"; // Show popup
            popup.classList.add("active");
            overlay.style.display = "block"; // Show overlay
        } else {
            console.error("Popup or overlay not found:", popupId);
        }
    }

    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");

        if (popup && overlay) {
            popup.style.display = "none";  // Hide popup
            popup.classList.remove("active");

            // Hide overlay only if no popups are open
            if (!document.querySelector(".popup.active")) {
                overlay.style.display = "none";
            }
        } else {
            console.error("Popup or overlay not found:", popupId);
        }
    }

    function navigatePopup(direction) {
        let currentPopup = document.querySelector(".popup.active");

        if (currentPopup) {
            let nextPopupId = direction === "next" ? currentPopup.getAttribute("data-next") : currentPopup.getAttribute("data-prev");

            if (nextPopupId) {
                closePopup(currentPopup.id);
                openPopup(nextPopupId);
            }
        }
    }

    // Close popup when clicking outside
    const overlay = document.getElementById("popupOverlay");
    if (overlay) {
        overlay.addEventListener("click", function () {
            document.querySelectorAll(".popup").forEach(popup => {
                popup.style.display = "none";
                popup.classList.remove("active");
            });
            overlay.style.display = "none";
        });
    }

    // Make popup functions globally accessible
    window.openPopup = openPopup;
    window.closePopup = closePopup;
    window.navigatePopup = navigatePopup;
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

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.certification-container');
    const downArrow = document.querySelector('.down-arrow');
    const upArrow = document.querySelector('.up-arrow');
    
    downArrow.addEventListener('click', function() {
        container.classList.remove('collapsed');
        container.classList.add('expanded');
    });
    
    upArrow.addEventListener('click', function() {
        container.classList.remove('expanded');
        container.classList.add('collapsed');
    });
});