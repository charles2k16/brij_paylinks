<template>
  <div class="flex flex-col w-full bg-white lg:p-5 md:p-10 p-5">
    <div
      class="relative lg:max-w-md md:max-w-md lg:h-56 h-44 rounded-lg w-full bg-cover bg-center"
      style="background-image: url('/img/invoice-bg.png')">
      <img src="/img/logo-white.png" alt="Logo" class="absolute top-0 right-0 m-4 h-16" />
    </div>

    <div class="flex flex-col gap-y-2 rounded-md">
      <div class="border-b border-gray-100 my-4"></div>
      <!-- toggle contact btn -->

      <h2 class="text-lg">{{ merchant?.name }}</h2>
      <div class="flex items-center justify-between">
        <div class="d-flex gap-x-3 items-center">
          <Icon name="material-symbols:call-outline" />
          <p class="text-base">{{ merchant?.contact }}</p>
        </div>
        <el-button type="warning" circle @click="copy(source)">
          <Icon class="text-teal-950" name="mdi:content-copy" />
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <div class="d-flex gap-x-3 items-center">
          <Icon name="tdesign:location-1" />
          <p class="text-base">{{ merchant?.address }}</p>
        </div>
        <!-- <el-button type="warning" circle><Icon class="text-teal-950" name="mdi:content-copy"/></el-button> -->
      </div>
    </div>

    <!-- Invoice list -->
    <div class="flex flex-col">
      <div class="border-b border-gray-100 my-4"></div>

      <!-- invoice items control header -->
      <div class="flex justify-between items-center mb-2">
        <h2>invoice items</h2>
        <div class="flex justify-center">
          <button
            type="button"
            @click="toggleInvoiceItems"
            class="flex gap-x-2 items-center border border-gray-300 w-fit px-2 py-1 rounded-full">
            <Icon
              v-if="showInvoiceItems"
              class="text-teal-950"
              name="ic:twotone-keyboard-arrow-up" />
            <Icon v-else class="text-teal-950" name="ic:twotone-keyboard-arrow-down" />
            <h2 v-if="showInvoiceItems" class="text-xs">Close invoice list</h2>
            <h2 v-else class="text-xs">Show invoice list info</h2>
          </button>
        </div>
      </div>

      <div class="flex flex-col my-4 gap-y-2">
        <h2>Monthly Invoice for Coporate Car Wash</h2>
        <div class="flex gap-x-2 justify-start">
          <h2 class="text-sm text-gray-400">Invoice ID</h2>
          <h2 class="text-sm">{{ invoice?.invoice_no }}</h2>
        </div>
        <div class="flex gap-x-2 justify-start">
          <h2 class="text-sm text-gray-400">Due Date</h2>
          <h2 class="text-sm">
            {{ formateDate(invoice?.due_date!, 'Mo MMM YYYY h:ss a') }}
          </h2>
        </div>
      </div>

      <!-- items -->
      <div
        v-if="showInvoiceItems"
        v-for="(item, index) in invoice?.invoice_items"
        :key="index"
        class="flex items-center gap-x-2 mb-4">
        <div class="h-10 w-10 rounded-md bg-gray-100 flex justify-center items-center">
          <Icon name="tabler:cube" />
        </div>
        <div class="flex flex-col items-start h-full flex-1">
          <h2 class="text-base">{{ item.item_description }}</h2>
          <div class="flex gap-x-2">
            <p class="text-sm">{{ invoice?.currency }} {{ item.unit_price }}</p>
            <p class="text-sm">Qty : {{ item.quantity }}</p>
          </div>
        </div>
        <h2 class="text-base">{{ invoice?.currency }} {{ item.subtotal }}</h2>
      </div>
    </div>

    <div class="border-b border-gray-100 my-4"></div>

    <div class="flex flex-col gap-y-2">
      <!-- discout -->

      <div class="flex justify-center items-center my-2 gap-x-3">
        <div class="border-b w-5 border-gray-200"></div>
        <p class="text-xs text-gray-600">Discount</p>
        <div class="border-b w-5 border-gray-200"></div>
      </div>

      <div class="flex justify-between">
        <h2 class="text-sm">Discount types</h2>
        <h2 v-if="invoice?.discount_type === null" class="text-sm">No discount</h2>
        <h2 v-else class="text-sm">{{ invoice?.discount_type }}</h2>
      </div>

      <div class="flex justify-between">
        <h2 class="text-sm text-teal-800">Discount Amount</h2>
        <h2 class="text-sm">{{ invoice?.currency }} {{ invoice?.discount_amount }}</h2>
      </div>

      <div class="flex justify-between">
        <h2 class="text-sm text-teal-800">Amount after discount</h2>
        <h2 class="text-sm">
          {{ invoice?.currency }} {{ invoice?.amount_after_discount }}
        </h2>
      </div>

      <!-- tax -->
      <div class="flex justify-center items-center my-2 gap-x-3">
        <div class="border-b w-5 border-gray-200"></div>
        <p class="text-xs text-gray-600">Tax</p>
        <div class="border-b w-5 border-gray-200"></div>
      </div>

      <div
        v-for="(tax, index) in invoice?.taxes"
        :key="index"
        class="flex justify-between">
        <h2 class="text-sm text-amber-400">{{ tax.name }}</h2>
        <h2 class="text-sm">{{ tax.percentage }}%</h2>
      </div>

      <div class="flex justify-between">
        <h2 class="text-sm text-amber-400">Tax amount</h2>
        <h2 class="text-sm">{{ invoice?.currency }} {{ invoice?.tax_amount }}</h2>
      </div>

      <!-- total -->
      <div class="flex justify-center items-center my-2 gap-x-3">
        <div class="border-b w-5 border-gray-200"></div>
        <p class="text-xs text-gray-600">Total amount to be paid</p>
        <div class="border-b w-5 border-gray-200"></div>
      </div>

      <div class="flex justify-between">
        <h2 class="text-base">Total</h2>
        <h2 class="text-lg">{{ invoice?.currency }} {{ invoice?.total }}</h2>
      </div>
    </div>

    <div class="border-b border-gray-100 my-4"></div>

    <!-- for tablet screens only -->
    <div class="hidden md:block">
      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <!-- Drawer for payment form on mobile -->
      <MazBottomSheet v-model="drawer" :no-close="true">
        <div class="h-screen">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-between items-center">
              <p class="text-gray-600">Payment form</p>
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
            <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="contries" />
          </div>
        </div>
      </MazBottomSheet>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useInvoiceStore } from '~/store/invoice';
const invoiceStore = useInvoiceStore();
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import type { Invoice, Merchant, PaymentMethods } from '~/types';

const { merchant, invoice } = storeToRefs(invoiceStore);
const source = ref(`${merchant.value?.contact}`);
const { text, copy, copied } = useClipboard({ source });

// props
const props = defineProps<{
  invoice: Invoice | null;
  merchant: Merchant | undefined;
  paymentOptions: PaymentMethods;
  contries: any[];
}>();

const showInvoiceItems = ref(false);
const drawer = ref(false);

function toggleInvoiceItems() {
  showInvoiceItems.value = !showInvoiceItems.value;
}


watch(copied, (newValue) => {
    if (newValue === true) {
        ElMessage({
            message: "Merchnat contac copied successfully",
            type: 'success',
        })
    }
});

function toggleSheet() {
    drawer.value = !drawer.value

}
</script>
<style></style>
