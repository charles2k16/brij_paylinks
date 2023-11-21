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

        <PaymentMethods @onSelectMethods="selectedPayment" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const paymentDetails = reactive({
  amount: '',
  reference: '',
  channel: '',
});

const selectedPayment = cashInMethod => {
  console.log('actt', cashInMethod);
};
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
        line-height: 20px !important;
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
}
</style>
