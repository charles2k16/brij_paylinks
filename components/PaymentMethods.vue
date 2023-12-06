<template>
  <el-row
    v-loading="pageLoading"
    element-loading-text="Loading..."
    class="mt-20"
    :gutter="20"
  >
    <el-col
      v-for="(method, index) in paymentMethods"
      :key="index"
      :md="8"
      :sm="12"
      :xs="12"
      class="mb-20"
    >
      <div
        :class="
          isActive === method.channel ? 'active payment_div' : 'payment_div'
        "
        @click="selectedPayment(method)"
      >
        <div class="d-flex justify_end px-10 pt-10 vector">
          <img
            v-show="isActive == method.channel"
            src="/img/check.svg"
            alt="check"
          />
        </div>

        <div class="pay_img">
          <img :src="method.icon_url" :alt="method.channel" />
          <span class="d-block label mt-5">{{ method.name }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['onSelectMethods']);
let pageLoading = ref(true);
let isActive = ref('');
let paymentMethods = [];

const selectedPayment = payMethod => {
  isActive.value = payMethod.channel;
  emit('onSelectMethods', payMethod);
};

const { data } = await apiService('/paymentlinks/paymentmethods', {
  method: 'GET',
  query: { currency: 'GHS' },
});
paymentMethods = data._rawValue.data;
pageLoading.value = false;
</script>

<style lang="scss" scoped>
.payment_div {
  border: 1px solid #e6e6ea;
  box-sizing: border-box;
  border-radius: 8px;
  height: 110px;
  display: flex;
  flex-direction: column;

  .vector {
    height: 25px;
  }

  .pay_img {
    margin-top: -5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
    }

    span {
      line-height: 18px !important;
      text-align: center;
    }
  }

  .label {
    font-family: var(--font-primary-light), sans-serif;
    font-size: 14px;
  }

  &:hover {
    border: 1px solid var(--color-primary);
  }
}

.active {
  border: 1px solid var(--color-primary);
  background-color: rgb(223, 233, 236);
}
</style>
