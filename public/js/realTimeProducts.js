const formBlock = document.getElementById("form");
const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");
const formCode = document.getElementById("form-code");
const formPrice = document.getElementById("form-price");
const formStock = document.getElementById("form-stock");
const formCategory = document.getElementById("form-category");
const formThumbnail = document.getElementById("form-thumbnail");

const productsContainer = document.getElementById("productsContainer");

const socket = io();

// Recibo nuevo producto y se agrega al DOM
socket.on('addProduct', (product) => {
    productsContainer.innerHTML += `<div id=${product._id} class="card bg-body-secondary border border-black m-4" style="width: 18rem">
            <div class="card-body">
                <h5 class="card-title fw-bold">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text fw-semibold">Precio: $ ${product.price}</p>
                <button id='btn${product._id}' class="btnDelete btn btn-outline-danger btn-sm">Eliminar</button>
            </div>
        </div>`;
});

// Recibo Id del producto a eliminar del DOM
socket.on('deleteProductbyId', (productId) => {
    const element = document.getElementById(productId);
    if (element) element.remove();
});

formBlock.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = formTitle.value;
    const description = formDescription.value;
    const code = formCode.value;
    const price = parseFloat(formPrice.value);
    const stock = parseInt(formStock.value);
    const category = formCategory.value;
    const thumbnail = formThumbnail.value;

    const product = { title, description, code, price, stock, category, thumbnail };

    socket.emit('newProduct', product);
    formBlock.reset();
});

productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnDelete')) {
        e.preventDefault();
        const card = e.target.closest('.card');
        if (card) {
            const id = card.id;
            socket.emit('deleteProduct', id);
        }
    }
});