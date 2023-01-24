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

/* #app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
} */

nav {
  background-color: #51ab7f;
  font-family: Quicksand, sans-serif;
  text-decoration: none;
}

nav a {
  /* font-weight: bold;
  color: white;
  text-decoration: none; */
  background-color: red;
  font-family: Quicksand;
  text-decoration: none;
  font-weight: 700;
  margin: 1rem 1.2rem;
}

nav a.router-link-exact-active {
  color: #51ab7f;
  padding: 10px;
  border-radius: 100px;
  background-color: white;
}
</style>
