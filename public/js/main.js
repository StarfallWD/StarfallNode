// Main JavaScript file for the website template

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('Website template loaded successfully');

  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to current navigation item
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Simple form validation (if forms exist)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
});

// Utility functions
function showMessage(message, type = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// API helper function
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('txtname').value.trim(),
        company: document.getElementById('txtcompany').value.trim(),
        email: document.getElementById('txtemail').value.trim(),
        phone: document.getElementById('txtphone').value.trim(),
        message: document.getElementById('txtMessage').value.trim()
      };

      // Reset error messages
      clearErrors();

      // Validate form
      if (!validateForm(formData)) {
        return;
      }

      // Submit form
      submitForm(formData);
    });
  }

  // Form validation
  function validateForm(data) {
    let isValid = true;

    // Name validation
    if (!data.name || data.name.toLowerCase().includes('name')) {
      showError('nameError', 'This field is required.');
      isValid = false;
    }

    // Email validation
    if (!data.email) {
      showError('emailError', 'This field is required.');
      isValid = false;
    } else if (!isValidEmail(data.email)) {
      showError('emailFormatError', 'Email is not in correct format.');
      isValid = false;
    }

    // Message validation
    if (!data.message) {
      showError('messageError', 'This field is required.');
      isValid = false;
    }

    return isValid;
  }

  // Email format validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show error message
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  // Clear all error messages
  function clearErrors() {
    const errorElements = document.querySelectorAll('.validate');
    errorElements.forEach(element => {
      element.style.display = 'none';
    });
  }

  // Submit form via AJAX
  function submitForm(formData) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast('Message Sent Successfully!', 'Thank you for your message. We got it and will contact you within 2 business days.', 'success');
          contactForm.reset();
        } else {
          showToast('Error', 'Oops! Something went wrong. Our technical staff have been automatically notified and will be looking into this with the utmost urgency.', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('Error', 'Oops! Something went wrong. Our technical staff have been automatically notified and will be looking into this with the utmost urgency.', 'error');
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  }

  // Toast notification system
  function showToast(title, message, type = 'info', duration = 5000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    toast.innerHTML = `
      <div class="toast-header">
        <h4 class="toast-title">${title}</h4>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
      <p class="toast-message">${message}</p>
      <div class="toast-progress"></div>
    `;

    // Add toast to container
    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(toast);
      }, duration);
    }

    // Progress bar animation
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.transform = 'scaleX(0)';
      }, 100);
    }
  }

  // Dismiss toast
  function dismissToast(toast) {
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }
});

// Copyright year
document.addEventListener('DOMContentLoaded', function () {
  const copyrightYear = document.querySelector('.copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
