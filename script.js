document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing site...');
    
    // Initial loading
    initPageLoader();
    
    // Initialize navigation
    initMobileNav();
    
    // Initialize theme and animations
    initTheme();
    initCustomCursor();
    initScrollAnimations();
    initSmoothScroll();
    initLazyLoading();
    
    // Initialize typing effect
    initTypeWriter();
    
    // Load data content
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            loadSkills(data.skillCategories);
            loadProjects(data.projects);
            loadBlogs(data.blogs);
            loadExperience(data.experience);
            loadEducation(data.education);
            loadAchievements(data.achievements);
            loadTestimonials(data.testimonials);
            console.log('All data loaded successfully');
        })
        .catch(error => {
            console.error('Error loading data:', error);
            announceToScreenReader('Failed to load some content. Please try refreshing the page.');
        });
});

function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    const progressBar = document.querySelector('.progress-bar');
    if (!loader || !progressBar) return;
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 50);
    window.addEventListener('load', () => {
        progressBar.style.width = '100%';
        clearInterval(interval);
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });
}

function loadSkills(categories) {
    const skillsContainer = document.getElementById('skills-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('skills-category');
        categoryDiv.innerHTML = `
            <h3>${category.title}</h3>
            <ul>
                ${category.skills.map(skill => `
                    <li><i class="${skill.icon}"></i>${skill.name}</li>
                `).join('')}
            </ul>
        `;
        skillsContainer.appendChild(categoryDiv);
    });
}

function loadProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsList.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${project.image}" alt="${project.name}">
                <h3 class="project-name">${project.name}</h3>
            </div>
            <div class="card-back">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            </div>
        </div>
    `;
    return card;
}

function loadBlogs(blogs) {
    const blogsList = document.getElementById('blogs-list');
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogsList.appendChild(blogCard);
    });
}

function createBlogCard(blog) {
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.innerHTML = `
        <a href="${blog.link}" target="_blank">
            <img src="${blog.image}" alt="${blog.title}" class="blog-image">
            <div class="blog-card-content">
                <h3>${blog.title}</h3>
                <p>${blog.description}</p>
            </div>
        </a>
    `;
    return card;
}

function loadExperience(experiences) {
    const experienceList = document.getElementById('experience-list');
    experiences.forEach(exp => {
        const expCard = createExperienceCard(exp);
        experienceList.appendChild(expCard);
    });
}

function createExperienceCard(exp) {
    const div = document.createElement('div');
    div.classList.add('company');
    const descriptionList = exp.description.map(item => `<li>${item}</li>`).join('');
    div.innerHTML = `
        <img src="${exp.image}" alt="${exp.company}">
        <div>
            <p class="role">${exp.role}</p>
            <p><strong>${exp.company}</strong> (${exp.duration})</p>
            <ul>${descriptionList}</ul>
        </div>
    `;
    return div;
}

function loadEducation(education) {
    const educationList = document.getElementById('education-list');
    education.forEach(edu => {
        const eduCard = createEducationCard(edu);
        educationList.appendChild(eduCard);
    });
}

function createEducationCard(edu) {
    const div = document.createElement('div');
    div.classList.add('institution');
    const descriptionList = edu.description.map(item => `<li>${item}</li>`).join('');
    div.innerHTML = `
        <img src="${edu.image}" alt="${edu.institution}">
        <div>
            <p class="degree">${edu.degree}</p>
            <p><strong>${edu.institution}</strong> (${edu.year})</p>
            <ul>${descriptionList}</ul>
        </div>
    `;
    return div;
}

function loadAchievements(achievements) {
    const achievementsList = document.getElementById('achievements-list');
    achievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsList.appendChild(achievementCard);
    });
}

function createAchievementCard(achievement) {
    const div = document.createElement('div');
    div.classList.add('achievement');
    div.innerHTML = `
        <h3>${achievement.title}</h3>
        <p>${achievement.description}</p>
    `;
    return div;
}

function loadTestimonials(testimonials) {
    const testimonialsSlider = document.getElementById('testimonials-slider');
    const indicators = document.getElementById('testimonial-indicators');
    if (!testimonialsSlider || !indicators || !testimonials.length) return;
    testimonialsSlider.innerHTML = '';
    indicators.innerHTML = '';
    testimonials.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.classList.add('testimonial-slide');
        if (index === 0) slide.classList.add('active');
        slide.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <div class="quote-icon"><i class="ri-double-quotes-l"></i></div>
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="quote-icon right"><i class="ri-double-quotes-r"></i></div>
                </div>
                <div class="testimonial-author">
                    <img 
                        src="${testimonial.image}" 
                        alt="${testimonial.name}" 
                        class="testimonial-avatar"
                        loading="lazy"
                    >
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}, ${testimonial.company}</p>
                    </div>
                </div>
            </div>
        `;
        testimonialsSlider.appendChild(slide);
        const dot = document.createElement('button');
        dot.classList.add('indicator-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `View testimonial ${index + 1}`);
        dot.dataset.index = index;
        indicators.appendChild(dot);
    });
    setupTestimonialControls(testimonials.length);
}

