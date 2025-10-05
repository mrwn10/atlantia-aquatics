// Review Page Specific JavaScript

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

// Content Filtering Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const contentItems = document.querySelectorAll('.content-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    contentItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-type') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Track current page state
let currentSection = 'reviews-hero';

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
    
    // If it's the Reviews page link and we're already on Reviews page
    if (href.includes('review.html') && window.location.pathname.includes('review.html')) {
      e.preventDefault();
      
      // Scroll to top with smooth animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Update active state in navigation
      updateActiveNavState('review.html');
      
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
        (activePage === 'review.html' && link.getAttribute('href').includes('review.html'))) {
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

// Add loading animation to content items
window.addEventListener('load', () => {
  const contentItems = document.querySelectorAll('.content-item');
  
  contentItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
  });
  
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
  
  document.querySelectorAll('.content-item').forEach(el => {
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

// Content item hover effects
document.querySelectorAll('.content-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});