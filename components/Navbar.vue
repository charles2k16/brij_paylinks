<template>
    <nav
      class="flex flex-wrap items-center justify-between mx-auto py-2 lg:px-20 px-5 sticky top-0 z-10 bg-white"
    >
      <div class="flex flex-col gapy-0 items-center">
        <!-- logo -->
        <img src="~/assets/images/logo-dark.png" alt="logo" class="h-10 w-10" />

      </div>

      <!-- toggle buttom -->
      <button
        @click="drawer = true" type="primary" style="margin-left: 16px;"
        class="inline-flex items-center p-1 ml-3 text-xl rounded-lg md:hidden"
      >
        <Icon class="w-6 h-6 text-black" name="ic:baseline-menu"/>
      </button>

      

      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <div class="flex gap-x-4">
            <!-- Another component could be here -->

          <div class="flex gap-x-3">
            <!-- navlinks slots -->
            <slot></slot>
          </div>

          <div class="flex gap-x-1">
              <!-- Get Started -->
            <button type="button" class="border border-teal-900 px-4 flex flex-row py-1 justify-center items-center gap-x-3 rounded-md hover:bg-teal-900 hover:text-white  text-teal-950">
              <p class="font-medium">Get started today</p>
              <Icon name="ic:outline-keyboard-arrow-right" size="30"  />
            </button>
            <!-- Login  -->
            <button type="button" class="primary-custom-bg-color px-4 flex flex-row py-1 justify-center items-center gap-x-3 rounded-md hover:bg-teal-900  text-white">
              <p class="font-medium">Merchant login</p>
            </button>
          </div>
        </div>
      </div>
    </nav>

</template>
<script setup>
</script>
<style>
.primary-custom-bg-color {
  background-color: #04383F;
}

.primary-custom-text-color {
  color: #04383F;
}
</style>





