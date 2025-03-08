document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing site...');
    
    // Initial loading
    initPageLoader();
    
    // Initialize theme and animations
    initTheme();
    initCustomCursor();
    initScrollAnimations();
    initSmoothScroll();
    initLazyLoading();
    
    // Initialize navbar
    initNavbar();
    
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
            console.log('Data loaded successfully:', data);
            try {
                loadSkills(data.skillCategories);
                console.log('Skills loaded');
                loadProjects(data.projects);
                console.log('Projects loaded');
                loadBlogs(data.blogs);
                console.log('Blogs loaded');
                loadExperience(data.experience);
                console.log('Experience loaded');
                loadEducation(data.education);
                console.log('Education loaded');
                loadAchievements(data.achievements);
                console.log('Achievements loaded');
                loadTestimonials(data.testimonials);
                console.log('Testimonials loaded');
            } catch (error) {
                console.error('Error loading section:', error);
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
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
                        <p>${testimonial.role}${testimonial.company ? `, ${testimonial.company}` : ''}</p>
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
            // Remove active class from all slides
            slide.classList.toggle('active', i === index);
            
            // Position slides horizontally and handle z-index
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
            
            // Set z-index to ensure proper stacking
            if (i === index) {
                slide.style.zIndex = 2; // Active slide on top
            } else {
                slide.style.zIndex = 1; // Inactive slides below
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize slide positions
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        slide.style.zIndex = i === currentSlide ? 2 : 1;
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
    
    // Auto-advance slides every 8 seconds
    const autoAdvance = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 8000);
    
    // Clear interval when user interacts with controls
    const clearAutoAdvance = () => {
        clearInterval(autoAdvance);
    };
    
    if (prevBtn) prevBtn.addEventListener('click', clearAutoAdvance);
    if (nextBtn) nextBtn.addEventListener('click', clearAutoAdvance);
    dots.forEach(dot => dot.addEventListener('click', clearAutoAdvance));
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
    // Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animate-ready class
    document.querySelectorAll('.animate-ready').forEach(el => {
        observer.observe(el);
    });
    
    // Update progress bar on scroll
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

function initSmoothScroll() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            // Calculate position with offset
            const offset = 20; // Offset in pixels
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
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

// Keyboard event handling
document.addEventListener('keydown', e => {
    // Escape key actions
    if (e.key === 'Escape') {
        // Close any open modals or overlays
    }
});

function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Toggle mobile menu - improved with better event handling
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.stopPropagation(); // Prevent event bubbling
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside - improved detection
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Resize handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Scroll handling for navbar transparency and active links
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to navbar
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Remove the navbar hiding code and just keep lastScrollTop updated
        lastScrollTop = scrollTop;

        // Highlight active section in navbar
        const sections = document.querySelectorAll('section, header');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}
