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

async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("http://localhost:3000/submit-form", {
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
