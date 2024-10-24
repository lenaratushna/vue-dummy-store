<script setup>
import { useField } from 'vee-validate';
import { vMaska } from 'maska/vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: String,
  placeholder: String,
  isDisabled: Boolean,
  mask: String
});

const { value, errorMessage, handleChange } = useField(() => props.name);
</script>

<template>
  <div class="flex flex-col mb-2">
    <input
      :id="name"
      :class="errorMessage ? 'border-b border-red-500' : 'border-b'"
      class="focus:outline-none font-thin py-1"
      :value="value"  
      @input="handleChange" 
      :placeholder="placeholder"
      :type="type || 'text'"
      :disabled="isDisabled"
      v-maska="mask"
    />

    <small class="h-4" :class="errorMessage ? 'text-red-500' : ''">
      {{ errorMessage }}
    </small>
  </div>
</template>
