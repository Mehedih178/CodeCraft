document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    console.log('Loading project:', projectId);
    console.log('Available projects:', Object.keys(projectsData));

    if (!projectId || !projectsData[projectId]) {
        console.error('Invalid project ID:', projectId);
        window.location.href = 'work.html';
        return;
    }

    const project = projectsData[projectId];

    try {
        // Update page title and header
        document.title = `${project.title} - Project Details`;
        document.getElementById('projectTitle').textContent = project.title;
        
        // Update status badge
        const statusBadge = document.getElementById('projectStatus');
        statusBadge.className = `badge bg-${project.statusColor}`;
        statusBadge.innerHTML = `<i class="fas fa-circle me-2"></i>${project.status}`;
        
        // Update metadata
        document.getElementById('projectDate').textContent = project.metadata.date;
        document.getElementById('projectCategory').textContent = project.metadata.category;
        document.getElementById('projectRole').textContent = project.metadata.role;

        // Update links
        const githubLink = document.getElementById('githubLink');
        const liveLink = document.getElementById('liveLink');
        
        if (project.links.github) {
            githubLink.href = project.links.github;
            githubLink.style.display = 'inline-block';
        } else {
            githubLink.style.display = 'none';
        }
        
        if (project.links.live) {
            liveLink.href = project.links.live;
            liveLink.style.display = 'inline-block';
        } else {
            liveLink.style.display = 'none';
        }

        // Update tech stack with icons
        const techStack = document.getElementById('techStack');
        const techIcons = {
            'HTML5': 'fab fa-html5',
            'CSS3': 'fab fa-css3-alt',
            'JavaScript': 'fab fa-js',
            'React': 'fab fa-react',
            'Node.js': 'fab fa-node-js',
            'Python': 'fab fa-python',
            'Bootstrap': 'fab fa-bootstrap',
            'Git': 'fab fa-git-alt',
            'MongoDB': 'fas fa-database',
            'Firebase': 'fas fa-fire',
            'Swift': 'fab fa-swift',
            'iOS': 'fab fa-apple',
            'Android': 'fab fa-android',
            'Flutter': 'fas fa-mobile-alt',
            'React Native': 'fab fa-react'
        };

        techStack.innerHTML = project.technologies.map(tech => `
            <span class="tech-tag">
                <i class="${techIcons[tech] || 'fas fa-code'}"></i>
                ${tech}
            </span>
        `).join('');
        
        // Update overview
        document.getElementById('projectOverview').textContent = project.overview;
        
        // Update features
        const featuresContainer = document.getElementById('featuresContainer');
        featuresContainer.innerHTML = project.features.map(feature => `
            <div class="col-md-6 col-lg-3">
                <div class="feature-card">
                    <i class="fas fa-${feature.icon} feature-icon mb-3"></i>
                    <h5 class="mb-3">${feature.title}</h5>
                    <p class="text-muted mb-0">${feature.description}</p>
                </div>
            </div>
        `).join('');

        // Initialize Glide carousel
        const carouselSlides = project.images?.length ? project.images.map(image => `
            <li class="glide__slide">
                <img src="${image.src}" 
                     alt="${image.title}"
                     onerror="this.parentElement.innerHTML='<div class=\'placeholder-slide\'><i class=\'fas fa-image\'></i></div>'"/>
                <div class="carousel-caption">
                    <h5>${image.title}</h5>
                    <p>${image.description}</p>
                </div>
            </li>
        `).join('') : `
            <li class="glide__slide">
                <div class="placeholder-slide">
                    <i class="fas fa-image"></i>
                </div>
            </li>
        `;

        document.querySelector('.glide__slides').innerHTML = carouselSlides;

        // Add bullets only if multiple images
        if (project.images?.length > 1) {
            const bullets = project.images.map((_, index) => `
                <button class="glide__bullet" data-glide-dir="=${index}"></button>
            `).join('');
            document.querySelector('.glide__bullets').innerHTML = bullets;
        }

        // Initialize Glide
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            gap: 0,
            autoplay: 5000
        }).mount();

    } catch (error) {
        console.error('Error loading project details:', error);
        document.getElementById('projectContent').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error loading project details. Please try again later.
            </div>
        `;
    }
}); 