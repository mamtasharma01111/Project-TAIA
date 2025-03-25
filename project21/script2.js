// IDENTICAL TO 1ST PAGE'S RESPONSIVE BEHAVIOR
document.addEventListener("DOMContentLoaded", function() {
    // 1. Mobile Menu Toggle
    const menuToggle = document.createElement("button");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = "menu-toggle";
    document.querySelector(".navbar").appendChild(menuToggle);
  
    function toggleMenu() {
      const links = document.querySelector(".links");
      const navButtons = document.querySelector(".nav-buttons");
      
      if (window.getComputedStyle(links).display === "none") {
        links.style.display = "flex";
        navButtons.style.display = "flex";
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        links.style.display = "none";
        navButtons.style.display = "none";
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  
    menuToggle.addEventListener("click", toggleMenu);
  
    // 2. Auto-close menu when clicking links
    document.querySelectorAll(".links a").forEach(link => {
      link.addEventListener("click", function() {
        if (window.innerWidth <= 1400) {
          document.querySelector(".links").style.display = "none";
          document.querySelector(".nav-buttons").style.display = "none";
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  
    // 3. Form handling
    document.getElementById("contactForm")?.addEventListener("submit", function(e) {
      e.preventDefault();
      // Your form submission logic
      alert("Form submitted successfully!");
      this.reset();
    });
  });