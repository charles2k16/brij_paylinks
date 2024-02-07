<template>
    <div
        class="w-full lg:border md:border lg:border-gray-200 md:border-gray-200  mt-4 lg:px-3 px-2 lg:py-3  rounded-lg">
        <!-- Campaign Image Slider -->
        <div class="block bg-slate-400 w-full sm:hidden">
            <el-carousel height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- Campaign title for sm screen only-->
        <p class="text-black my-2 text-xl font-bold block sm:hidden">New Gate Faith Ministries Music department humbly ask for support to
            acquire new instruments.</p>

        <!-- Amount raised card -->
        <div class="flex bg-gray-50 py-3 px-3 rounded-md items-center flex-wrap sm:hidden">
            <!-- flag -->
            <img src="~/assets/images/ghana.png" class="lg:me-3 me-2" height="27" width="27" alt="ghana_flag">
            <!-- Amount -->
            <div class="flex gap-x-1 lg:me-5 me-3">
                <p class="primary-custom-text-color font-bold ">₵0.00</p>
                <p>raised</p>
            </div>
            <!-- dot seprator -->
            <div class="rounded-full p-0.5 primary-custom-bg-color lg:me-5 me-3"></div>
            <!-- Donations amount -->
            <div class="flex gap-x-1">
                <p>0</p>
                <p>donations</p>
            </div>
        </div>


        <!-- User info for small screens only -->
        <div class="flex mt-4 w-full items-center gap-x-2 flex-wrap my-4  sm:hidden">
            <!-- Avatar -->
            <div class="p-2 rounded-full  flex justify-between items-center border border-teal-900">
                <Icon name="mdi:shield-account" class="text-teal-950" size="20"/>
            </div>

            <!-- Orginizer name -->
            <div class="flex gap-x-2">
                <p class="text-sm font-bold">John Anthony's Campaign</p>
            </div>

            <!-- dot seprator -->
            <div class="rounded-full p-0.5 primary-custom-bg-color"></div>

            <!-- date -->
            <p class="text-sm text-gray-400">12 Febuaury, 2024</p>
        </div>

        <!-- tags for sm screen only -->
        <div class="flex w-full flex-row flex-wrap border py-1 rounded-md px-2  sm:hidden">
            <!-- chips -->
            <div v-for="(tag, index) in tags" :key="index" class="flex bg-teal-900 rounded-md me-1 mb-1">
                <p class="text-sm text-white px-2 py-1">{{ tag.name }}</p>
            </div>
        </div>
        

        <!-- Amount raised card for large screen -->
        <div class="sm:flex bg-gray-50 py-3 px-3 rounded-md items-center flex-wrap hidden">
            <!-- flag -->
            <img src="~/assets/images/ghana.png" class="lg:me-3 me-2" height="27" width="27" alt="ghana_flag">
            <!-- Amount -->
            <div class="flex gap-x-1 lg:me-5 me-3">
                <p class="primary-custom-text-color font-bold ">₵30000.00</p>
                <p>Raised</p>
            </div>
            <!-- dot seprator -->
            <div class="rounded-full p-0.5 primary-custom-bg-color lg:me-5 me-3"></div>
            <!-- Donations amount -->
            <div class="flex gap-x-1">
                <p>0</p>
                <p>donations</p>
            </div>
        </div>

        <!-- Campaign description for small screen -->
        <div class="sm:hidden block mt-4" v-for="(paragraph, index) in paragraphs" :key="index">
            <p class="mb-3">{{ paragraph }}</p>
        </div>

        <!-- Campaign link for small screens only -->
        <p class="text-gray-400 text-sm mb-2 sm:hidden block">Campaign Link</p>
        <div class="flex justify-between  w-full gap-x-2 mb-24 sm:hidden">
            <!-- Input for link -->
            <div class="flex-1">
                <el-input placeholder="Eg. 0553904533" v-model="input" clearable></el-input>
            </div>
            <div>
                <button type="button"
                    class="flex-1 bg-teal-900 px-4 flex flex-row py-3 flex-nowrap justify-center items-center gap-x-3 rounded-md hover:bg-teal-950 text-white ">
                    <Icon name="clarity:copy-to-clipboard-line" size="25" />
                    <p class="font-medium">Copy</p>
                </button>
            </div>
        </div>

        <!--  Payment form-->
        <CampaignPaymentForm class="hidden sm:block" />
    </div>
</template>
<script setup lang="ts">

    // Campaign tags for small screen
    const tags = reactive([
        {name: 'Church Fundraiser'},
        {name: 'Church Donation'},
    ])

    // Campaign description for small screens
    const campaignDescription = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quisquam laudantium magni! Eum aspernatur commodi pariatur et temporibus, iure harum. Hic, voluptatum repellendus cumque, saepe quibusdam odit quasi pariatur non ut expedita deleniti! Facilis quasi eius.
    Illum tempore, cum et quas eligendi, iste impedit atque magni? Delectus debitis atque cumque iure culpa enim totam, possimus dolores consequatur quos consectetur adipisci maiores illo, perferendis qui nisi corrupti, aliquam eaque praesentium voluptatibus maxime!.
    Tenetur quibusdam commodi enim earum. Dolore reiciendis, accusantium obcaecati fugit eligendi voluptates dolor consectetur quo nihil asperiores quibusdam. Consectetur perspiciatis voluptatem eaque illum nulla iure nam.
    impedit quos quisquam nemo fugiat harum vero assumenda quas, officia voluptatibus exercitationem sed. 
    Facilis corporis omnis assumenda quod consectetur mollitia quaerat rerum minima, fugiat adipisci molestias accusantium ea necessitatibus molestiae qui fuga, odit, reiciendis cupiditate doloribus aliquid labore quam recusandae ullam.
    Sint nostrum explicabo, quis eius maxime eaque architecto dolorem, aut dolore nam a consequuntur asperiores officiis ducimus maiores? Magnam eligendi amet omnis doloremque hic recusandae necessitatibus dignissimos ipsam eius provident itaque.
    quae neque quibusdam vero repellat nihil ab quisquam molestiae placeat molestias at ea quasi, sint commodi. Quibusdam expedita voluptatum.`;

     // computed to paragrapg description for small screens
    const paragraphs = computed(() => {
        return campaignDescription.split('\n');
    })

    // Campign link model input
    const input = ref('https://icones.js.org/collection/all?s=copy')
</script>
<style></style>