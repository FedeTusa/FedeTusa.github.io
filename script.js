document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Fade-in animation helper (add class via JS to keep CSS clean initially)
    const elementsToAnimate = document.querySelectorAll('.section-title, .glass-card, .hero-content > *');

    // Add base opacity style dynamically or in CSS
    // Here we assume CSS handles the transition when class 'visible' is added
    // Let's inject simple style for animation if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .section-title, .glass-card, .hero-content > * {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        /* Stagger hero items */
        .hero-content > *:nth-child(1) { transition-delay: 0.1s; }
        .hero-content > *:nth-child(2) { transition-delay: 0.2s; }
        .hero-content > *:nth-child(3) { transition-delay: 0.3s; }
        .hero-content > *:nth-child(4) { transition-delay: 0.4s; }
        .hero-content > *:nth-child(5) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(styleSheet);

    elementsToAnimate.forEach(el => observer.observe(el));
});
