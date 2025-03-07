// Data Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    initMobileNav();
    
    // Fetch and load data from JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadSkills(data.skillCategories);
            loadProjects(data.projects);
            loadBlogs(data.blogs);
            loadExperience(data.experience);
            loadEducation(data.education);
            loadAchievements(data.achievements);
        })
        .catch(error => console.error('Error loading data:', error));

    // Initialize page functions
    initTypeWriter();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();

    // Initialize theme from localStorage or system preference
    initTheme();
});

// Skills Rendering Function
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

// Projects Rendering Function
function loadProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsList.appendChild(projectCard);
    });
}

// Create Individual Project Card
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

// Blogs Rendering Function
function loadBlogs(blogs) {
    const blogsList = document.getElementById('blogs-list');
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogsList.appendChild(blogCard);
    });
}

// Create Individual Blog Card
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

// Experience Rendering Function
function loadExperience(experiences) {
    const experienceList = document.getElementById('experience-list');
    experiences.forEach(exp => {
        const expCard = createExperienceCard(exp);
        experienceList.appendChild(expCard);
    });
}

// Create Individual Experience Card
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

// Education Rendering Function
function loadEducation(education) {
    const educationList = document.getElementById('education-list');
    education.forEach(edu => {
        const eduCard = createEducationCard(edu);
        educationList.appendChild(eduCard);
    });
}

// Create Individual Education Card
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

// Achievements Rendering Function
function loadAchievements(achievements) {
    const achievementsList = document.getElementById('achievements-list');
    achievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsList.appendChild(achievementCard);
    });
}

// Create Individual Achievement Card
function createAchievementCard(achievement) {
    const div = document.createElement('div');
    div.classList.add('achievement');
    div.innerHTML = `
        <h3>${achievement.title}</h3>
        <p>${achievement.description}</p>
    `;
    return div;
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

// Scroll Reveal Animation
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        
        // Basic client-side validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }

        try {
            // Replace with your Formspree endpoint
            const response = await fetch('https://formspree.io/f/your-form-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                })
            });

            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to send message. Please try again.');
        }
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.progress-bar');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopButton = document.querySelector('.scroll-top');

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

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Navigation Toggle
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// Apply focus trap to navigation when active
navLinks.addEventListener('transitionend', () => {
    if (navLinks.classList.contains('active')) {
        trapFocus(navLinks);
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes navigation menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Skip to main content with Ctrl + /
    if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('main').focus();
    }
});

// Theme initialization and toggle
function initTheme() {
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
        document.body.appendChild(themeToggle);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });

    // Add click event listener to theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Announce theme change
    announceToScreenReader(`Theme switched to ${newTheme} mode`);
}

// Scroll to Top with announcement
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    announceToScreenReader('Scrolled to top of page');
});

// Show/hide scroll to top button with ARIA
window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 500;
    scrollTopButton.classList.toggle('visible', shouldShow);
    scrollTopButton.setAttribute('aria-hidden', !shouldShow);
});

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
