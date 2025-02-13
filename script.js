// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    
    const typingTitle = document.getElementById('typing-title');
    const text = "Hi, I'm Anurag Kumar";

    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingTitle.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            setTimeout(() => {
                typingTitle.innerHTML = ""; // Clear text for looping
                index = 0; // Reset index
                type(); // Restart typing
            }, 1000); // Delay before restarting
        }
    }
 
    // Start the typing effect
    type();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.section-title').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: -100,
            duration: 0.8
        });
    });

    // Project hover card animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {scale: 1.05, duration: 0.3, ease: "power1.inOut"});
            gsap.to(card.querySelector('p'), {opacity: 1, y: 0, duration: 0.3});
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {scale: 1, duration: 0.3, ease: "power1.inOut"});
            gsap.to(card.querySelector('p'), {opacity: 0, y: -20, duration: 0.3});
        });
    });

    // Preloader fade out
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {opacity: 0, duration: 1, onComplete: () => preloader.style.display = 'none'});
    });

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src; // Set the actual image source
                observer.unobserve(image);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Lazy load videos
    const lazyVideos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play(); 
            } else {
                entry.target.pause(); 
            }
        });
    });

    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });

    // Form animations on focus
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('focus', () => {
            gsap.to(field, { scale: 1.03, duration: 0.3 });
        });
        field.addEventListener('blur', () => {
            gsap.to(field, { scale: 1, duration: 0.3 });
        });
    });

    // Contact form validation
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            // Basic email format validation (for demo purposes)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email.');
                return;
            }

            alert('Your message has been sent!');
            // Reset form after successful submission
            document.getElementById('contactForm').reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Project Cards Animation Fix
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Initial state
        gsap.set(card, {
            opacity: 0,
            y: 50,
            rotateX: 20,
            transformOrigin: "center center"
        });

        // Animate in on scroll
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "power3.out",
            delay: index * 0.2
        });

        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#1a1a1a",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#0A0A0A",
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });

   
    // Skill Cards Glow Effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(card, {
                '--x': `${x}px`,
                '--y': `${y}px`,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                '--x': '50%',
                '--y': '50%',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Run matrix effect
    setInterval(drawMatrix, 50);
});


document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Matrix Rain Effect for Hero Section
    const canvas = document.createElement('canvas');
    const heroSection = document.querySelector('.hero');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 20);
    const drops = new Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);


    // Glitch Effect on Section Titles
    const glitchText = (element) => {
        const originalText = element.textContent;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iterations = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");
            if(iterations >= originalText.length) {
                clearInterval(interval);
            }
            iterations += 1/3;
        }, 30);
    };

    document.querySelectorAll('.section-title').forEach(title => {
        ScrollTrigger.create({
            trigger: title,
            start: "top 80%",
            onEnter: () => glitchText(title)
        });
    });
});



var main = document.querySelector('#main')
var cursor= document.querySelector('#cursor')
main.addEventListener('mousemove',function(dets){

    gsap.to(cursor,{
        x:dets.x-50,
        y:dets.y-50,
        duration:0.5,
    })
})