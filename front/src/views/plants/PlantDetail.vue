<template>
  <div>
    <h1>Plant Detail</h1>
    <div>
      <h2>{{ name }}</h2>
      <p>{{ species }}</p>
      <p>{{ room }}</p>
      <p>{{ sunExposure }}</p>
      <p>{{ soilType }}</p>
      <p>{{ toxicityLevel }}</p>
      <p>{{ color }}</p>
      <p>{{ maxHeight }}</p>
    </div>
  </div>
</template>

<script>
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
      this.plant = await this.$store.dispatch("loadPlant", this.id);
    },
  },
};
</script>
