document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Floating labels
  const inputFields = document.querySelectorAll(".input-field");

  inputFields.forEach((input) => {
    // Check the initial state of the input field
    if (input.value.trim() !== "") {
      input.classList.add("has-content");
    }

    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.add("has-content");
      } else {
        input.classList.remove("has-content");
      }
    });
  });

  // Function to show error
  const showError = (errorElementId, message, inputElement) => {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";

    // Add error class to input field
    inputElement.classList.add("error");
  };

  // Function to hide error
  const hideError = (errorElementId, inputElement) => {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = "";
    errorElement.style.display = "none";

    // Remove error class from input field
    inputElement.classList.remove("error");
  };

  // Validate Name
  const validateName = () => {
    const name = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name) {
      showError("nameError", "Please enter your name", nameInput);
      return false;
    }
    if (!nameRegex.test(name)) {
      showError(
        "nameError",
        "Name can only contain letters and spaces.",
        nameInput
      );
      return false;
    }
    hideError("nameError", nameInput);
    return true;
  };

  // Validate Email
  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showError("emailError", "Please enter your email", emailInput);
      return false;
    }
    if (!emailRegex.test(email)) {
      showError(
        "emailError",
        "Please enter a valid email address.",
        emailInput
      );
      return false;
    }
    hideError("emailError", emailInput);
    return true;
  };

  // Validate Password
  const validatePassword = () => {
    const password = passwordInput.value.trim();

    if (!password) {
      showError("passwordError", "Please enter your password", passwordInput);
      return false;
    }
    if (password.length < 8) {
      showError(
        "passwordError",
        "Password must be at least 8 characters long.",
        passwordInput
      );
      return false;
    }
    hideError("passwordError", passwordInput);
    return true;
  };

  // Handle input events to hide errors dynamically
  nameInput.addEventListener("input", () => hideError("nameError", nameInput));
  emailInput.addEventListener("input", () =>
    hideError("emailError", emailInput)
  );
  passwordInput.addEventListener("input", () =>
    hideError("passwordError", passwordInput)
  );

  // Toggle the password visibility
  const togglePassword = document.getElementById("togglePassword");

  const showIcon = document.getElementById("showIcon");
  const hideIcon = document.getElementById("hideIcon");

  togglePassword.addEventListener("click", function () {
    const passwordField = document.getElementById("password");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      showIcon.style.display = "block";
      hideIcon.style.display = "none";
    } else {
      passwordField.type = "password";
      showIcon.style.display = "none";
      hideIcon.style.display = "block";
    }
  });

  const strengthMeter = document.querySelector(".strength-meter");
  const strengthLabel = document.querySelector(".strength-label");

  // Function to show the strength indicator
  const showStrengthIndicator = () => {
    strengthMeter.style.display = "block";
    strengthLabel.style.display = "flex";
  };

  // Function to hide the strength indicator
  const hideStrengthIndicator = () => {
    strengthMeter.style.display = "none";
    strengthLabel.style.display = "none";
  };

  // Function to calculate password strength
  const calculateStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++; // Check for length
    if (password.match(/[a-z]/)) strength++; // Check for lowercase letters
    if (password.match(/[A-Z]/)) strength++; // Check for uppercase letters
    if (password.match(/[0-9]/)) strength++; // Check for numbers
    if (password.match(/[@$*&]/)) strength++; // Check for special characters

    return strength;
  };

  // Function to determine strength label
  const updateStrengthIndicator = (strength) => {
    if (strength === 1) {
      return {
        percent: 15,
        label: "Weak",
        color: "#ff1212",
      };
    }

    if (strength === 2) {
      return {
        percent: 30,
        label: "Fair",
        color: "#ffaf00",
      };
    }

    if (strength === 3) {
      return {
        percent: 45,
        label: "Good",
        color: "#f8dd11",
      };
    }

    if (strength === 4) {
      return {
        percent: 60,
        label: "Strong",
        color: "#54b435",
      };
    }

    if (strength === 5) {
      return {
        percent: 75,
        label: "Very strong",
        color: "#228b22",
      };
    }
  };

  // Password input event listener
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value.trim();

    if (password.length > 0) {
      const strength = calculateStrength(password);
      const strengthInfo = updateStrengthIndicator(strength);

      // Update the meter width and color
      strengthMeter.style.width = `${strengthInfo.percent}%`;
      strengthMeter.style.backgroundColor = strengthInfo.color;

      // Update the strength label text and color
      strengthLabel.textContent = strengthInfo.label;
      strengthLabel.style.color = strengthInfo.color;

      // Show the strength indicator
      showStrengthIndicator();
    } else {
      // Hide the strength indicator
      hideStrengthIndicator();
    }
  });

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      alert(
        `Account created successfully!\nName: ${name}\nEmail: ${email}\nPassword: ${password}`
      );
      signupForm.reset();
    }
  };

  signupForm.addEventListener("submit", handleFormSubmit);
});
