document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    async function renderUsers() {
        try {
            const response = await fetch('http://localhost:3000/getUsers');
            const users = await response.json();

            userList.innerHTML = '';
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.name} - ${user.email}`;

                const updateButton = createButton('Update', async () => {
                    const updatedName = prompt('Enter new name:', user.name);
                    const updatedEmail = prompt('Enter new email:', user.email);

                    try {
                        const response = await fetch(`http://localhost:3000/updateUsers/${user.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: updatedName, email: updatedEmail }),
                        });

                        const updatedUser = await response.json();
                        renderUsers();
                    } catch (error) {
                        console.error('Error updating user:', error);
                    }
                });

                const deleteButton = createButton('Delete', async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/deleteUsers/${user.id}`, {
                            method: 'DELETE',
                        });

                        const deletedUser = await response.json();
                        renderUsers();
                    } catch (error) {
                        console.error('Error deleting user:', error);
                    }
                });

                listItem.appendChild(updateButton);
                listItem.appendChild(deleteButton);
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    userForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(userForm);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/post-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const newUser = await response.json();
            renderUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    });

    renderUsers();
});

