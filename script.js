document.addEventListener('DOMContentLoaded', () => {
    // التعامل مع فورم التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Registration successful!');
                    // هنا يمكنك إعادة توجيه المستخدم أو عرض رسالة نجاح
                } else {
                    alert(result.message || 'Registration failed.');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        });
    }

    // التعامل مع فورم تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Login successful!');
                    // هنا يمكنك إعادة توجيه المستخدم أو حفظ التوكن في حالة نجاح تسجيل الدخول
                    window.location.href = '/profile'; // مثلا إعادة توجيه المستخدم إلى صفحة البروفايل
                } else {
                    alert(result.message || 'Login failed.');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        });
    }

    // التعامل مع تسجيل الخروج
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Logout successful!');
                    window.location.href = '/login'; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
                } else {
                    alert('Logout failed.');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        });
    }
});