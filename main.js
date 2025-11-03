// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scroll for Navigation Links
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
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card-hover, .category-card, .product-card, .service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Request Quote Function (for Supplies page)
function requestQuote(productName) {
    alert(`Quote request for "${productName}" submitted!\n\nWe'll contact you within 24 hours with pricing and availability.\n\nReference: QTE-${Date.now()}`);
}

// Show Products Function (for Supplies page)
function showProducts(category) {
    const categoryNames = {
        'office': 'Office Supplies',
        'industrial': 'Industrial Equipment',
        'medical': 'Medical & Janitorial Supplies'
    };
    
    alert(`Showing ${categoryNames[category]} products.\n\nIn a full implementation, this would filter the product catalog and display relevant items.`);
}

// Open Quote Modal Function
function openQuoteModal(serviceType) {
    const modal = document.getElementById('quoteModal');
    const modalServiceType = document.getElementById('modalServiceType');
    
    if (modal && modalServiceType) {
        modal.classList.remove('hidden');
        modalServiceType.textContent = `Get a customized quote for ${serviceType}`;
    }
}

// Close Quote Modal Function
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Contact Form Submission (for Contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone')?.value || 'Not provided';
        const company = document.getElementById('company')?.value || 'Not provided';
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Generate reference number
        const referenceNumber = `MSG-${Date.now()}`;
        
        // Show success message
        alert(`Thank you, ${name}!\n\nYour message has been received.\n\nWe'll get back to you at ${email} within 24 hours regarding your interest in ${service}.\n\nReference Number: ${referenceNumber}`);
        
        // In a real implementation, you would send this data to your server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, phone, company, service, message })
        // }).then(response => response.json())
        //   .then(data => console.log(data));
        
        // Reset form
        this.reset();
    });
}

// Quote Form Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        alert('Thank you for your quote request!\n\nWe will contact you within 24 hours with a detailed proposal.\n\nReference: QTE-' + Date.now());
        
        // Reset form and close modal
        this.reset();
        closeQuoteModal();
    });
}

// Close modal when clicking outside
const quoteModal = document.getElementById('quoteModal');
if (quoteModal) {
    quoteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeQuoteModal();
        }
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// Add to Cart Functionality (if needed for e-commerce)
function addToCart(productId, productName) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            quantity: 1
        });
    }
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    alert(`${productName} added to cart!`);
    
    // Update cart count if element exists
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Initialize cart count on page load
updateCartCount();

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// Loading State Helper
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.textContent = button.dataset.originalText;
    }
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export functions for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        requestQuote,
        showProducts,
        openQuoteModal,
        closeQuoteModal,
        addToCart,
        updateCartCount,
        validateEmail,
        validatePhone,
        setLoadingState,
        showToast
    };
}