// Enhanced Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Hover effect for clickable elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Enhanced Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Developer.', 'Cybersecurity Enthusiast.', 'Tech Enthusiast.'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}

type();

// Enhanced Particles Animation
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.opacity = Math.random();
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.opacity < 1) this.opacity += 0.01;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function setupParticles() {
    const particles = document.querySelector('.particles');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particles.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particlesList = [];
    const particleCount = 50;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add new particles
        while (particlesList.length < particleCount) {
            particlesList.push(new Particle());
        }

        // Update and draw particles
        for (let i = particlesList.length - 1; i >= 0; i--) {
            particlesList[i].update();
            particlesList[i].draw(ctx);

            // Remove particles that are off screen
            if (particlesList[i].y < -100) {
                particlesList.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

setupParticles();

// Active Section Highlight
const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight - 150;

const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

function highlightSection() {
    let scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightSection);
highlightSection(); // Initial check


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, {
    threshold: 0.1
});


// Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}