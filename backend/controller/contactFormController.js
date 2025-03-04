const { contactForm } = require('../model/contactForm'); // Dynamically load the contactForm model from models/index.js

// Create new contactForms (supports array of JSON objects)
const createcontactForms = async (req, res) => {
    try {
        const contactForms = await contactForm.bulkCreate(req.body); // bulkCreate allows array of JSON data
        res.status(201).json(contactForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all contactForms
const getcontactForms = async (req, res) => {
    try {
        const contactForms = await contactForm.findAll();
        res.status(200).json(contactForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get specific contactForm by ID
const getcontactFormById = async (req, res) => {
    try {
        const contactForm = await contactForm.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'contactForm not found' });
        }
        res.status(200).json(contactForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a contactForm by ID
const updatecontactForm = async (req, res) => {
    try {
        const contactForm = await contactForm.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'contactForm not found' });
        }
        await contactForm.update(req.body);
        res.status(200).json({ message: 'contactForm updated successfully', contactForm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a contactForm by ID
const deletecontactForm = async (req, res) => {
    try {
        const contactForm = await contactForm.findByPk(req.params.id);
        if (!contactForm) {
            return res.status(404).json({ message: 'contactForm not found' });
        }
        await contactForm.destroy();
        res.status(204).json({ message: 'contactForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all contactForm names for dropdown
const getcontactFormNames = async (req, res) => {
    try {
        const contactForms = await contactForm.findAll({attributes: ['contactFormName'],});
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
