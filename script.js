// Elementos del DOM
const elements = {
  lengthSlider: document.querySelector(".pass-length input"),
  options: document.querySelectorAll(".option input"),
  copyIcon: document.querySelector(".input-box span"),
  passwordInput: document.querySelector(".input-box input"),
  passIndicator: document.querySelector(".pass-indicator"),
  generateBtn: document.querySelector(".generate-btn"),
};

// Caracteres disponibles para construir contraseñas
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

// Configuración de constantes
const MIN_PASSWORD_LENGTH = 8;
const MEDIUM_PASSWORD_LENGTH = 16;
const COPY_ICON_TIMEOUT = 1500;

// Configuración de opciones
const config = {
  excludeDuplicate: false,
};

// Función para generar una contraseña aleatoria
function generatePassword() {
  let staticPassword = "";
  let randomPassword = "";
  const passLength = elements.lengthSlider.value;

  elements.options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        config.excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (config.excludeDuplicate) {
      if (!randomPassword.includes(randomChar) || randomChar === " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }

  elements.passwordInput.value = randomPassword;
  updatePassIndicator();
}

// Función para actualizar el indicador de la fortaleza de la contraseña
function updatePassIndicator() {
  const sliderValue = elements.lengthSlider.value;
  elements.passIndicator.id =
    sliderValue <= MIN_PASSWORD_LENGTH
      ? "weak"
      : sliderValue <= MEDIUM_PASSWORD_LENGTH
      ? "medium"
      : "strong";
}

// Función para actualizar el valor del slider y generar una nueva contraseña
function updateSlider() {
  const sliderValue = elements.lengthSlider.value;
  document.querySelector(".pass-length span").innerText = sliderValue;
  generatePassword();
}

// Función para copiar la contraseña al portapapeles
function copyPassword() {
  navigator.clipboard.writeText(elements.passwordInput.value);
  elements.copyIcon.innerText = "check";
  elements.copyIcon.style.color = "#4285F4";
  setTimeout(() => {
    elements.copyIcon.innerText = "copy_all";
    elements.copyIcon.style.color = "#707070";
  }, COPY_ICON_TIMEOUT);
}

// Agregar event listeners
elements.generateBtn.addEventListener("click", generatePassword);
elements.lengthSlider.addEventListener("input", updateSlider);
elements.copyIcon.addEventListener("click", copyPassword);

// Inicializar la página
updateSlider();
