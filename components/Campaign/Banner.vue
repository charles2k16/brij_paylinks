<template>
    <div class="primary-custom-bg-color w-full rounded-md py-5 px-10">
        <div class="flex flex-row w-full justify-between">
            <!-- left info -->
            <div class="flex flex-col">
                <!-- Image on sm screen -->
                <img src="~/assets/images/banner-image.png" alt="banner-image" class="banner-image sm:hidden block h-fit w-fit mb-5"/>

                <p class="lg:text-4xl text-lg banner-h5-text text-white">Brij Campaign</p>
                <p class="text-white mt-2 font-normal lg:text-base text-sm">Create an account today to start raising & manage funds today</p>
                <!-- Buttons -->
                <div class="flex lg:flex-row flex-col gap-x-3 mt-5 gap-y-2">
                    <!-- Get Started -->
                    <button type="button"
                        class="border border-white px-4 flex flex-row py-1 justify-center items-center gap-x-3 rounded-full hover:bg-white hover:text-teal-950  text-white">
                        <p class="font-medium">Get started today</p>
                        <Icon name="ic:outline-keyboard-arrow-right" size="30" />
                    </button>
                    <!-- Login  -->
                    <button type="button"
                        class=" secondary-custom-bg-color px-4 flex flex-row py-2 justify-center items-center gap-x-3 rounded-full  text-teal-950 ">
                        <p class="font-medium">Merchant login</p>
                    </button>
                </div>
            </div>

            <!-- images on large screen-->
            <img src="~/assets/images/banner-image.png" alt="banner-image" class="banner-image hidden md:block " />
            
        </div>
    </div>
</template>
<script setup>
</script>
<style>
.banner-h5-text {
    font-weight: bolder;
}

.banner-image{
    height: 10rem;
}

.primary-custom-bg-color {
  background-color: #04383F;
}

.secondary-custom-bg-color{
  background-color: #F9AB10;
}

.secondary-custom-bg-color:hover{
  background-color: #f0af2c;
}

.button-font-weight{
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383F;
}
</style>