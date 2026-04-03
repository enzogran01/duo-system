// === PARTICLES.JS CONFIG ===
const bgParticlesConfig = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#020202"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#020202"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: false,
        speed: 80,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#020202",
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: false
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};
particlesJS('mainBg', bgParticlesConfig, () => console.log("rodou"));

// === ANIMATE ON SCROLL LIB INIT ===
AOS.init();

// === FUNCTIONS ===
class Validate {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.validadeInput();
  }

  validadeInput() {
    let errors = document.querySelectorAll('.error-msg');
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
    error.classList.add('text-red-300', 'text-left', 'text-sm', 'w-full', 'error-msg');
    return error;
  }

  static appendErrorMsg(errorMsg, element) {
    const error = Error.formatElement(errorMsg);
    element.insertAdjacentElement("afterend", error);
  }
}

// === HTML ELEMENTS ===

const email = document.getElementById("email");
const password = document.getElementById("password");

// === EVENTLISTENERS ===

email.addEventListener("input", () => new Validate(email, "email"));
password.addEventListener("input", () => new Validate(password, "password"));
