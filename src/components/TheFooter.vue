<template>
  <footer>
    <p><strong>Total Tabs: </strong>{{ total }}</p>
  </footer>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    required: true
  }
});
</script>

<style lang="css" scoped></style>
