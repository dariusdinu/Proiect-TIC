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
  --error-text: rgb(245, 81, 81);
  font-family: Quicksand, sans-serif;
}

*::-webkit-scrollbar {
  display: none;
}

html {
  scroll-behavior: smooth;
}

/* Tablet */
@media only screen and (max-width: 1000px) {
  html {
    font-size: 62.5%;
  }
  .login-form {
    width: 70%;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  }
  .plant-info-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .plant-info-container-edit {
    grid-template-columns: 1fr 1fr;
  }
  .filter-form {
    grid-template-columns: 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Mobile */
@media only screen and (max-width: 600px) {
  html {
    font-size: 50%;
  }
  .login-form {
    width: 80%;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr;
  }
  .plant-info-container {
    grid-template-columns: 1fr 1fr;
  }
  .plant-info-container-edit {
    grid-template-columns: 1fr;
  }
  .filter-form {
    grid-template-columns: 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr;
  }
  .container-main-info {
    grid-template-columns: 1fr;
  }
}

/* Desktop */
@media (min-width: 1000px) {
  html {
    font-size: 80%;
  }
  .login-form {
    width: 50rem;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  }
  .plant-info-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .plant-info-container-edit {
    grid-template-columns: 1fr 1fr;
  }
  .filter-form {
    grid-template-columns: 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  }
  .container-main-info {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

body {
  font-size: 62.5%;
  box-sizing: border-box;
  font-family: Quicksand, sans-serif;
  line-height: 1.9;
  position: relative;
  background-color: var(--main-light);
  align-items: center;
  justify-content: center;
}
</style>
