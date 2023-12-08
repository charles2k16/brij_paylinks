<template>
  <div class="merchant_info">
    <div class="app-logo">
      <img src="/img/logo.svg" alt="" />
    </div>

    <div class="d-flex justify_center">
      <div class="content">
        <div class="merchant-logo-container">
          <img src="/img/logo-dark.png" alt="logo" class="merchant-logo" />
        </div>

        <div class="merchant-info mt-40">
          <div>
            <h2>Bloom</h2>

            <p class="mt-10">Internet Service</p>

            <hr class="hr_rule mt-20" />
            <div class="mt-20">
              <div class="align_center">
                <el-icon-phone />
                <span class="ml-10">+233540571511</span>
              </div>

              <div class="align_center mt-10">
                <el-icon-location />
                <span class="ml-10">Dome Pillar 2 K.boat</span>
              </div>
            </div>

            <hr class="hr_rule mt-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.merchant_info {
  background-color: #f7f7f9;

  @media (min-width: 1200px) {
    height: 100vh;
  }

  .app-logo {
    padding: 23px 20px;
    height: 24px;
    width: 41.23px;
    @media (min-width: 1200px) {
      padding: 39px 50px;
      height: 55px;
      width: 32.02px;
    }
  }

  .content {
    padding-top: 7px;
    width: 100%;
    @media (min-width: 1200px) {
      width: 400px;
      padding-top: 20px;
    }
  }

  .merchant-logo-container {
    height: 58px;
    width: 58px;
    @media (min-width: 1200px) {
      height: 205px;
      width: 100%;
    }
    background: #133040;
    text-align: center;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .merchant-logo {
      align-self: center;
      height: 30px;
      width: 29px;
      @media (min-width: 1200px) {
        width: 122px;
        height: 118px;
      }
    }
  }

  .merchant-info {
    h2 {
      color: var(--color-primary);
    }

    span {
      font-size: 18px;
    }

    svg {
      width: 22px;
    }
  }
}
</style>
