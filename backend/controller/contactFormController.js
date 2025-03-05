const Contact = require('../model/contactForm'); // ✅ Import Correctly

// Create new contactForms
const createcontactForms = async (req, res) => {
    try {
        console.log("Incoming Request Data:", req.body); // Debugging step ✅

        if (!req.body.name || !req.body.email || !req.body.message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contactForm = await Contact.create(req.body); // ✅ Create new record

        console.log("Inserted Data:", contactForm); // Log inserted data ✅

        res.status(201).json({
            success: true,
            data: contactForm,
        }); // Send response
    } catch (error) {
        console.error("Error creating contact form:", error); // Log error
        res.status(500).json({ error: error.message }); // Send error response
    }
};

// Get all contactForms
const getcontactForms = async (req, res) => {
    try {
        const contactForms = await Contact.findAll(); // ✅ Correctly use Contact model
        res.status(200).json(contactForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get specific contactForm by ID
const getcontactFormById = async (req, res) => {
    try {
        const contactForm = await Contact.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'Contact Form not found' });
        }
        res.status(200).json(contactForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a contactForm by ID
const updatecontactForm = async (req, res) => {
    try {
        const contactForm = await Contact.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'Contact Form not found' });
        }
        await contactForm.update(req.body);
        res.status(200).json({ message: 'Contact Form updated successfully', contactForm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a contactForm by ID
const deletecontactForm = async (req, res) => {
    try {
        const contactForm = await Contact.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'Contact Form not found' });
        }
        await contactForm.destroy();
        res.status(204).json({ message: 'Contact Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all contactForm names for dropdown
const getcontactFormNames = async (req, res) => {
    try {
        const contactForms = await Contact.findAll({ attributes: ['name'] });
        res.status(200).json(contactForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createcontactForms,
    getcontactForms,
    getcontactFormById,
    updatecontactForm,
    deletecontactForm,
    getcontactFormNames,
};
