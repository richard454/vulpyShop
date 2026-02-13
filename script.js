// CAMBIA ESTE NÚMERO POR TU WHATSAPP (sin espacios, con código de país)
const whatsappNumber = "595981234567"; // ⚠️ EDITA ESTO CON TU NÚMERO

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const productsGrid = document.getElementById('productsGrid');
const productCards = document.querySelectorAll('.product-card');
const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
const whatsappFloat = document.getElementById('whatsappFloat');
const contactWhatsapp = document.getElementById('contactWhatsapp');
const cartCount = document.querySelector('.cart-count');

// Contador de carrito (simulado)
let cartItems = 0;

// Búsqueda de productos
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterProducts(searchTerm, getCurrentCategory());
});

// Filtro por categoría
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos los botones
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al botón clickeado
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        const searchTerm = searchInput.value.toLowerCase();
        filterProducts(searchTerm, category);
    });
});

// Función para obtener categoría actual
function getCurrentCategory() {
    const activeBtn = document.querySelector('.category-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'all';
}

// Función de filtrado
function filterProducts(searchTerm, category) {
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productCategory = card.dataset.category;
        
        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = category === 'all' || productCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Botones de WhatsApp en productos
whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.dataset.product;
        const message = `Hola! Me interesa el producto: *${productName}*. ¿Podrías darme más información sobre precio y disponibilidad?`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Simular agregar al carrito
        cartItems++;
        cartCount.textContent = cartItems;
    });
});

// Botón flotante de WhatsApp
whatsappFloat.addEventListener('click', (e) => {
    e.preventDefault();
    const message = "Hola! Tengo una consulta sobre sus productos.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Botón de contacto en sección
contactWhatsapp.addEventListener('click', (e) => {
    e.preventDefault();
    const message = "Hola! Me gustaría hacer una consulta.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas
productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});
