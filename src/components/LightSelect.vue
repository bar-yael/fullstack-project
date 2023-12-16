<template>
  <label class="text-style">Light {{ index + 1 }}</label>
  <div class="relative">
    <select class="options" v-model="selectedOption" @change="onChange">
      <option value="on">On</option>
      <option value="off">Off</option>
      <option value="blinking">Blinking</option>
    </select>
    <div class="pointer">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {toNumber} from "@vue/shared";

const index = defineProps(['index']);
const selectedOption = ref('on');

const emit = defineEmits<{
  (e: 'change', selectedOption: string): void
}>();

const onChange = () => {
  console.log(index)
  emit('change', selectedOption.value);

}
</script>