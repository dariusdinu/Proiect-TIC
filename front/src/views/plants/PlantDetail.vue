<template>
  <div>
    <div>
      <h1 class="title">Plant Detail</h1>
      <div class="plant-form">
        <div>
          <div class="plant-name">{{ name }}</div>
          <div class="plant-field">
            <div><i class="fa-solid fa-seedling"></i></div>
            <div>{{ species }}</div>
          </div>
          <div class="plant-info-container">
            <div class="plant-field">
              <div>
                <i class="fa-solid fa-bed"></i>
              </div>
              <div>{{ room }}</div>
            </div>
            <div class="plant-field">
              <div>
                <i class="fa-solid fa-sun"></i>
              </div>
              <div>
                {{ sunExposure }}
              </div>
            </div>
            <div class="plant-field">
              <div><i class="fa-solid fa-whiskey-glass"></i></div>
              <div>{{ soilType }}</div>
            </div>
            <div class="plant-field">
              <div><i class="fa-solid fa-biohazard"></i></div>
              <div>{{ toxicityLevel }}/10</div>
            </div>
            <div class="plant-field">
              <div><i class="fa-solid fa-brush"></i></div>
              <div>{{ color }}</div>
            </div>
            <div class="plant-field">
              <div><i class="fa-solid fa-ruler"></i></div>
              <div>{{ maxHeight }} cm</div>
            </div>
          </div>
          <div>
            <button @click="handleEdit" class="btn btn-edit">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlantDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      plant: null,
    };
  },
  created() {
    this.getPlant();
  },
  computed: {
    name() {
      return this?.plant?.name || "";
    },
    species() {
      return this?.plant?.species || "";
    },
    room() {
      return this?.plant?.room || "";
    },
    sunExposure() {
      return this?.plant?.sunExposure || "";
    },
    soilType() {
      return this?.plant?.soilType || "";
    },
    toxicityLevel() {
      return this?.plant?.toxicityLevel || "";
    },
    color() {
      return this?.plant?.color || "";
    },
    maxHeight() {
      return this?.plant?.maxHeight || "";
    },
  },
  methods: {
    async getPlant() {
      const plant = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${this.id}`
      );
      this.plant = plant?.data || {};
    },
    handleEdit() {
      this.$router.push("/plants/" + this.id + "/edit");
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

.plant-form {
  border-radius: 1.5rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  width: 60%;
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 0.5s ease-in;
}
.title {
  margin: 1rem;
  margin-left: auto;
  margin-right: auto;
  color: var(--dark-accent);
  font-size: 4rem;
  font-weight: 800;
  width: 50%;
  animation: show 1s ease-in;
  text-align: center;
}
.plant-name {
  border: none;
  background-color: var(--dark-accent);
  padding: 2rem 0;
  border-radius: 1.5rem;
  text-decoration: none;
  animation: show 1s ease-in;
  color: var(--main-light);
  font-weight: 600;
  font-size: 2rem;
  margin: 1.8rem;
  margin-bottom: 3.2rem;
  transition: all 0.3s;
}

.btn-edit {
  border-radius: 3rem;
  font-size: 2rem;
  padding: 1.7rem 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  outline: none;
  cursor: pointer;
  border: none;
  width: 40%;
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

.btn-edit:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.plant-field {
  border-radius: 1.5rem;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.5rem;
  padding: 1.2rem;
  font-size: 1.8rem;
  background-color: var(--main-light);
  box-shadow: -8px -8px 20px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 1.5s ease-in;
  color: var(--dark-accent);
}

.plant-info-container {
  display: grid;
}
</style>
