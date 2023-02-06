<template>
  <div class="main">
    <form @submit.prevent="login" class="login-form">
      <h1>Login</h1>
      <div class="field email-field">
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <div class="input-content">
          <input
            type="email"
            id="email"
            v-model.trim="email"
            placeholder="Email address"
            class="input-field input-email"
          />
          <i class="fa-solid fa-user icon"></i>
        </div>
      </div>
      <div class="field password-field">
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <div class="input-content">
          <input
            type="password"
            id="password"
            v-model.trim="password"
            placeholder="Password"
            class="input-field input-password"
          />
          <i class="fa-solid fa-lock icon"></i>
        </div>
      </div>
      <!-- <p class="error-login error">loginError</p> -->
      <p v-if="loginError" class="error-login error">{{ loginError }}</p>

      <button type="submit" class="btn-submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.error.email;
    },
    passwordError() {
      return this.error.password;
    },
    loginError() {
      return this.error.login;
    },
  },
  methods: {
    async fetchData(user) {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/login`,
        user
      );
      return response?.data || {};
    },
    async login() {
      this.error = {
        email: "",
        password: "",
        login: "",
      };
      if (!this.email) {
        this.error.email = "Email is required";
        return;
      }
      if (!this.password) {
        this.error.password = "Password is required";
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.fetchData(user);
        const { idToken, email, expiresIn, localId } = response;
        if (idToken) {
          this.$store.dispatch("login", {
            email,
            expiresIn,
            idToken,
            localId,
          });
          this.$router.replace("/");
        } else {
          this.error.login = "Token is not valid";
        }
      } catch (error) {
        this.error.login = "Invalid email or password";
      }
    },
  },
};
</script>

<style scoped>
@keyframes rise {
  0% {
    box-shadow: none;
  }

  100% {
    box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  }
}

@keyframes show {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes rise-button {
  0% {
    opacity: 0;
    box-shadow: none;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    box-shadow: -5px -5px 15px var(--highlight), 5px 5px 5px var(--shadow);
  }
}

@keyframes sunk-input {
  0% {
    opacity: 0;
    box-shadow: none;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    box-shadow: inset -2px -2px 5px var(--highlight),
      inset 2px 2px 4px var(--shadow);
  }
}

@keyframes error-input {
  0% {
    opacity: 0;
    transform: translateY(-1.1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(-1.8rem);
  }
}

@keyframes error-login {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

h1 {
  color: var(--dark-accent);
  font-weight: 600;
  font-size: 2.4rem;
  margin-bottom: 5rem;
  margin-top: 1rem;
  text-align: center;
  animation: show 1s ease-in;
}

.login-form {
  margin-top: 10vh;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 0.5s ease-in;
}

.field {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;
}

.field p {
  position: absolute;
  transform: translateY(-1.8rem);
  text-align: left;
  margin-left: 1.3rem;
  font-size: 0.8rem;
  animation: error-input 0.3s ease-in;
}

.error-login {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  font-size: 0.8rem;
  animation: error-login 0.3s ease-in;
}

.input-field {
  border: none;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
  padding: 0.8rem;
  padding-left: 1.3rem;
  margin-bottom: 2rem;
  border-radius: 1.5rem;
  color: var(--dark-accent);
  background-color: var(--main-light);
  box-shadow: inset -2px -2px 5px var(--highlight),
    inset 2px 2px 4px var(--shadow);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  animation-name: sunk-input;
  animation-duration: 1.5s;
  animation-timing-function: ease-in;
}

.input-field::placeholder {
  color: var(--dark-accent);
  font-weight: 500;
}

.input-field:hover,
.input-field:focus {
  background-color: var(--highlight);
}

.input-field:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}
.input-field:-webkit-autofill,
.input-field:-webkit-autofill:hover,
.input-field:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--dark-accent);
  background-color: var(--main-light) !important;
}

.icon {
  width: 1rem;
  height: 1rem;
  color: var(--small-text);
  margin-bottom: 2rem;
  margin-left: 1rem;
}

.input-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit {
  border-radius: 1.5rem;
  font-size: 1.8rem;
  padding: 0.2rem 3.5rem;
  margin-top: 4rem;
  margin-bottom: 3rem;
  outline: none;
  cursor: pointer;
  border: none;
  font-weight: 700;
  color: var(--dark-accent);
  background-color: var(--main-light);
  border: 4px solid var(--main-light);
  box-shadow: -5px -5px 15px var(--highlight), 5px 5px 5px var(--shadow);
  transition: 0.3s ease-in-out;
  animation-name: rise-button;
  animation-duration: 1.5s;
  animation-timing-function: ease-in;
}

.btn-submit:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.error {
  color: var(--error-text);
}
</style>
