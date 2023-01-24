<template>
  <div class="main">
    <form @submit.prevent="login" class="login-form">
      <h1>Login</h1>
      <div class="field email-field">
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <input
          type="email"
          id="email"
          v-model.trim="email"
          placeholder="Email address"
          class="input input-email"
        />
        <div>
          <i class="fa-solid fa-user red"></i>
          <i class="fa-solid fa-lock red"></i>
        </div>
      </div>
      <div class="field password-field">
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <input
          type="password"
          id="password"
          v-model.trim="password"
          placeholder="Password"
          class="input input-password"
        />
      </div>

      <button type="submit" class="btn-submit">Login</button>
      <span v-if="loginError" class="error">{{ loginError }}</span>
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

* {
  margin: 0;
  --main-light: #f1f1f1;
  --highlight: rgb(255, 255, 255);
  --shadow: rgba(200, 200, 200, 0.7);
  --main-accent: #69dfa6;
  --dark-accent: #51ab7f;
  --small-text: #224936;
  font-family: Quicksand, sans-serif;
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
  width: 70%;
  margin-top: 10rem;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  background-color: var(--main-light);
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 0.5s ease-in;
}

.field {
  width: 60%;
  flex-direction: column;
  display: flex;
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

.input {
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

.input::placeholder {
  color: var(--dark-accent);
  font-weight: 500;
}

.input:hover {
  background-color: var(--highlight);
}

.input:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
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
  transition: 0.1s ease-in-out;
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
  color: rgb(255, 108, 108);
}

.red {
  color: red;
}
</style>
