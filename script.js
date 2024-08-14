// script.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const toggleTableButton = document.getElementById('Submissions');
    const tableSection = document.getElementById('tableSection');

    // Load stored data from Local Storage
    loadTableData();

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        addTableRow(name, email, message);
        storeDataInLocalStorage(name, email, message);
        contactForm.reset();
    });

    // Toggle table visibility
    toggleTableButton.addEventListener('click', () => {
        tableSection.style.display = tableSection.style.display === 'none' ? 'block' : 'none';
        toggleTableButton.innerText = toggleTableButton.innerText ==='See Submissions'? 'Hide Submissions' : 'See Submissions';
    });

    function addTableRow(name, email, message) {
        const row = contactTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = email;
        row.insertCell(2).textContent = message;
    }

    function storeDataInLocalStorage(name, email, message) {
        const contactData = {
            name,
            email,
            message
        };

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadTableData() {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.forEach(contact => {
            addTableRow(contact.name, contact.email, contact.message);
        });
    }
});
