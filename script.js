// Fetch data from data.json and load all sections
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    loadSkills(data.skills);
    loadProjects(data.projects);
    loadExperience(data.experience);
    loadEducation(data.education);
    loadAchievements(data.achievements); // Load achievements
  })
  .catch(error => console.error('Error loading data:', error));

// Load skills as list items
function loadSkills(skills) {
  const skillsList = document.getElementById('skills-list');
  skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });
}

// Load projects with a flip effect
function loadProjects(projects) {
  const projectsList = document.getElementById('projects-list');
  projects.forEach(project => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.name;
    cardFront.appendChild(img);

    const projectName = document.createElement('h3');
    projectName.textContent = project.name;
    projectName.classList.add('project-name');
    cardFront.appendChild(projectName);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerHTML = `
      <h3>${project.name} (${project.year})</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    `;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    projectsList.appendChild(card);
  });
}

// Load experience with description as a list
function loadExperience(experiences) {
  const experienceList = document.getElementById('experience-list');
  experiences.forEach(exp => {
    const div = document.createElement('div');
    div.classList.add('company');
    let descHTML = '';
    exp.description.forEach(item => {
      descHTML += `<li>${item}</li>`;
    });
    div.innerHTML = `
      <img src="${exp.image}" alt="${exp.company}">
      <div>
        <p class="role">${exp.role}</p>
        <p><strong>${exp.company}</strong> (${exp.duration})</p>
        <ul>${descHTML}</ul>
      </div>
    `;
    experienceList.appendChild(div);
  });
}

// Load education with description as a list
function loadEducation(education) {
  const educationList = document.getElementById('education-list');
  education.forEach(edu => {
    const div = document.createElement('div');
    div.classList.add('institution');
    let descHTML = '';
    edu.description.forEach(item => {
      descHTML += `<li>${item}</li>`;
    });
    div.innerHTML = `
      <img src="${edu.image}" alt="${edu.institution}">
      <div>
        <p class="degree">${edu.degree}</p>
        <p><strong>${edu.institution}</strong> (${edu.year})</p>
        <ul>${descHTML}</ul>
      </div>
    `;
    educationList.appendChild(div);
  });
}

// Load achievements with description
function loadAchievements(achievements) {
  const achievementsList = document.getElementById('achievements-list');
  achievements.forEach(achievement => {
    const div = document.createElement('div');
    div.classList.add('achievement');
    div.innerHTML = `
      <h3>${achievement.title}</h3>
      <p>${achievement.description}</p>
    `;
    achievementsList.appendChild(div);
  });
}
