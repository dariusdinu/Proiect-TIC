<template>
  <the-header></the-header>

  <router-view />
</template>

<script>
export default {};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  --main-light: #f1f1f1;
  --highlight: rgb(255, 255, 255);
  --shadow: rgba(200, 200, 200, 0.7);
  --main-accent: #69dfa6;
  --dark-accent: #51ab7f;
  --dark-accent-hover: #399b6c;
  --small-text: #224936;
  font-family: Quicksand, sans-serif;
}

*::-webkit-scrollbar {
  display: none;
}

html {
  scroll-behavior: smooth;
}

@media (max-width: 56.25em) {
  html {
    font-size: 50%;
  }
  .login-form {
    width: 80%;
    background-color: yellow;
  }
  .field {
    width: 70%;
  }
}
@media (max-width: 75em) {
  html {
    font-size: 56.25%;
  }
  .login-form {
    width: 50%;
    background-color: purple;
  }
  .field {
    width: 70%;
  }
}
@media (min-width: 75em) {
  html {
    font-size: 75%;
  }
  .login-form {
    width: 50rem;
    background-color: red;
  }
  .field {
    width: 70%;
  }
}

body {
  font-size: 62.5%;
  box-sizing: border-box;
  font-family: Quicksand, sans-serif;
  line-height: 1.9;
  position: relative;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: center;
}
</style>
