document.addEventListener('DOMContentLoaded', function() {
    // Instructor Data
    const instructorsData = {
        1: {
            name: "Mahmoud Shoukry",
            title: "Web Development Expert",
            image: "https://randomuser.me/api/portraits/men/41.jpg",
            bio: "A passionate web developer with over 8 years of experience in full-stack development. Specializes in JavaScript and modern web technologies.",
            social: {
                linkedin: "https://linkedin.com/in/mahmoudshoukry87",
                twitter: "https://twitter.com/mahmoudshoukry87",
                github: "https://github.com/mahmoudshoukry87",
                website: "https://mahmoudshoukry.com"
            }
        },
        2: {
            name: "Sarah Wilson",
            title: "UI/UX Design Specialist",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            bio: "Award-winning UI/UX designer with 6+ years of experience creating user-centered designs. Expert in Figma and Adobe Creative Suite.",
            social: {
                linkedin: "https://linkedin.com/in/sarahwilson",
                twitter: "https://twitter.com/sarahwilsonux",
                github: "https://github.com/sarahwilson",
                website: "https://sarahwilson.design"
            }
        },
        3: {
            name: "Ahmed Hassan",
            title: "Mobile Development Expert",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Experienced mobile developer specializing in iOS and Android development. Created multiple successful apps with millions of downloads.",
            social: {
                linkedin: "https://linkedin.com/in/ahmedhassan",
                twitter: "https://twitter.com/ahmedhassan",
                github: "https://github.com/ahmedhassan",
                website: "https://ahmedhassan.dev"
            }
        },
        4: {
            name: "Emily Parker",
            title: "Data Science Instructor",
            image: "https://randomuser.me/api/portraits/women/45.jpg",
            bio: "Data scientist with expertise in machine learning and statistical analysis. Previously worked at major tech companies.",
            social: {
                linkedin: "https://linkedin.com/in/emilyparker",
                twitter: "https://twitter.com/emilyparkerdata",
                github: "https://github.com/emilyparker",
                website: "https://emilyparker.io"
            }
        },
        5: {
            name: "Michael Brown",
            title: "DevOps Engineer",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            bio: "DevOps engineer with extensive experience in cloud infrastructure and automation. AWS certified professional.",
            social: {
                linkedin: "https://linkedin.com/in/michaelbrown",
                twitter: "https://twitter.com/michaelbrowndev",
                github: "https://github.com/michaelbrown",
                website: "https://michaelbrown.tech"
            }
        },
        6: {
            name: "Lisa Zhang",
            title: "AI & Machine Learning",
            image: "https://randomuser.me/api/portraits/women/29.jpg",
            bio: "AI researcher and practitioner with focus on deep learning and computer vision. PhD in Computer Science.",
            social: {
                linkedin: "https://linkedin.com/in/lisazhang",
                twitter: "https://twitter.com/lisazhangai",
                github: "https://github.com/lisazhang",
                website: "https://lisazhang.ai"
            }
        },
        7: {
            name: "James Wilson",
            title: "Cybersecurity Expert",
            image: "https://randomuser.me/api/portraits/men/55.jpg",
            bio: "Cybersecurity professional with 10+ years of experience in ethical hacking and security architecture.",
            social: {
                linkedin: "https://linkedin.com/in/jameswilson",
                twitter: "https://twitter.com/jameswilsonsec",
                github: "https://github.com/jameswilson",
                website: "https://jameswilson.security"
            }
        },
        8: {
            name: "Maria Garcia",
            title: "Frontend Development",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            bio: "Frontend developer passionate about creating beautiful and performant web applications. Expert in React and Vue.js.",
            social: {
                linkedin: "https://linkedin.com/in/mariagarcia",
                twitter: "https://twitter.com/mariagarciadev",
                github: "https://github.com/mariagarcia",
                website: "https://mariagarcia.dev"
            }
        },
        9: {
            name: "David Kim",
            title: "Backend Development",
            image: "https://randomuser.me/api/portraits/men/77.jpg",
            bio: "Backend developer specialized in scalable architectures and microservices. Expert in Node.js and Python.",
            social: {
                linkedin: "https://linkedin.com/in/davidkim",
                twitter: "https://twitter.com/davidkimdev",
                github: "https://github.com/davidkim",
                website: "https://davidkim.dev"
            }
        }
    };

    // Get DOM Elements
    const modal = document.getElementById('instructorModal');
    const instructorCards = document.querySelectorAll('.instructor-card');
    const closeModal = document.querySelector('.close-modal');

    // Function to update modal content
    function updateModalContent(instructor) {
        const modalImage = modal.querySelector('.modal-instructor-image');
        const modalName = modal.querySelector('.modal-instructor-name');
        const modalTitle = modal.querySelector('.modal-instructor-title');
        const modalBio = modal.querySelector('.modal-instructor-bio');
        const socialLinks = modal.querySelectorAll('.social-links a');

        modalImage.src = instructor.image;
        modalImage.alt = instructor.name;
        modalName.textContent = instructor.name;
        modalTitle.textContent = instructor.title;
        modalBio.textContent = instructor.bio;

        // Update social links
        const linkedin = modal.querySelector('.social-links .linkedin');
        const twitter = modal.querySelector('.social-links .twitter');
        const github = modal.querySelector('.social-links .github');
        const website = modal.querySelector('.social-links .website');

        linkedin.href = instructor.social.linkedin;
        twitter.href = instructor.social.twitter;
        github.href = instructor.social.github;
        website.href = instructor.social.website;
    }

    // Add click event to instructor cards
    instructorCards.forEach(card => {
        card.addEventListener('click', () => {
            const instructorId = card.getAttribute('data-instructor');
            const instructor = instructorsData[instructorId];
            
            if (instructor) {
                updateModalContent(instructor);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close modal events
    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Close when clicking the X button
    closeModal.addEventListener('click', closeModalHandler);

    // Close when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    // Close when pressing ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });
});