<template>
  <div class="test-component">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: 'Hello World',
  },
});

const count = ref(0);

const increment = () => {
  count.value += 1;
};

const doubledCount = computed(() => count.value * 2);
</script>

<style scoped>
.test-component {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
