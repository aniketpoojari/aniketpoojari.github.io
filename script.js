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

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
} else {
    const theme = prefersDarkScheme.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
}

// Scroll to Top
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const links = document.querySelectorAll('a, button');

if (window.innerWidth >= 1024) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('link-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('link-hover');
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

// Active Navigation Highlight
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
    navToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
  }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
  }
});
