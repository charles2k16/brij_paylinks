<template>
  <div class="flex flex-col w-full p-5 bg-white dark:bg-gray-950 lg:p-5 md:p-10">
    <div
      class="relative w-full bg-center bg-cover rounded-lg lg:max-w-md md:max-w-md lg:h-56 h-44"
      style="background-image: url('/img/invoice-bg.png')">
      <img src="/img/logo-white.png" alt="Logo" class="absolute top-0 right-0 h-16 m-4" />
    </div>
    <div class="flex flex-col rounded-md gap-y-2">
      <div class="my-4 border-b border-gray-100 dark:border-slate-800"></div>
      <!-- toggle contact btn -->
      <h2 class="text-lg dark:text-white">{{ merchant?.name }}</h2>
      <div class="flex items-center justify-between">
        <div class="items-center d-flex gap-x-3">
          <Icon
            class="text-teal-950 dark:text-white"
            name="material-symbols:call-outline" />
          <p class="text-base dark:text-white">{{ merchant?.contact }}</p>
        </div>
        <el-button type="warning" circle @click="copy(source)">
          <Icon class="text-teal-950" name="mdi:content-copy" />
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <div class="items-center d-flex gap-x-3">
          <Icon class="text-teal-950 dark:text-white" name="tdesign:location-1" />
          <p class="text-base dark:text-white">{{ merchant?.address }}</p>
        </div>
        <!-- <el-button type="warning" circle><Icon class="text-teal-950" name="mdi:content-copy"/></el-button> -->
      </div>
    </div>
    <!-- Invoice list -->
    <div class="flex flex-col">
      <div class="my-4 border-b border-gray-100 dark:border-slate-800 m"></div>
      <!-- invoice items control header -->
      <div class="flex items-center justify-between mb-2">
        <h2 class="dark:text-white">invoice items</h2>
        <div class="flex justify-center">
          <button
            type="button"
            @click="toggleInvoiceItems"
            class="flex items-center px-2 py-1 border border-gray-300 rounded-full gap-x-2 dark:border-white w-fit">
            <Icon
              v-if="showInvoiceItems"
              class="text-teal-95 dark:text-white"
              name="ic:twotone-keyboard-arrow-up" />
            <Icon
              v-else
              class="text-teal-950 dark:text-white"
              name="ic:twotone-keyboard-arrow-down" />
            <h2 v-if="showInvoiceItems" class="text-xs dark:text-white">
              Close invoice list
            </h2>
            <h2 v-else class="text-xs dark:text-white">Show invoice list info</h2>
          </button>
        </div>
      </div>
      <div class="flex flex-col my-4 gap-y-2">
        <h2 class="dark:text-white">{{ invoice?.invoice_name }}</h2>
        <div class="flex justify-start gap-x-2">
          <h2 class="text-sm text-gray-400">Invoice ID</h2>
          <h2 class="text-sm dark:text-white">{{ invoice?.invoice_no }}</h2>
        </div>
        <div class="flex justify-start gap-x-2">
          <h2 class="text-sm text-gray-400">Due Date</h2>
          <h2 class="text-sm dark:text-white">
            {{ formateDate(invoice?.due_date!, 'Mo MMM YYYY h:ss a') }}
          </h2>
        </div>
      </div>
      <!-- items -->
      <div
        v-if="showInvoiceItems"
        v-for="(item, index) in invoice?.invoice_items"
        :key="index"
        class="flex items-center my-4 gap-x-2">
        <div
          class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md dark:bg-gray-900">
          <Icon name="tabler:cube" class="dark:text-white" />
        </div>
        <div class="flex flex-col items-start flex-1 h-full">
          <h2 class="text-base dark:text-white">{{ item.item_description }}</h2>
          <div class="flex gap-x-2">
            <p class="text-sm dark:text-white">
              {{ invoice?.currency }} {{ item.unit_price }}
            </p>
            <p class="text-sm dark:text-white">Qty : {{ item.quantity }}</p>
          </div>
        </div>
        <h2 class="text-base dark:text-white">
          {{ invoice?.currency }} {{ item.subtotal }}
        </h2>
      </div>
    </div>
    <div class="my-4 border-b border-gray-100 dark:border-slate-800 m"></div>
    <div class="flex flex-col gap-y-2">
      <!-- discout -->
      <div class="flex items-center justify-center my-2 gap-x-3">
        <div class="w-5 border-b border-gray-200"></div>
        <p class="text-xs text-gray-600 dark:text-white">Discount</p>
        <div class="w-5 border-b border-gray-200"></div>
      </div>
      <div class="flex justify-between">
        <h2 class="text-sm dark:text-white">Discount types</h2>
        <h2 v-if="invoice?.discount_type === null" class="text-sm dark:text-white">
          No discount
        </h2>
        <h2 v-else class="text-sm dark:text-white">{{ invoice?.discount_type }}</h2>
      </div>
      <div class="flex justify-between">
        <h2 class="text-sm text-teal-800 dark:text-teal-500">Discount Amount</h2>
        <h2 class="text-sm dark:text-white">
          {{ invoice?.currency }} {{ invoice?.discount_amount }}
        </h2>
      </div>
      <div class="flex justify-between">
        <h2 class="text-sm text-teal-800 dark:text-teal-500">Amount after discount</h2>
        <h2 class="text-sm dark:text-white">
          {{ invoice?.currency }} {{ invoice?.amount_after_discount }}
        </h2>
      </div>
      <!-- tax -->
      <div class="flex items-center justify-center my-2 gap-x-3">
        <div class="w-5 border-b border-gray-200 dark:border-white m"></div>
        <p class="text-xs text-gray-600 dark:text-white">Tax</p>
        <div class="w-5 border-b border-gray-200 dark:border-white m"></div>
      </div>
      <div
        v-for="(tax, index) in invoice?.taxes"
        :key="index"
        class="flex justify-between">
        <h2 class="text-sm text-amber-400">{{ tax.name }}</h2>
        <h2 class="text-sm dark:text-white">{{ tax.percentage }}%</h2>
      </div>
      <div class="flex justify-between">
        <h2 class="text-sm text-amber-400">Tax amount</h2>
        <h2 class="text-sm dark:text-white">
          {{ invoice?.currency }} {{ invoice?.tax_amount }}
        </h2>
      </div>
      <!-- total -->
      <div class="flex items-center justify-center my-2 gap-x-3">
        <div class="w-5 border-b border-gray-200 dark:border-white m"></div>
        <p class="text-xs text-gray-600 dark:text-white">Total amount to be paid</p>
        <div class="w-5 border-b border-gray-200 dark:border-white m"></div>
      </div>
      <div class="flex justify-between">
        <h2 class="text-base dark:text-white">Total</h2>
        <h2 class="text-lg dark:text-white">
          {{ invoice?.currency }} {{ invoice?.total }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/store/invoice';
const invoiceStore = useInvoiceStore();
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import type { Invoice, Merchant, PaymentMethods, PaymentOption } from '~/types';

const { merchant, invoice } = storeToRefs(invoiceStore);
const source = ref(`${merchant.value?.contact}`);
const { copy, copied } = useClipboard({ source });

// props
const props = defineProps<{
  invoice: Invoice | null;
  merchant: Merchant;
  countries: any[];
}>();

const showInvoiceItems = ref(false);
const drawer = ref(false);

function toggleInvoiceItems() {
  showInvoiceItems.value = !showInvoiceItems.value;
}

watch(copied, newValue => {
  if (newValue === true) {
    ElMessage({
      message: 'Merchant contact copied successfully',
      type: 'success',
    });
  }
});

function toggleSheet() {
  drawer.value = !drawer.value;
}
</script>
<style></style>
