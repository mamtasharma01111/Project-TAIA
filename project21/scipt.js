document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.createElement("button");
    menuToggle.innerHTML = "☰";
    menuToggle.classList.add("menu-toggle");

    const navbar = document.querySelector(".navbar");
    navbar.insertBefore(menuToggle, navbar.children[1]);

    menuToggle.addEventListener("click", function() {
        document.querySelector(".links").classList.toggle("show");
    });
});
