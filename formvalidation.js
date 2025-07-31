// Form Validation JavaScript
class FormValidator {
    constructor() {
        this.init();
    }

    init() {
        this.createContactForm();
        this.bindEvents();
    }

    createContactForm() {
        // Find the contact section and add a contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const formHTML = `
                <div class="contact-form-container">
                    <h3>Get In Touch</h3>
                    <form id="contactForm" class="contact-form">
                        <div class="form-group">
                            <label for="name">Name *</label>
                            <input type="text" id="name" name="name" required>
                            <span class="error-message" id="nameError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                            <span class="error-message" id="emailError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject">
                            <span class="error-message" id="subjectError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                            <span class="error-message" id="messageError"></span>
                        </div>
                        
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                    <div id="formSuccess" class="success-message" style="display: none;">
                        Thank you! Your message has been sent successfully.
                    </div>
                </div>
            `;
            
            // Insert the form after the existing contact content
            contactSection.insertAdjacentHTML('beforeend', formHTML);
        }
    }

    bindEvents() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const isValid = this.validateForm(form);
        
        if (isValid) {
            this.showSuccess();
            form.reset();
        }
    }

    validateForm(form) {
        let isValid = true;
        const formData = new FormData(form);
        
        // Validate name
        const name = formData.get('name').trim();
        if (!name) {
            this.showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            this.showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = formData.get('email').trim();
        if (!email) {
            this.showError('emailError', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const message = formData.get('message').trim();
        if (!message) {
            this.showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            this.showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    this.showError('nameError', 'Name is required');
                } else if (value.length < 2) {
                    this.showError('nameError', 'Name must be at least 2 characters');
                }
                break;
                
            case 'email':
                if (!value) {
                    this.showError('emailError', 'Email is required');
                } else if (!this.isValidEmail(value)) {
                    this.showError('emailError', 'Please enter a valid email address');
                }
                break;
                
            case 'message':
                if (!value) {
                    this.showError('messageError', 'Message is required');
                } else if (value.length < 10) {
                    this.showError('messageError', 'Message must be at least 10 characters');
                }
                break;
        }
    }

    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearError(field) {
        const errorId = field.name + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    showSuccess() {
        const successElement = document.getElementById('formSuccess');
        const form = document.getElementById('contactForm');
        
        if (successElement && form) {
            form.style.display = 'none';
            successElement.style.display = 'block';
            
            // Hide success message and show form again after 3 seconds
            setTimeout(() => {
                successElement.style.display = 'none';
                form.style.display = 'block';
            }, 3000);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});

