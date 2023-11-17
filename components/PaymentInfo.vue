<template>
  <div class="payment-info">
    <div></div>
    <h2>Make Payment</h2>
    <p class="mt-10">Enter amount to pay and select payment method</p>

    <div class="mt-40">
      <el-form :model="paymentDetails" label-position="top">
        <div>
          <el-form-item label="Amount to pay">
            <el-input
              v-model="paymentDetails.amount"
              type="text"
              placeholder="0.00"
            />
          </el-form-item>
        </div>

        <el-form-item label="Reference">
          <el-input
            v-model="paymentDetails.reference"
            placeholder="eg. paying for service"
          />
        </el-form-item>
      </el-form>

      <div>
        <label>How would you like to pay?</label>

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
                isActive === method.channel
                  ? 'active payment_div'
                  : 'payment_div'
              "
              @click="selectedPayment(method)"
            >
              <div class="d-flex justify_end px-10 pt-10 vector">
                <img
                  v-show="isActive == method.channel"
                  src="/icons/check.svg"
                  alt="check"
                />
              </div>

              <div class="pay_img">
                <img
                  :src="method.icon_url"
                  width="40px"
                  :alt="method.channel"
                />
                <span class="d-block label">{{ method.name }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const paymentDetails = reactive({
  amount: '',
  reference: '',
  channel: '',
});

const pageLoading = ref(true);
let isActive = ref('');
const paymentMethods = [];
const cashinDetails = reactive({});

const selectedPayment = cashInMethod => {
  isActive = cashInMethod.channel;
  cashinDetails = {
    channel: cashInMethod.channel,
    fund_type: cashInMethod.fund_type,
    name: cashInMethod.name,
    walletCurrency: this.wallet.currency,
    cash_out_method_id: cashInMethod.id,
    wallet_id: this.wallet.id,
    country_abbr: cashInMethod.country_abbreviations[0],
  };
};

const { data } = await apiService('/paymentlinks/paymentmethods', {
  method: 'GET',
  query: { currency: 'GHS' },
});

console.log(data);
</script>

<style lang="scss" scoped>
.payment-info {
  width: 100vw;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 1200px) {
    width: 400px;
    padding-top: 200px;
  }

  padding-top: 50px;

  h2 {
    color: var(--color-primary);
    font-size: 25px;
  }
}
</style>
