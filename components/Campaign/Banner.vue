<template>
    <div class="primary-custom-bg-color w-full rounded-md py-5 px-10">
        <div class="flex flex-row w-full justify-between">
            <!-- left info -->
            <div class="flex flex-col">
                <p class="text-4xl banner-h5-text text-white">Brij Campaign</p>
                <p class="text-white mt-2 font-normal">Create an account today to start raising & manage funds today</p>
                <!-- Buttons -->
                <div class="flex gap-x-3 mt-5">
                    <!-- Get Started -->
                    <button type="button"
                        class="border border-white px-4 flex flex-row py-1 justify-center items-center gap-x-3 rounded-md hover:bg-white hover:text-teal-950  text-white">
                        <p class="font-medium">Get started today</p>
                        <Icon name="ic:outline-keyboard-arrow-right" size="30" />
                    </button>
                    <!-- Login  -->
                    <button type="button"
                        class="bg-white px-4 flex flex-row py-1 justify-center items-center gap-x-3 rounded-md hover:bg-slate-100 text-teal-950 ">
                        <p class="font-medium">Merchant login</p>
                    </button>
                </div>
            </div>

            <!-- images-->
            <img src="~/assets/images/banner-image.png" alt="banner-image" class="banner-image" />
            
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
</style>