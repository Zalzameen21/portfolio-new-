document.addEventListener('DOMContentLoaded', () => {
    /* ==================== INITIALIZE LUCIDE ICONS ==================== */
    lucide.createIcons();

    /* ==================== MOBILE MENU TOGGLE ==================== */
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close'),
          navLinks = document.querySelectorAll('.nav-link');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Hide menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==================== STICKY NAV HEADER ==================== */
    const header = document.getElementById('header');
    const scrollHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    };
    window.addEventListener('scroll', scrollHeader);
    scrollHeader(); // Trigger on load too

    /* ==================== ACTIVE LINK ON SCROLL ==================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                  sectionTop = current.offsetTop - 100, // offset for sticky nav
                  sectionId = current.getAttribute('id'),
                  sectionsClass = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add('active-link');
                } else {
                    sectionsClass.classList.remove('active-link');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Trigger on load too

    /* ==================== BACK TO TOP BUTTON ==================== */
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const showScrollUp = () => {
        if (window.scrollY >= 350) {
            scrollUpBtn.classList.add('show-scroll');
        } else {
            scrollUpBtn.classList.remove('show-scroll');
        }
    };
    window.addEventListener('scroll', showScrollUp);
    showScrollUp(); // Trigger on load too

    /* ==================== THEME TOGGLE (DARK/LIGHT) ==================== */
    const themeButton = document.getElementById('theme-toggle-btn');
    const darkTheme = 'dark-theme';
    const lightTheme = 'light-theme';

    // Retrieve previous choice from localStorage
    const selectedTheme = localStorage.getItem('selected-theme');

    // Determine current theme class
    const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';

    // Apply stored theme on boot
    if (selectedTheme) {
        if (selectedTheme === 'light') {
            document.body.classList.remove(darkTheme);
            document.body.classList.add(lightTheme);
        } else {
            document.body.classList.remove(lightTheme);
            document.body.classList.add(darkTheme);
        }
    }

    // Toggle theme manually
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            // Toggle body classes
            if (document.body.classList.contains(lightTheme)) {
                document.body.classList.remove(lightTheme);
                document.body.classList.add(darkTheme);
            } else {
                document.body.classList.remove(darkTheme);
                document.body.classList.add(lightTheme);
            }
            
            // Save state
            localStorage.setItem('selected-theme', getCurrentTheme());
        });
    }

    /* ==================== TYPING EFFECT IN HERO ==================== */
    const typingSpan = document.getElementById('typing-text');
    const roles = [
        "Django Web Apps",
        "Computer Vision Models",
        "Scalable Databases",
        "Python Infrastructures"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const typeAnimation = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typeSpeed = 50; // faster deletion
        } else {
            charIndex++;
            typeSpeed = 100; // normal writing
        }

        typingSpan.textContent = currentRole.substring(0, charIndex);

        // Adjust speed for pauses
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // pause at completion
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // pause before typing next
        }

        setTimeout(typeAnimation, typeSpeed);
    };

    if (typingSpan) {
        setTimeout(typeAnimation, 1000);
    }

    /* ==================== SKILL LEVEL METERS ANIMATION ==================== */
    const skillBars = document.querySelectorAll('.skill-bar-inner');
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all skill bar inners inside this container and set their width
                const bars = entry.target.querySelectorAll('.skill-bar-inner');
                bars.forEach(bar => {
                    // Extract styling width set via style attribute, set to 0 initially, then animate
                    const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[0];
                    bar.style.width = '0%'; // Reset first
                    setTimeout(() => {
                        bar.style.width = targetWidth.split(':')[1].trim();
                    }, 100);
                });
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    };

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(animateSkills, {
            threshold: 0.15
        });
        // We observe categories separately so they animate as they enter
        const categories = document.querySelectorAll('.skills-category');
        categories.forEach(cat => skillsObserver.observe(cat));
    }

    /* ==================== PROJECT FILTERING LOGIC ==================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Fade out animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85)';
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                setTimeout(() => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow to run animation
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==================== CONTACT FORM VALIDATION ==================== */
    const contactForm = document.getElementById('contact-form-element'),
          formName = document.getElementById('form-name'),
          formEmail = document.getElementById('form-email'),
          formSubject = document.getElementById('form-subject'),
          formMessage = document.getElementById('form-message');

    const successModal = document.getElementById('success-modal'),
          modalCloseBtn = document.getElementById('modal-close-btn'),
          modalConfirmBtn = document.getElementById('modal-confirm-btn');

    // Helper to toggle error states
    const validateField = (input, parentGroup) => {
        if (!input.value.trim()) {
            parentGroup.classList.add('invalid');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                parentGroup.classList.add('invalid');
                return false;
            }
        }

        parentGroup.classList.remove('invalid');
        return true;
    };

    // Remove errors on input typing
    [formName, formEmail, formSubject, formMessage].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('invalid');
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Validate all inputs
            if (!validateField(formName, formName.parentElement)) isValid = false;
            if (!validateField(formEmail, formEmail.parentElement)) isValid = false;
            if (!validateField(formSubject, formSubject.parentElement)) isValid = false;
            if (!validateField(formMessage, formMessage.parentElement)) isValid = false;

            if (isValid) {
                // Show success modal
                if (successModal) {
                    successModal.classList.add('show-modal');
                }
                
                // Reset form fields
                contactForm.reset();
            }
        });
    }

    // Modal Close operations
    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('show-modal');
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);
    
    // Close modal if clicking outside modal content box
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
});
