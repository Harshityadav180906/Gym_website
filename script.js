// ============================
// MOBILE NAV TOGGLE
// ============================

const menuBtn = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {

    navList.classList.toggle('active');

    const spans = menuBtn.querySelectorAll('span');

    spans[0].style.transform =
        navList.classList.contains('active')
            ? 'rotate(45deg) translate(6px, 6px)'
            : 'none';

    spans[1].style.opacity =
        navList.classList.contains('active')
            ? '0'
            : '1';

    spans[2].style.transform =
        navList.classList.contains('active')
            ? 'rotate(-45deg) translate(6px, -6px)'
            : 'none';
});


// ============================
// CLOSE MOBILE MENU
// ============================

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });

});


// ============================
// SUPABASE CONFIG
// ============================

const SUPABASE_URL = "https://zzwhrbbehhnkytzntxag.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6d2hyYmJlaGhua3l0em50eGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTk4NTIsImV4cCI6MjA5MjY3NTg1Mn0.Nwg6Jvfn-ichFni6sIq5xbRCrL7d6QA8Z3V4vJRLRic";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ============================
// EMAILJS INIT
// ============================

emailjs.init("L33Fz9cUs9RO1Fl4K");


// ============================
// FORM ELEMENTS
// ============================

const form = document.getElementById('trainingForm');

const submitBtn =
    document.getElementById('submitBtn');

const overlay =
    document.getElementById('modalOverlay');


// ============================
// FORM SUBMISSION
// ============================

form.addEventListener('submit', async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const formData = {

        name: form.Name.value,
        phone: form.Phone.value,
        email: form.Email.value,
        program: form.Program.value
    };

    try {

        // ============================
        // SAVE TO SUPABASE
        // ============================

        const { error } = await client
            .from('registration')
            .insert([formData]);

        if (error) {
            throw error;
        }

        // ============================
        // SEND EMAIL
        // ============================

        await emailjs.send(

            "service_0rmzdch",

            "template_a83ckfl",

            {
                title: "DD.WORLD Registration",

                name: formData.name,

                email: formData.email,

                message:
                    `Hello ${formData.name},

Welcome to DD.WORLD Fitness Gym 💪

Your registration has been received successfully.

Program Selected:
${formData.program}

Phone:
${formData.phone}

Thank you for joining DD.WORLD Gym.`
            }
        );

        // SUCCESS

        alert(
            "Registration Successful! Confirmation email sent."
        );

        submitBtn.disabled = false;

        submitBtn.innerText =
            "Send Application";

        form.reset();

        overlay.classList.remove('active');

        document.body.style.overflow = 'auto';

    }

    catch (error) {

        console.log(error);

        alert(
            error.message || "Something went wrong"
        );

        submitBtn.disabled = false;

        submitBtn.innerText =
            "Send Application";
    }
});


// ============================
// OPEN FORM
// ============================

const openBtns =
    document.querySelectorAll('.open-form-btn');

const closeBtn =
    document.getElementById('closeForm');

openBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        overlay.classList.add('active');

        document.body.style.overflow = 'hidden';
    });

});


// ============================
// CLOSE FORM
// ============================

const closeForm = () => {

    overlay.classList.remove('active');

    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeForm);

window.addEventListener('click', (e) => {

    if (e.target === overlay) {
        closeForm();
    }

});


// ============================
// SCROLL ANIMATION
// ============================

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('active');
            }

        });

    }, { threshold: 0.15 });

document
    .querySelectorAll(
        '.reveal, .reveal-left, .reveal-bottom'
    )
    .forEach(el => observer.observe(el));


// ============================
// NAVBAR SCROLL EFFECT
// ============================

window.addEventListener('scroll', () => {

    const nav =
        document.getElementById('navbar');

    if (window.scrollY > 80) {

        nav.style.padding = '1rem 10%';

        nav.style.background =
            'rgba(5, 5, 5, 0.98)';

        if (window.innerWidth < 768) {

            nav.style.padding = '1rem 5%';
        }

    } else {

        nav.style.padding = '1.5rem 10%';

        nav.style.background =
            'rgba(5, 5, 5, 0.8)';

        if (window.innerWidth < 768) {

            nav.style.padding = '1rem 5%';
        }
    }
});
