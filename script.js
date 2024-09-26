document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const contactList = document.getElementById('contacts');
    let contacts = [];

    
    function loadContacts() {
        try {
            const storedContacts = localStorage.getItem('contacts');
            contacts = storedContacts ? JSON.parse(storedContacts) : [];
            renderContacts();
        } catch (error) {
            console.error('Erro ao carregar contatos do Local Storage:', error);
        }
    }

    
    function saveContacts() {
        try {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        } catch (error) {
            console.error('Erro ao salvar contatos no Local Storage:', error);
        }
    }

    
    function renderContacts() {
        contactList.innerHTML = ''; 
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('li');
            contactItem.className = 'bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4';

            contactItem.innerHTML = `
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">${contact.name}</h3>
                    <div class="flex space-x-2">
                        <button class="edit px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
                        <button class="delete px-3 py-1 bg-red-500 text-white rounded">Excluir</button>
                    </div>
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                    <p><strong>Telefone:</strong> ${contact.phone}</p>
                    <p><strong>E-mail:</strong> ${contact.email}</p>
                </div>
            `;

         
            contactItem.querySelector('.delete').addEventListener('click', () => {
                removeContact(index);
            });

           
            contactItem.querySelector('.edit').addEventListener('click', () => {
                editContact(index);
            });

            contactList.appendChild(contactItem);
        });
    }

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (name === '' || phone === '' || email === '') {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        const newContact = { name, phone, email };
        contacts.push(newContact);

        saveContacts();  
        renderContacts();  
        form.reset();  
    });

    
    function removeContact(index) {
        try {
            contacts.splice(index, 1);  
            saveContacts();
            renderContacts();
        } catch (error) {
            console.error('Erro ao remover contato:', error);
        }
    }

    
    function editContact(index) {
        try {
            const contact = contacts[index];
            const newName = prompt("Editar nome:", contact.name);
            const newPhone = prompt("Editar número de telefone:", contact.phone);
            const newEmail = prompt("Editar email:", contact.email);

            if (newName && newPhone && newEmail) {
                contacts[index] = { name: newName, phone: newPhone, email: newEmail };
                saveContacts();
                renderContacts();
            } else {
                alert("Todos os campos são obrigatórios!");
            }
        } catch (error) {
            console.error('Erro ao editar contato:', error);
        }
    }

    
    
    loadContacts();
});
