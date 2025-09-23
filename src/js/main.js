/* Your JS here. */
document.addEventListener('DOMContentLoaded', () => {
    //nav elem
    const nav = document.querySelector('.navigation');
    const links = Array.from(document.querySelectorAll('.navigation_link'));
    const sections = links
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(a => a !== null);

    const setActiveLink = (id) => {
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };


    //threshold
    let threshold = 100;

    //scroll function
    const scrollFunc = () => {
        const scrollPos = window.scrollY;
        
        // Navbar shrinking
        if (scrollPos > threshold) {
            nav.classList.add('navigation-shrink');
        } else {
            nav.classList.remove('navigation-shrink');
        }
        //hihglight nav links per section
        let currentSectionId = sections[0].id;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100) {
                currentSectionId = section.id;
            }
        });
        setActiveLink(currentSectionId);
    };

    //tie events
    window.addEventListener('scroll', scrollFunc);
    window.addEventListener('resize', scrollFunc);

    //initial call
    scrollFunc();

    //carousel
    //grab elements
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.carousel_item');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const dots = carousel.querySelectorAll('.dot');
    const track = carousel.querySelector('.carousel_track');

    let curr = 0;
    let slideW = 0;

    //helper func
    const measureSlide = () => {
        //slides need to be 100% of carousel width
        slideW = carousel.getBoundingClientRect().width;
        slides.forEach(slide => {
            slide.style.width = `${slideW}px`;
            slide.style.flex = `0 0 ${slideW}px`;
        });
        applyTransform();
    }

    const applyTransform = () => {
        const offset = -curr * slideW;
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
    }
    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === curr);
        });
    }

    const moveToSlide = (index) => {
        const count = slides.length;
        curr = (index + count) % count; //this si what helps it wrap aorund
        applyTransform();
    };

    //event listeners
    prevButton.addEventListener('click', () => {
        moveToSlide(curr - 1);
    });
    nextButton.addEventListener('click', () => {
        moveToSlide(curr + 1);
    });
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    const resize = () => measureSlide();
    window.addEventListener('resize', resize);

    //intitial
    measureSlide();
    moveToSlide(0);

    //modal functionality
    const modal = document.querySelector('.modal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.dets');

    const modalContent = {
        cat: {
            body: "<ul><li>Built Python security testing scripts to identify web vulnerabilities (XSS, SQL Injection, OS Command Injection)</li><li>Conducted ethical exploitation to validate patches and system resilience.</li><li>Reviewed CodeQL alerts and SAT reports, analyzing severity and researching issues (ex: Unicode handling in Azure B2C).</li><li>Tech: Python, Linux, Burp Suite, TryHackMe, GitHub</li></ul>"
        },
        dpi: {
            body: "<ul><li>Designed a Python/Streamlit web app to assess diabetic retinopathy risk via user questionnaires.</li><li>Improved early detection awareness with a user-friendly interface.</li><li>Tech: Python, Streamlit, GitHub</li></ul>"
        },
        spotify: {
            body: "<ul><li>Built a React web app integrating Spotify API for song recommendations and playlist creation.</li><li>Designed a responsive UI to streamline music discovery.</li><li>Tech: React, Spotify API, JS, HTML, CSS</li></ul>"
        }
    };

    // Event listeners for detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.dataset.item;
            modalBody.innerHTML = modalContent[item].body;
            modal.style.display = 'flex';
        });
    });

    // Close modal functionality
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


});
