const express = require('express');
const router = express.Router();
const {
    createcontactForms,
    getcontactForms,
    getcontactFormById,
    updatecontactForm,
    deletecontactForm,
    getcontactFormNames,
} = require('../controller/contactFormController');

// CRUD Routes
router.post('/', createcontactForms); // Create contactForms, accepts array of JSON data

router.get('/', getcontactForms); // Get all contactForms

router.get('/:id', getcontactFormById); // Get a single contactForm by ID

router.put('/:id', updatecontactForm); // Update a contactForm by ID

router.delete('/:id', deletecontactForm); // Delete a contactForm by ID

// Dropdown route to get contactForm names
router.get('/contactForm-names', getcontactFormNames); // For dropdown list in frontend

module.exports = router;
