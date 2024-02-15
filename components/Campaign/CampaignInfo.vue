<template>
    <div class="py-5 flex flex-col justify-start">

        <!-- Campaign Title -->
        <p class="text-black text-xl lg:pe-16">{{ props.data.title }}</p>

        <!-- Campaign Image Slider -->
        <div class="block mt-2 bg-slate-400">
            <el-carousel height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- Campaign orginizer info -->
        <div class="flex mt-4 w-full items-center gap-x-4 flex-wrap">
            <!-- Avatar -->
            <div class="p-2 rounded-full  flex justify-between items-center border border-teal-900">
                <Icon name="mdi:shield-account" class="text-teal-950" size="20"/>
            </div>

            <!-- Orginizer name -->
            <div class="flex gap-x-2">
                <p class="text-sm font-bold">{{ props.data.user.name }}</p>
                <p class="text-sm">is organizing a Champaign</p>
            </div>

            <!-- dot seprator -->
            <div class="rounded-full p-0.5 primary-custom-bg-color"></div>

            <!-- date -->
            <p class="text-sm text-gray-400">Created {{ props.data.createdAt }}</p>

        </div>

 
        

        <!-- List of tags -->
        <div class="flex w-full flex-row flex-wrap border py-1 rounded-full mt-4 px-2">
            <!-- chips -->
            <div v-for="(tag, index) in props.data.tags" :key="index" class="flex bg-teal-900 rounded-full me-1">
                <p class="text-sm text-white px-2 py-1">{{ tag.name }}</p>
            </div>
        </div>

        <!-- Description -->
        <div class="mt-4" v-for="(paragraph, index) in paragraphs" :key="index">
            <p class="mb-0">{{ paragraph }}</p>
        </div>


    </div>
</template>
<script setup lang="ts">
import { type Campaign } from '~/types/index'

const props = defineProps<{
  data: Campaign
}>()

    // Campaign tags
    const tags = reactive([
        {name: 'Church Fundraiser'},
        {name: 'Church Donation'},
        {name: 'Church Instruments'},
    ])

    // campaign description
        const campaignDescription = props.data.description.toString()
        // const campaignDescription = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quisquam laudantium magni! Eum aspernatur commodi pariatur et temporibus, iure harum. Hic, voluptatum repellendus cumque, saepe quibusdam odit quasi pariatur non ut expedita deleniti! Facilis quasi eius.
        // Illum tempore, cum et quas eligendi, iste impedit atque magni? Delectus debitis atque cumque iure culpa enim totam, possimus dolores consequatur quos consectetur adipisci maiores illo, perferendis qui nisi corrupti, aliquam eaque praesentium voluptatibus maxime!.
        // Tenetur quibusdam commodi enim earum. Dolore reiciendis, accusantium obcaecati fugit eligendi voluptates dolor consectetur quo nihil asperiores quibusdam. Consectetur perspiciatis voluptatem eaque illum nulla iure nam.
        // impedit quos quisquam nemo fugiat harum vero assumenda quas, officia voluptatibus exercitationem sed. 
        // Facilis corporis omnis assumenda quod consectetur mollitia quaerat rerum minima, fugiat adipisci molestias accusantium ea necessitatibus molestiae qui fuga, odit, reiciendis cupiditate doloribus aliquid labore quam recusandae ullam.
        // Sint nostrum explicabo, quis eius maxime eaque architecto dolorem, aut dolore nam a consequuntur asperiores officiis ducimus maiores? Magnam eligendi amet omnis doloremque hic recusandae necessitatibus dignissimos ipsam eius provident itaque.
        // quae neque quibusdam vero repellat nihil ab quisquam molestiae placeat molestias at ea quasi, sint commodi. Quibusdam expedita voluptatum.`;

        // computed to paragrapg description
        const paragraphs = computed(() => {
            return campaignDescription.split('\n');
        })
</script>
<style ></style>