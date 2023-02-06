<template>
  <main>
    <p v-if="error !== null">{{ error }}</p>
    <header class="header">
      <span class="welcome-text">Welcome to your garden</span>
      <span class="btn-add-plant--container">
        <router-link to="/add-plant">
          <button class="btn-add-plant">
            <i class="fa-solid fa-plus"></i>
            Add plant
          </button>
        </router-link>
      </span>
    </header>

    <div>
      <div class="plants">
        <div v-for="plant in plants" :key="plant.id" class="plant-card">
          <router-link :to="'/plants/' + plant.id" class="router-link">
            <button class="btn-plant-details">
              {{ plant.name }}
            </button>
          </router-link>
          <div class="info-plant-card">
            <div class="info-fields">
              <span
                :to="'/plants/' + plant.id"
                class="plant-info plant-species"
              >
                <i class="fa-solid fa-seedling"></i>
                {{ plant.species }}
              </span>
              <span :to="'/plants/' + plant.id" class="plant-info plant-room">
                <i class="fa-solid fa-bed"></i>
                {{ plant.room }}
              </span>
            </div>
            <div v-if="isAdmin" class="buttons-container">
              <button @click="handleDelete(plant.id)" class="btn-delete-plant">
                <i class="fa-solid fa-trash"></i>
              </button>
              <router-link
                :to="'/plants/' + plant.id + '/reminders'"
                class="btn btn-reminders"
              >
                Reminders</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      error: null,
    };
  },
  created() {
    this.error = null;
    this.loadPlants();
  },
  computed: {
    plants() {
      return this.$store.getters.getPlants;
    },
    isAdmin() {
      return (
        this.$store.getters.isAdmin ||
        localStorage.getItem("email") === "darius@email.com"
      );
    },
  },
  methods: {
    async loadPlants() {
      await this.$store.dispatch("loadPlants");
    },
    async handleDelete(plantId) {
      this.error = null;
      try {
        await this.$store.dispatch("deletePlant", plantId);
      } catch (error) {
        this.error = error.message;
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-text {
  margin: 1rem;
  margin-left: 3rem;
  color: var(--dark-accent);
  font-size: 3.2rem;
  font-weight: 600;
  width: 50%;
  animation: show 0.3s ease-in;
}

.plants {
  display: grid;
  margin: 1.5rem;
}

.plant-card {
  list-style: none;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  padding: 1.2rem;
  background-color: var(--main-light);
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 1.5s ease-in;
}

.info-plant-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
}

.info-fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.btn-plant-details {
  border: none;
  background-color: var(--dark-accent);
  padding: 1rem;
  width: 90%;
  cursor: pointer;
  border-radius: 1.5rem;
  text-decoration: none;
  animation: show 0.5s ease-in;
  color: var(--main-light);
  font-weight: 600;
  font-size: 2rem;
  animation: show 0.5s ease-in;
  transition: all 0.3s;
}

.btn-plant-details:hover {
  background-color: var(--dark-accent-hover);
}

.btn-add-plant {
  border-radius: 1.5rem;
  font-size: 1.6rem;
  padding: 0.5rem 2rem;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 2.5rem;
  outline: none;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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

.fa-plus {
  border: 3px solid var(--dark-accent);
  border-radius: 100px;
  font-size: small;
  padding: 0.1rem 0.2rem;
}

.btn-delete-plant {
  border-radius: 1.5rem;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
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

.btn-delete-plant:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.btn-add-plant:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.router-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
}

.plant-info {
  color: var(--dark-accent);
  font-weight: 500;
  font-size: 2rem;
  align-items: left;
  animation: show 0.5s ease-in;
}

.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 2rem;
}

.btn-reminders {
  border-radius: 1.5rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  outline: none;
  cursor: pointer;
  text-align: center;
  border: none;
  width: 100%;
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

.btn-reminders:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}
</style>
