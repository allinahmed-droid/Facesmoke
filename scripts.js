// Toggle between Login and Signup forms
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

let isLogin = true;

toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
        toggleText.innerHTML = 'ليس لديك حساب؟ <a href="#">إنشاء حساب جديد</a>';
    } else {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
        toggleText.innerHTML = 'لديك حساب بالفعل؟ <a href="#">دخول</a>';
    }

    // Update toggle link listener
    document.getElementById('toggle-link').addEventListener('click', toggleLink.onclick);
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Simple Validation
    if (!email || !password) {
        showAlert('الرجاء ملء جميع الحقول', 'error');
        return;
    }

    if (!isValidEmail(email) && !isValidPhone(email)) {
        showAlert('الرجاء إدخال بريد إلكتروني أو رقم هاتف صحيح', 'error');
        return;
    }

    // Simulate Login
    showAlert('جاري تسجيل الدخول...', 'info');
    console.log('تسجيل دخول:', { email, password });

    // Clear form
    setTimeout(() => {
        loginForm.reset();
        showAlert('تم تسجيل الدخول بنجاح! 🎉', 'success');
    }, 1500);
});

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const dob = document.getElementById('signup-dob').value;
    const gender = document.getElementById('signup-gender').value;

    // Validation
    if (!firstName || !lastName || !email || !password || !dob || !gender) {
        showAlert('الرجاء ملء جميع الحقول', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }

    if (!isValidAge(dob)) {
        showAlert('يجب أن تكون في سن 13 سنة على الأقل', 'error');
        return;
    }

    // Simulate Signup
    showAlert('جاري إنشاء الحساب...', 'info');
    console.log('إنشاء حساب:', { firstName, lastName, email, password, dob, gender });

    // Clear form
    setTimeout(() => {
        signupForm.reset();
        showAlert('تم إنشاء الحساب بنجاح! 🎉', 'success');
    }, 1500);
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Age Validation
function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 13;
}

// Alert Function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 1rem;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            ${type === 'error' ? 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
            ${type === 'success' ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
            ${type === 'info' ? 'background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' : ''}
        ">
            ${message}
        </div>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add animations to body
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Console Log
console.log('%cFaceSmoke Landing Page', 'font-size: 20px; color: #1877f2; font-weight: bold;');
console.log('%cمرحباً بك في FaceSmoke! 👋', 'font-size: 14px; color: #65676b;');
