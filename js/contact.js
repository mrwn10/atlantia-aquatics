// Contact Page Specific JavaScript

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

// Track current page state
let currentSection = 'contact-hero';

// Smooth scrolling for anchor links with SPA behavior
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
      
      // Update current section
      currentSection = targetId;
    }
  });
});

// Handle navigation links for SPA behavior
document.querySelectorAll('.nav-links a, .footer-section a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // If it's an external link or same page anchor, let the default behavior handle it
    if (href.includes('http') || href.startsWith('#')) {
      return;
    }
    
    // If it's the Contact page link and we're already on Contact page
    if (href.includes('contact.html') && window.location.pathname.includes('contact.html')) {
      e.preventDefault();
      
      // Scroll to top with smooth animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Update active state in navigation
      updateActiveNavState('contact.html');
      
      return;
    }
    
    // For other internal links, you can add similar SPA behavior here
    // For now, let the browser handle the navigation
  });
});

// Update active navigation state
function updateActiveNavState(activePage) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === activePage || 
        (activePage === 'contact.html' && link.getAttribute('href').includes('contact.html'))) {
      link.classList.add('active');
    }
  });
}

// Enhanced scroll handling for SPA feel
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  
  // Sticky navbar effect
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
  
  // Update current section based on scroll position
  updateCurrentSection();
});

// Update current section based on scroll position
function updateCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100; // Offset for navbar
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = `#${sectionId}`;
    }
  });
}

// Add loading animation to contact items
window.addEventListener('load', () => {
  const contactItems = document.querySelectorAll('.contact-item');
  const locationCard = document.querySelector('.location-card');
  
  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
  });
  
  locationCard.style.animationDelay = '0.6s';
  locationCard.classList.add('fade-in');
  
  // Add back to top button to DOM
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  document.body.appendChild(backToTop);
  
  // Initialize current section
  updateCurrentSection();
});

// Handle image errors
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-shrimp"></i><span>Image not available</span>';
    placeholder.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: var(--card-bg);
      color: var(--text-gray);
      text-align: center;
      padding: 20px;
    `;
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
  
  // Home key scroll to top
  if (e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
  
  document.querySelectorAll('.contact-item, .location-card').forEach(el => {
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

// Add scroll to top on page refresh if user was scrolled down
window.addEventListener('beforeunload', () => {
  if (window.scrollY > 0) {
    // Store scroll position if you want to restore it later
    sessionStorage.setItem('restoreScroll', 'true');
  }
});

// Optional: Restore scroll position if needed
window.addEventListener('load', () => {
  if (sessionStorage.getItem('restoreScroll') === 'true') {
    sessionStorage.removeItem('restoreScroll');
    // You can choose to restore scroll position or always start from top
    // window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition') || 0));
  }
});

// Contact item hover effects
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Click to copy phone number
const phoneNumber = document.querySelector('.contact-details p');
if (phoneNumber && phoneNumber.textContent.includes('0915-260-6009')) {
  phoneNumber.style.cursor = 'pointer';
  phoneNumber.title = 'Click to copy phone number';
  
  phoneNumber.addEventListener('click', function() {
    const tempInput = document.createElement('input');
    tempInput.value = '09152606009';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show copied notification
    const originalText = this.textContent;
    this.textContent = 'Copied to clipboard!';
    this.style.color = 'var(--primary-color)';
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.color = '';
    }, 2000);
  });
}