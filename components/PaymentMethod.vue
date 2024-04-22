<template>

  <!-- Select payment -->
  <div class="flex flex-col ">
    <p class="font-bold text-base text-black">Choose Payment Method</p>
    <!-- options -->
    <div class="flex flex-row w-[100%] justify-between flex-wrap gap-y-2  gap-x-1 mt-5">
      <div v-for="(option, index) in options" :key="index" @click=onSelectPaymentMethod(option)
        :class="{ 'border-teal-900 border-2': modelValue === option, 'border-gray-300': modelValue !== option }"
        class="flex lg:w-[32%] w-[49%] h-28 flex-col items-center justify-center border rounded-lg py-3 px-2 cursor-pointer">
        <input :id="option.channel" type="radio" :value="option.channel" class="hidden" />
        <div class="flex w-full justify-end h-3">
           <Icon v-if="modelValue === option" class="text-teal-900 " name="material-symbols:check-circle" />
        </div>
        <label :for="option.channel" class="sr-only">{{ option.name }}</label>
        <img :src="option.icon_url" alt="icon" class="h-10 w-10 rounded-full" />
        <p class="mt-2 text-xs text-center font-bold text-gray-900">{{ option.name }}</p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {type PaymentOption } from '~/types/index';

// props
const props = defineProps<{
  options: PaymentOption[] | null,
  modelValue?: PaymentOption | null
}>()

// emit
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue;
  }
);

// active payment option

// on select
function onSelectPaymentMethod(value: PaymentOption) {
  modelValue.value = value
  emit('update:modelValue', value);
}




</script>

<style scoped>
.secondary-custom-bg-color {
  background-color: #F9AB10;
  color: var(--color-primary);
}

.secondary-custom-bg-color:hover {
  background-color: #f0af2c;
}
</style>