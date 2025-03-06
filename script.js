// Data Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and load data from JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadSkills(data.skills);
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
function loadSkills(skills) {
    const skillsList = document.getElementById('skills-list');
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
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
        <a href="${project.link}" target="_blank" class="card-front">
            <img src="${project.image}" alt="${project.name}">
            <h3 class="project-name">${project.name}</h3>
        </a>
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
        <a href="${blog.link}" target="_blank" class="blog-card-content">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
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
