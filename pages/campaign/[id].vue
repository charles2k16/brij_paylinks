<template>
  <div class="w-full flex flex-col lg:px-20 md:px-5 px-2">
    <!-- Banner -->
    <CampaignBanner class="hidden sm:block" />
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

    <div class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->
      <button type="button"
        @click="drawer = true"
        class="flex-1 secondary-custom-bg-color px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full hover:bg-teal-950 text-teal-900">
        <Icon name="ep:money" size="25" />
        <p class="font-medium">Donate</p>
      </button>
      <!-- Drawer for payment form on mobile -->
      <el-drawer v-model="drawer" size="90%" direction="btt" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">Donate to the campaign</h4>
          <el-button type="" @click="close" link :icon="ArrowLeftBold">
            Back
          </el-button>
        </template>
        <!-- banner -->
        <div class="flex text-base mb-5">
          <p> Donate to support<span class="font-bold text-teal-900"> Faith Ministries Music department humbly ask for support to acquire new instruments</span> Campaign</p>
        </div>
        <CampaignPaymentForm/>
      </el-drawer>
      <!-- pledge -->
      <button type="button"
        class="flex-1 border border-teal-900 px-4 flex flex-row py-2 justify-center items-center gap-x-3 rounded-full hover:bg-teal-900 hover:text-white text-teal-900">
        <p class="font-medium">I Pledge</p>
        <Icon name="majesticons:money-hand" size="25" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Campaign } from '~/types/index';
import { ArrowLeftBold} from '@element-plus/icons-vue';

const drawer = ref(false)

// test data for campaign
const campaignData = reactive<Campaign>({
  title:
    'New Gate Faith Ministries Music department humbly ask for  support to acquire new instruments.',
  description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quisquam laudantium magni! Eum aspernatur commodi pariatur et temporibus, iure harum. Hic, voluptatum repellendus cumque, saepe quibusdam odit quasi pariatur non ut expedita deleniti! Facilis quasi eius.
         Illum tempore, cum et quas eligendi, iste impedit atque magni? Delectus debitis atque cumque iure culpa enim totam, possimus dolores consequatur quos consectetur adipisci maiores illo, perferendis qui nisi corrupti, aliquam eaque praesentium voluptatibus maxime!.
         Tenetur quibusdam commodi enim earum. Dolore reiciendis, accusantium obcaecati fugit eligendi voluptates dolor consectetur quo nihil asperiores quibusdam. Consectetur perspiciatis voluptatem eaque illum nulla iure nam.
         impedit quos quisquam nemo fugiat harum vero assumenda quas, officia voluptatibus exercitationem sed. 
         Facilis corporis omnis assumenda quod consectetur mollitia quaerat rerum minima, fugiat adipisci molestias accusantium ea necessitatibus molestiae qui fuga, odit, reiciendis cupiditate doloribus aliquid labore quam recusandae ullam.
         Sint nostrum explicabo, quis eius maxime eaque architecto dolorem, aut dolore nam a consequuntur asperiores officiis ducimus maiores? Magnam eligendi amet omnis doloremque hic recusandae necessitatibus dignissimos ipsam eius provident itaque.
         quae neque quibusdam vero repellat nihil ab quisquam molestiae placeat molestias at ea quasi, sint commodi. Quibusdam expedita voluptatum.`,
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

definePageMeta({
    layout: 'campaign-layout'
})

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