function setupTestimonialControls(slideCount) {
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.indicator-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        currentSlide = index;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 8000);
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    cursor.style.opacity = '0';
    document.addEventListener('mousemove', (e) => {
        cursor.style.setProperty('--cursor-x', `${e.clientX}px`);
        cursor.style.setProperty('--cursor-y', `${e.clientY}px`);
        cursor.style.opacity = '1';
    });
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .project-card, .blog-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.section, .hero, .hero-text, .about-content, .skills-category, .project-card, .blog-card, .company, .institution, .achievement, .testimonial-slide');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
            }
        });
    }, observerOptions);
    animateElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            const header = document.querySelector('.navbar');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (navToggle && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                        lazyImage.removeAttribute('data-src');
                        imageObserver.unobserve(lazyImage);
                    }
                });
            });
            lazyImages.forEach(image => {
                if (!image.src && image.dataset.src) {
                    image.dataset.src = image.src;
                    image.removeAttribute('src');
                }
                imageObserver.observe(image);
            });
        } else {
            lazyImages.forEach(image => {
                image.src = image.dataset.src || image.src;
                image.removeAttribute('data-src');
            });
        }
    }
}

function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const setTheme = (theme) => {
        document.body.classList.add('theme-transition');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="ri-moon-line" aria-hidden="true"></i>';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="ri-sun-line" aria-hidden="true"></i>';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
            localStorage.setItem('theme', 'light');
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    };
    
    // Check for saved theme preference or use OS preference
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme
    setTheme(currentTheme);
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
    
    // Update theme if OS preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Typing Effect
function initTypeWriter() {
    const text = "Machine Learning Engineer";
    const typedTextElement = document.querySelector('.typed-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-item');
    let lastScrollTop = 0;
    let isOpen = false;
    
    if (!navToggle || !navLinks || !navbar) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle mobile menu
    function toggleMenu(shouldOpen) {
        isOpen = shouldOpen;
        navLinks.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        
        // Add staggered animation to menu items
        const menuItems = navLinks.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (shouldOpen) {
                item.style.transitionDelay = `${index * 0.1}s`;
            } else {
                item.style.transitionDelay = '0s';
            }
        });
        
        if (isOpen) {
            trapFocus(navLinks);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Handle scroll behavior
    function handleScroll() {
        if (isOpen) return; // Don't handle scroll when menu is open
        
        const currentScrollTop = window.scrollY;
        
        // Add scrolled class when not at top
        navbar.classList.toggle('scrolled', currentScrollTop > 0);
        
        // Hide/show navbar based on scroll direction
        if (currentScrollTop > navbar.offsetHeight) {
            if (currentScrollTop > lastScrollTop) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = currentScrollTop;
        
        // Update active section
        updateActiveSection();
    }

    // Update active section based on scroll position
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                navItems.forEach(item => item.classList.remove('active'));
                const activeItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }
        });
    }

    // Event Listeners
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(!isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Handle navigation clicks
    navLinks.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                toggleMenu(false);
                
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        }
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            toggleMenu(false);
        }
    });

    // Handle scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isOpen) {
            toggleMenu(false);
        }
    });

    // Initialize active section
    updateActiveSection();
}

// Focus trap helper
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const previousFocus = document.activeElement;

    // Focus first element
    requestAnimationFrame(() => firstFocusable.focus());

    function handleFocusTrap(e) {
        const isTabPressed = e.key === 'Tab';
        
        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    element.addEventListener('keydown', handleFocusTrap);

    return () => {
        element.removeEventListener('keydown', handleFocusTrap);
        previousFocus?.focus();
    };
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes navigation menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                navToggle.click();
            }
        }
    }
});

// Scroll to Top Button
const scrollTopButton = document.querySelector('.scroll-top');
if (scrollTopButton) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        const shouldShow = window.scrollY > 500;
        scrollTopButton.classList.toggle('show', shouldShow);
        scrollTopButton.setAttribute('aria-hidden', !shouldShow);
    });

    // Handle scroll to top click
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        announceToScreenReader('Scrolled to top of page');
    });
}

// Smooth scroll with announcements
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            announceToScreenReader(`Navigated to ${targetId} section`);
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });
});
