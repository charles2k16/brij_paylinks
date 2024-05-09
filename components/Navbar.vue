<template>
  <nav class="flex flex-wrap items-center justify-between mx-auto py-2 lg:px-20 px-5 sticky top-0 z-10 bg-white dark:bg-gray-950">
    <div class="flex flex-col gapy-0 items-center">
      <!-- logo -->
      <img src="~/assets/images/logo-dark.png" alt="logo" class="h-10 w-10" />
    </div>

    <!-- toggle buttom -->
    <div class="ring-1 ring-slate-100 dark:ring-slate-800 p-10 rounded-md">
      <MazSwitch
    v-model="isDarkMode"
    name="color_mode"
  >
   <div class="flex flex-row gap-x-2">
    <Icon v-if="isDarkMode" class="dark:text-white" name="material-symbols:wb-sunny-outline-rounded"/>
    <Icon  v-else  class="dark:text-white" name="ic:twotone-dark-mode"/>
   </div>

  </MazSwitch>
    </div>



  </nav>
</template>
<script setup lang="ts">
const colorMode = useColorMode()

console.log(colorMode.preference)
const isDarkMode = ref(false)

watch(isDarkMode, (newValue, oldValue) => {
  console.log(`${newValue} - ${oldValue}`)
  if(isDarkMode.value === true){
    colorMode.preference = 'dark'
  }else{
    colorMode.preference = 'light'

  }
});



</script>
<style scoped>
.primary-custom-bg-color {
  background-color: #04383F;
}

.secondary-custom-bg-color {
  background-color: #F9AB10;
}

.secondary-custom-bg-color:hover {
  background-color: #f0af2c;
}

.button-font-weight {
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383F;
}
</style>





