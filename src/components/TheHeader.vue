<template>
  <header :class="elementClasses.header.root">
    <h2 :class="elementClasses.header.h2">Tabitat</h2>

    <input
      :class="elementClasses.header.input"
      ref="search"
      id="search-input"
      type="search"
      placeholder="Search"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <p :class="elementClasses.header.p">Total Tabs: {{ totalTabs }}</p>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// inputs and outputs
defineProps(['modelValue', 'totalTabs']);
defineEmits(['update:modelValue']);

// put cursor in search on load
const search = ref(null);
onMounted(() => {
  search.value.focus();
});

// element classes
const elementClasses = {
  header: {
    root: [
      'w-screen',
      'flex',
      'flex-col',
      'content-center',
      'drop-shadow-sm',
      'bg-white',
      'dark:bg-neutral-800',
      'dark:text-white'
    ],
    h2: ['m-3', 'text-2xl', 'font-semibold'],
    input: [
      'mx-4',
      'mb-1',
      'p-1',
      'border',
      'border-gray-300',
      'rounded-lg',
      'text-base',
      'focus:outline-none',
      'focus:border-2',
      'focus:border-indigo-400',
      'focus:ring-1',
      'focus:ring-indigo-200',
      'dark:bg-neutral-800'
    ],
    p: ['self-center', 'mb-1', 'text-base']
  }
};
</script>

<style lang="css" scoped></style>
