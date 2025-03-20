document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.createElement("button");
    menuToggle.innerHTML = "☰";
    menuToggle.classList.add("menu-toggle");

    const navbar = document.querySelector(".navbar");
    navbar.insertBefore(menuToggle, navbar.children[1]);

    menuToggle.addEventListener("click", function() {
        document.querySelector(".links").classList.toggle("show");
    });
    document.getElementById("contactForm")?.addEventListener("submit", handleSubmit);

    // Popup Functions
    function openPopup(popupId) {
        document.getElementById(popupId).style.display = "block";
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");
    
        if (popup && overlay) {
            popup.style.display = "flex";  // Show popup
            overlay.style.display = "block"; // Show overlay
        } else {
            console.error("Popup or overlay not found:", popupId);
        }
    }

    function closePopup(popupId) {
        document.getElementById(popupId).style.display = "none";
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById("popupOverlay");
    
        if (popup && overlay) {
            popup.style.display = "none";  // Hide popup
            overlay.style.display = "none"; // Hide overlay
        } else {
            console.error("Popup or overlay not found:", popupId);
        }
    }
    const overlay = document.getElementById("popupOverlay");
    if (overlay) {
        overlay.addEventListener("click", function() {
            document.querySelectorAll(".popup").forEach(popup => {
                popup.style.display = "none";
            });
            overlay.style.display = "none";
        });
    }

    // Make popup functions accessible globally
    window.openPopup = openPopup;
    window.closePopup = closePopup;
    
    console.log("Global Functions:", window.openPopup, window.closePopup);
});
function navigatePopup(direction) {
    let currentPopup = document.querySelector(".popup[style*='display: block']");
    
    if (currentPopup) {
        let nextPopupId = direction === "next" ? currentPopup.getAttribute("data-next") : currentPopup.getAttribute("data-prev");

        if (nextPopupId) {
            closePopup(currentPopup.id); 
            openPopup(nextPopupId); 
        }
    }
};
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

// Function to open the popup
function openPopup() {
    document.getElementById("popup").style.display = "flex"; // Show popup
    document.getElementById("popupOverlay").style.display = "block"; // Show overlay
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none"; // Hide popup
    document.getElementById("popupOverlay").style.display = "none"; // Hide overlay
}

// Close when clicking outside the popup
document.getElementById("popupOverlay").addEventListener("click", closePopup);

