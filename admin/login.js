const API = "https://elite-fc-backend.onrender.com/api";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.style.color = "black";
  message.textContent = "Logging in...";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch(`${API}/admin-auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      message.style.color = "red";
      message.textContent = data.message || "Login failed";
      return;
    }

    // Save JWT token
    localStorage.setItem("eliteAdminToken", data.token);

    message.style.color = "green";
    message.textContent = "Login successful!";

    // Redirect after 1 second
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  } catch (error) {
    console.error(error);

    message.style.color = "red";
    message.textContent = "Unable to connect to server.";
  }
});
