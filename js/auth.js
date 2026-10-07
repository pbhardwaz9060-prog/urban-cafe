// =========================
// REGISTER
// =========================

console.log("AUTH JS LOADED");

console.log("URBAN CAFE AUTH.JS LOADED");
const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("register-message");

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                message.textContent =
                    "Account created successfully! ✅";

                message.style.color = "green";

                registerForm.reset();

            } else {

                message.textContent =
                    data.message || "Registration failed.";

                message.style.color = "red";

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server.";

            message.style.color = "red";

        }

    });

}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("login-email").value.trim();

        const password =
            document.getElementById("login-password").value;

        const message =
            document.getElementById("login-message");

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                
                console.log("LOGIN RESPONSE:", data);

                // Save JWT token
                localStorage.setItem(
                    "urbanCafeToken",
                    data.token
                );

                // Save customer information
                localStorage.setItem(
                    "urbanCafeUser",
                    JSON.stringify(data.user)
                );

                message.textContent =
                    "Login successful! ✅";

                message.style.color = "green";

                // Redirect after login
                setTimeout(() => {

    if (data.user.role === "admin") {

        window.location.href = "admin/admin.html";

    } else {

        window.location.href = "index.html";

    }

}, 1000);
            } else {

                message.textContent =
                    data.message || "Login failed.";

                message.style.color = "red";

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server.";

            message.style.color = "red";

        }

    });

}