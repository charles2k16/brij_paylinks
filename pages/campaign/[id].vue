<template>
  <div class="w-full flex flex-col lg:px-20 md:px-5 px-2">
    <!-- Banner -->
    <Banner class="hidden sm:block" />

    <!-- Campaign Info & Payment -->
    <div class="flex flex-row md:space-x-4 lg:px-16">
      <div class="lg:basis-3/5 md:basis-1/2 basis-full hidden sm:block">
        <!-- Campaign Info -->
        <CampaignInfo :data="campaignData" />
      </div>

      <!-- Campaign Info -->
      <div class="flex-1">
        <CampaignPayment />
      </div>
    </div>

    <div
      class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg"
    >
      <button
        type="button"
        class="flex-1 border border-teal-900 px-4 flex flex-row py-2 justify-center items-center gap-x-3 rounded-md hover:bg-teal-900 hover:text-white text-teal-900"
      >
        <p class="font-medium">I Pledge</p>
        <Icon name="majesticons:money-hand" size="25" />
      </button>
      <!-- Login  -->
      <button
        type="button"
        class="flex-1 bg-teal-900 px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-md hover:bg-teal-950 text-white"
      >
        <Icon name="ep:money" size="25" />
        <p class="font-medium">Donate</p>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Campaign } from '~/types';
// test data for campaign
const campaignData = reactive<Campaign>({
  title:
    'New Gate Faith Ministries Music department humbly ask for  support to acquire new instruments.',
  description: `Lorem autem vel eum. ure reprehenderit qui in ea voluptate velit esse quam nihil ut aliquipex
   ea commodo consequat. 
  Ut enim ad minima veniam, quis nostrum exercitationem ullam dolore magna aliqua. Ut enim ad minimn`,
  images: [
    'https://images.unsplash.com/photo-1602939444907-6e688c594a66?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1568153354382-6bcd1d46568b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  createdAt: '12 Febuaury, 2024',
  user: {
    name: 'John Anothony',
    email: 'john@gmail.com',
    phone: '+2335627987',
  },
  tags: [{ name: 'Church Instruments' }, { name: 'Church Fundraising' }],
  currency: {
    name: 'Ghana Cedis',
    code: '233',
    flag_url: 'https://cdn-icons-png.flaticon.com/128/197/197381.png',
  },
});
</script>
<style></style>
