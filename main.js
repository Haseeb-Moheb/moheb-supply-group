// ===================================
// Moheb Supply Group - Main JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between hamburger and X
            const icon = this.querySelector('svg path');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg path');
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Alert/Notification Function
    // ===================================
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert alert alert-${type} fixed top-24 right-6 max-w-md z-50 shadow-2xl`;
        alert.style.animation = 'slideDown 0.5s ease';
        
        const bgColor = type === 'success' ? 'bg-green-50 border-green-500 text-green-900' :
                       type === 'error' ? 'bg-red-50 border-red-500 text-red-900' :
                       'bg-blue-50 border-blue-500 text-blue-900';
        
        alert.className += ` ${bgColor} border-l-4 p-4 rounded-lg`;
        
        alert.innerHTML = `
            <div class="flex items-start">
                <div class="flex-1">
                    <p class="font-semibold">${message}</p>
                </div>
                <button class="ml-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.style.animation = 'slideUp 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    }
    
    // ===================================
    // Contact Form Client-Side Validation
    // ===================================
    const contactForm = document.getElementById('contactFormSubmit');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form values
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const interest = document.getElementById('interest')?.value;
            const message = document.getElementById('message')?.value.trim();
            
            // Only validate if fields exist
            if (name !== undefined && email !== undefined && interest !== undefined && message !== undefined) {
                // Validate required fields
                if (!name || !email || !interest || !message) {
                    e.preventDefault();
                    showAlert('Please fill in all required fields.', 'error');
                    return false;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    e.preventDefault();
                    showAlert('Please enter a valid email address.', 'error');
                    return false;
                }
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Sending...';
                    submitBtn.disabled = true;
                }
            }
            // If validation passes, let the form submit to PHP
            // Don't call e.preventDefault() here!
            return true;
        });
    }
    
    // ===================================
    // Check for success/error messages in URL
    // ===================================
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === '1') {
        showAlert('Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.', 'success');
    }
    
    if (urlParams.get('error') === 'missing') {
        showAlert('Please fill in all required fields.', 'error');
    }
    
    if (urlParams.get('error') === 'invalid_email') {
        showAlert('Please enter a valid email address.', 'error');
    }
    
    if (urlParams.get('error') === 'send_failed') {
        showAlert('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
    }
    
    // ===================================
    // Navbar Background on Scroll
    // ===================================
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('shadow-xl');
        } else {
            navbar.classList.remove('shadow-xl');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Lazy Loading Images (if needed)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===================================
    // Animate Elements on Scroll
    // ===================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // ===================================
    // Copy to Clipboard Function
    // ===================================
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showAlert('Copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showAlert('Copied to clipboard!', 'success');
        }
    };
    
    // ===================================
    // Print Page Function
    // ===================================
    window.printPage = function() {
        window.print();
    };
    
    // ===================================
    // Current Year in Footer
    // ===================================
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // ===================================
    // FAQ Accordion (if needed)
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    // ===================================
    // Back to Top Button
    // ===================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Initialize Tooltips (if needed)
    // ===================================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white px-3 py-2 rounded text-sm z-50';
            tooltip.textContent = tooltipText;
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '8px';
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🎉 Welcome to Moheb Supply Group! 🎉', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite developed with ❤️ for your business needs', 'color: #764ba2; font-size: 14px;');
    console.log('%cFor inquiries: info@moheb.cloud | +1 (413) 285-3176', 'color: #333; font-size: 12px;');
    
});

// ===================================
// Service Worker Registration (PWA - Optional)
// ===================================
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered'))
    //         .catch(error => console.log('SW registration failed'));
    // });
}

// ===================================
// Prevent Form Resubmission on Page Refresh
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}