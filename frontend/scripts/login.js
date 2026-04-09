// === ANIMATE ON SCROLL LIB INIT ===
window.addEventListener('load', () => {
    AOS.init({
        once: true,     // se a animação deve acontecer apenas uma vez
        mirror: false,  // se os elementos devem animar ao scrollar para cima também
    });
});

// === FUNCTIONS ===
class Validate {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.validadeInput();
  }

  validadeInput() {
    let errors = document.querySelectorAll(".error-msg");
    errors.forEach(error => {
      error.remove();
    });

    const cleanedInput = this.cleanUp(this.input.value);

    if (this.type === 'email') {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(cleanedInput)) { 
        Error.appendErrorMsg("E-mail inválido.", this.input);
        return;
      }
      return;
    }
    if (this.type === 'password') {
      if (cleanedInput.length < 8) {
        Error.appendErrorMsg("A senha deve ter no mínimo 8 caracteres.", this.input);
        return;
      }
      return;
    }
  }

  cleanUp() {
    if (this.type === 'email') return this.input.value.trim().toLowerCase();
    if (this.type === 'password') return this.input.value.trim();
    return;
  }
}

class Error {
  static formatElement (errorMsg) {
    const error = document.createElement("span");
    error.textContent = errorMsg;
    error.classList.add('text-red-600', 'text-left', 'text-sm', 'w-full', 'error-msg');
    return error;
  }

  static appendErrorMsg(errorMsg, element) {
    const error = Error.formatElement(errorMsg);
    element.insertAdjacentElement("afterend", error);
  }
}

function revealPassword(input) {
  if (input.type === "password") {
    input.type = "text";
    switchButtonSvg(revealPasswordBtn);
    return;
  }
  input.type = "password";
  switchButtonSvg(revealPasswordBtn);
  return;
}

function switchButtonSvg(btn) {
  const showSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const hideSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  if (btn.innerHTML === showSvg) return btn.innerHTML = hideSvg;
  return btn.innerHTML = showSvg;
}

// === HTML ELEMENTS ===

const email = document.getElementById("email");
const password = document.getElementById("password");
const revealPasswordBtn = document.getElementById("revealPasswordBtn");
const formLogin = document.getElementById("formLogin");

// === EVENTLISTENERS ===

email.addEventListener("input", () => new Validate(email, "email"));
password.addEventListener("input", () => new Validate(password, "password"));
revealPasswordBtn.addEventListener("click", () => { revealPassword(password) });
