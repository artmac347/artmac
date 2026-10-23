      // EmailJS Init
       

        // ============ SCROLL ANIMATION OBSERVER ============
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.hero-content, .hero-avatar, .about-image, .about-content, .services-title, .card, .portfolio-title, .project-card, .contact-title, .contact-info, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // ============ SCROLL PROGRESS BAR ============
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.pageYOffset;
            const scrollProgress = scrollHeight > 0 ? (scrolled / scrollHeight * 100) : 0;
            document.querySelector('.scroll-indicator').style.width = scrollProgress + '%';

            if (window.pageYOffset > 50) {
                document.getElementById('navbar').classList.add('nav-scrolled');
            } else {
                document.getElementById('navbar').classList.remove('nav-scrolled');
            }
        });

        // ============ TYPING ANIMATION ============
        const typingTexts = ['Web Developer', 'Web Designer', 'Digital Artist', 'Creative Developer', 'UI/UX Designer'];
        let textIndex = 0, charIndex = 0;
        const typingElement = document.getElementById('typingText');

        function type() {
            if (charIndex < typingTexts[textIndex].length) {
                typingElement.textContent += typingTexts[textIndex].charAt(charIndex++);
                setTimeout(type, 80);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typingElement.textContent = typingTexts[textIndex].substring(0, --charIndex);
                setTimeout(erase, 40);
            } else {
                textIndex = (textIndex + 1) % typingTexts.length;
                setTimeout(type, 500);
            }
        }
        // reset before starting to avoid duplicated text on reload
        typingElement.textContent = '';
        type();

        // ============ MODAL FUNCTIONS ============
        function openServiceModal(idx) {
            document.getElementById(`service-modal-${idx}`).classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeServiceModal(idx) {
            document.getElementById(`service-modal-${idx}`).classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        function showModalMode(modal, mode) {
    const gallery = modal.querySelector('.modal-gallery');
    const details = modal.querySelector('.modal-details');
    if (gallery) gallery.style.display = mode === 'details' ? 'none' : 'block';
    if (details) details.style.display = mode === 'gallery' ? 'none' : 'block';
}

     function openModal(idx, mode = 'gallery') {
    const modal = document.getElementById(`modal${idx}`);
    showModalMode(modal, mode);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function openModalAnimated(idx, mode = 'gallery') {
    const modal = document.getElementById(`modal${idx}`);
    const content = modal.querySelector('.modal-content');
    showModalMode(modal, mode);
    modal.classList.add('show');
    content.style.transform = 'scale(0.8)';
    setTimeout(() => { content.style.transform = 'scale(1)'; }, 50);
    document.body.style.overflow = 'hidden';
}

        function closeModal(idx) {
            document.getElementById(`modal${idx}`).classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
                document.body.style.overflow = 'auto';
            }
        });

        // ============ SMOOTH SCROLL ============
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // ============ FORM SUBMIT ============

        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;

                try {
                    const response = await fetch('https://artmac-backend.onrender.com/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, subject, message })
                    });

                    const result = await response.json();

                    if (result.success) {
                        alert('Naisend na bro! Matatanggap mo na sa email mo. 🎉');
                        contactForm.reset();
                    } else {
                        alert('Nagka-error sa pag-send: ' + (result.error || 'Failed'));
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Hindi makakonekta sa backend server.');
                }
            });
        }

        // ============ DOWNLOAD CV ============
        function downloadCV() {
            const link = document.createElement('a');
            link.href = 'machope.pdf';
            link.download = 'machope.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }