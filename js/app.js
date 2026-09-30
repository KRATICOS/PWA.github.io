const cafes = [
    {
        nombre: "Coffee 1",
        descripcion: "Un delicioso café de sabor intenso y aroma agradable, perfecto para comenzar el día.",
        imagen: "images/cafe1.jpg",
        origen: "Colombia",
        tueste: "Medio",
        notas: "Chocolate y frutos secos",
        precio: "$4.50"
    },
    {
        nombre: "Coffee 2",
        descripcion: "Café suave y equilibrado con un delicioso aroma, ideal para disfrutar en cualquier momento.",
        imagen: "images/cafe2.jpg",
        origen: "Brasil",
        tueste: "Suave",
        notas: "Vainilla y caramelo",
        precio: "$4.00"
    },
    {
        nombre: "Coffee 3",
        descripcion: "Una taza de café con notas aromáticas y un sabor agradable para los amantes del café.",
        imagen: "images/cafe3.jpg",
        origen: "Etiopía",
        tueste: "Alto",
        notas: "Floral y cítricos",
        precio: "$5.00"
    },
    {
        nombre: "Coffee 4",
        descripcion: "Café de sabor profundo y aroma intenso, preparado para acompañar tus mejores momentos.",
        imagen: "images/cafe4.jpg",
        origen: "Sumatra",
        tueste: "Oscuro",
        notas: "Especias y madera",
        precio: "$4.80"
    },
    {
        nombre: "Coffee 5",
        descripcion: "Una opción deliciosa para quienes disfrutan de un café equilibrado y lleno de sabor.",
        imagen: "images/cafe5.jpg",
        origen: "Costa Rica",
        tueste: "Medio",
        notas: "Miel y manzana",
        precio: "$4.60"
    },
    {
        nombre: "Coffee 6",
        descripcion: "Café aromático con un sabor agradable y una textura perfecta para disfrutar tranquilamente.",
        imagen: "images/cafe6.jpg",
        origen: "Guatemala",
        tueste: "Medio-Alto",
        notas: "Cacao amargo",
        precio: "$4.30"
    },
    {
        nombre: "Coffee 7",
        descripcion: "Una mezcla especial de café con un aroma delicioso y un sabor que disfrutarás desde el primer sorbo.",
        imagen: "images/cafe7.jpg",
        origen: "Kenia",
        tueste: "Claro",
        notas: "Frutos rojos",
        precio: "$5.20"
    },
    {
        nombre: "Coffee 8",
        descripcion: "Café de sabor suave y aroma agradable, ideal para acompañar una tarde tranquila.",
        imagen: "images/cafe8.jpg",
        origen: "México",
        tueste: "Suave",
        notas: "Frutos secos y panela",
        precio: "$3.90"
    },
    {
        nombre: "Coffee 9",
        descripcion: "Una taza de café con carácter y un aroma intenso para los verdaderos amantes del café.",
        imagen: "images/cafe9.jpg",
        origen: "Honduras",
        tueste: "Medio",
        notas: "Nuez y chocolate con leche",
        precio: "$4.20"
    },
    {
        nombre: "Coffee 10",
        descripcion: "Café especial con un delicioso aroma y un sabor equilibrado para disfrutar en cualquier ocasión.",
        imagen: "images/cafe10.jpg",
        origen: "Perú",
        tueste: "Medio",
        notas: "Frutos cítricos y caramelo",
        precio: "$4.40"
    }
];

const container = document.querySelector(".container");

// Función para mostrar la lista principal de cafés
function mostrarCatalog() {
    container.innerHTML = ""; // Limpiar contenedor
    container.style.display = "grid"; // O el estilo de diseño que prefieras

    cafes.forEach((cafe, index) => {
        const card = document.createElement("div");
        card.classList.add("coffee-card");

        card.innerHTML = `
            <img src="${cafe.imagen}" alt="${cafe.nombre}">
            <h2>${cafe.nombre}</h2>
            <p>${cafe.descripcion}</p>
            <button data-index="${index}" class="btn-ver-mas">Ver más</button>
        `;

        container.appendChild(card);
    });

    // Agregar eventos a los botones "Ver más"
    document.querySelectorAll(".btn-ver-mas").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            mostrarDetalle(cafes[index]);
        });
    });
}

// Función para mostrar la vista detallada (Card expandida)
function mostrarDetalle(cafe) {
    container.innerHTML = `
        <div class="coffee-detalle-card" style="grid-column: 1 / -1; padding: 20px; text-align: center;">
            <img src="${cafe.imagen}" alt="${cafe.nombre}" style="max-width: 300px; border-radius: 8px;">
            <h2>${cafe.nombre}</h2>
            <p><strong>Descripción:</strong> ${cafe.descripcion}</p>
            <p><strong>Origen:</strong> ${cafe.origen}</p>
            <p><strong>Tipo de tueste:</strong> ${cafe.tueste}</p>
            <p><strong>Notas de cata:</strong> ${cafe.notas}</p>
            <p><strong>Precio:</strong> ${cafe.precio}</p>
            <br>
            <button id="btn-volver" style="padding: 10px 20px; cursor: pointer;">Volver al catálogo</button>
        </div>
    `;

    // Botón para regresar al catálogo principal
    document.getElementById("btn-volver").addEventListener("click", () => {
        mostrarCatalog();
    });
}

// Inicializar la aplicación mostrando el catálogo
mostrarCatalog();