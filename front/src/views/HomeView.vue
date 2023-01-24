<template>
  <main>
    <h1>Welcome to your garden</h1>
    <ul>
      <li v-for="plant in plants" :key="plant.id" class="plant-card">
        <button class="plant-name">
          <router-link :to="'/plants/' + plant.id" class="router-link">
            {{ plant.name }}
          </router-link>
        </button>
        <span :to="'/plants/' + plant.id" class="plant-species"
          >{{ plant.species }}
        </span>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.loadPlants();
  },
  computed: {
    plants() {
      return this.$store.getters.getPlants;
    },
  },
  methods: {
    async loadPlants() {
      await this.$store.dispatch("loadPlants");
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
  margin: 1.5rem;
  margin-left: 5rem;
  color: var(--dark-accent);
  font-size: 2.4rem;
  animation: show 0.3s ease-in;
}

.plant-card {
  list-style: none;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 35rem;
  padding: 2rem;
  margin: 1.5rem;
  background-color: var(--main-light);
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 1.5s ease-in;
}

.plant-name {
  border: none;
  width: 15rem;
  background-color: var(--dark-accent);
  padding: 1rem;
  cursor: pointer;
  border-radius: 1.5rem;
  text-decoration: none;
  animation: show 0.5s ease-in;
}

.router-link {
  text-decoration: none;
  color: var(--main-light);
  font-weight: 600;
  font-size: 1.2rem;
  animation: show 0.5s ease-in;
}

.plant-species {
  color: var(--small-text);
  font-weight: 500;
  font-size: 1.1rem;
  margin-left: 0.6rem;
  align-items: left;
  animation: show 0.5s ease-in;
}
</style>
