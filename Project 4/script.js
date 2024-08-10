document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const itemIdInput = document.getElementById('item-id');
    const nameInput = document.getElementById('item-name');
    const skuInput = document.getElementById('item-sku');
    const categoryInput = document.getElementById('item-category');
    const quantityInput = document.getElementById('item-quantity');
    const priceInput = document.getElementById('item-price');
    const inventoryTableBody = document.querySelector('#inventory-table tbody');
    const searchInput = document.getElementById('search');
    const filterLowStockButton = document.getElementById('filter-low-stock');

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        renderTable(items);
    }


    function saveItem(item) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        if (item.id) {
            const index = items.findIndex(i => i.id === item.id);
            items[index] = item;
        } else {
            item.id = Date.now().toString();
            items.push(item);
        }
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    }

    function deleteItem(id) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    }

    function renderTable(items) {
        inventoryTableBody.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.sku}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="editItem('${item.id}')">Edit</button>
                    <button onclick="deleteItem('${item.id}')">Delete</button>
                </td>
            `;
            inventoryTableBody.appendChild(row);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = {
            id: itemIdInput.value,
            name: nameInput.value,
            sku: skuInput.value,
            category: categoryInput.value,
            quantity: parseInt(quantityInput.value, 10),
            price: parseFloat(priceInput.value)
        };
        saveItem(item);
        form.reset();
        itemIdInput.value = '';
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.sku.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredItems);
    });

    filterLowStockButton.addEventListener('click', () => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const lowStockItems = items.filter(item => item.quantity < 10); 
        renderTable(lowStockItems);
    });


    window.editItem = (id) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items.find(item => item.id === id);
        if (item) {
            nameInput.value = item.name;
            skuInput.value = item.sku;
            categoryInput.value = item.category;
            quantityInput.value = item.quantity;
            priceInput.value = item.price;
            itemIdInput.value = item.id;
        }
    };


    loadItems();
});
