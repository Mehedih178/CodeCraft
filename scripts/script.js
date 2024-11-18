document.addEventListener('DOMContentLoaded', function() {
    // Initialize MDB components
    if (typeof mdb !== 'undefined') {
        // Initialize form inputs with data attribute
        document.querySelectorAll('.form-outline').forEach((formOutline) => {
            const input = new mdb.Input(formOutline);
            input.init();
            // Add event listener for input changes
            formOutline.querySelector('input, textarea').addEventListener('input', () => {
                if (formOutline.querySelector('input, textarea').value) {
                    formOutline.querySelector('.form-label').classList.add('active');
                }
            });
        });

        // Initialize navbar collapse
        document.querySelectorAll('[data-mdb-collapse-init]').forEach((collapse) => {
            new mdb.Collapse(collapse).init();
        });

        // Initialize toast
        const successToast = document.getElementById('successToast');
        if (successToast) {
            new mdb.Toast(successToast).init();
        }
    }

    // Handle contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // Get form data
            const name = document.getElementById('name').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create mailto link with default recipient
            const mailtoLink = `mailto:contact.me.codecraft@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
`From: ${name}

Message:
${message}`)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success toast
            const toast = mdb.Toast.getInstance(document.getElementById('successToast'));
            if (toast) {
                toast.show();
            }

            // Reset form
            form.reset();
            form.classList.remove('was-validated');
        });
    }

    // Remove loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}); 