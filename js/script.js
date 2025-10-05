// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('no-scroll');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navbar = document.querySelector('.navbar');
  if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('no-scroll');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 70;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 50px';
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.padding = '15px 50px';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  }
  
  // Show back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Add loading animation to product cards
window.addEventListener('load', () => {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
  
  // Add back to top button to DOM
  const backToTop = document.createElement('a');
  backToTop.href = '#home';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
});

// Facebook like button functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('fb-like-btn')) {
    // If it's the Facebook button in the footer, it's now a link so we don't need to handle it
    // This function is kept for any other potential like buttons
  }
});

// Handle image errors
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-shrimp"></i><span>Image not available</span>';
    this.parentNode.appendChild(placeholder);
  });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close mobile menu on ESC key
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('no-scroll');
  }
});

// Add intersection observer for animations
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.product-card, .service-card, .faq-item').forEach(el => {
    observer.observe(el);
  });
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});