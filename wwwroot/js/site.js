(async () => {
})();

const origFetch = window.fetch;
const uri = 'api/todoitems';
let todos = [];
const spinner = $('#spinner');

const httpClient = HttpClient(uri);

async function getItems() {
    await httpClient.list()
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

async function addItem() {
    const addNameTextbox = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    await httpClient.post(item).then(() => {
        getItems();
        addNameTextbox.value = '';
    }).catch(error => console.error('Unable to add item.', error));
}

async function deleteItem(id) {
    await httpClient.delete(id).then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

async function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    await httpClient.put(itemId, item).then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'Cadastrado' : 'Cadastrados';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.className = 'btn btn-primary';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerText = 'Deletar';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();
        tr.className = 'rows';

        let td1 = tr.insertCell(0);
        td1.className = 'col-sm';
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        td2.className = 'col-md-auto';
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}

function displaySpinner() {
    if (spinner != undefined) {
        spinner.show();
    }
}

function removeSpinner() {
    if (spinner != undefined) {
        spinner.hide();
    }
}

fetch = function () {
    this.displaySpinner();
    return origFetch.apply(this, arguments)
        .then((res) => {
            this.removeSpinner();
            return res;
        })
}

