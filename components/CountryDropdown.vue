<template>
  <div>
    <el-dropdown class="countryList" :disabled="disabled">
      <span
        v-if="defaultCountry"
        v-loading="countryLoading"
        class="el-dropdown-link align_center mt-5 country_selector">
        <img :src="defaultCountry.flag_url" alt="flag" width="24px" class="mr-5" />
        <span v-if="list === 'custom'" class="cty_name">
          {{ defaultCountry.name }}
        </span>
        <span v-else class="cty_name">
          {{ defaultCountry.currency_symbol }}
          <span v-if="walletBalance"> ({{ walletBalance }})</span>
        </span>
        <i v-if="showIcon" class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <span v-else class="el-dropdown-link align_center mt-5 country_selector"
        >Select Country <i v-if="showIcon" class="el-icon-arrow-down el-icon--right"></i
      ></span>
      <el-dropdown-menu
        v-if="list !== 'none'"
        slot="dropdown"
        :class="fixedHeight ? 'auto-height' : 'all'">
        <el-dropdown-item v-for="(country, index) in countries" :key="index" class="mt-5">
          <span class="align_center py-5" style="font-size: 18px">
            <img :src="country.flag_url" alt="flag" width="24px" class="mr-10" />{{
              country.name
            }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { IMixinState } from '~/types/mixinsTypes';
import { supportedCountries } from '@/assets/data/index.js';

const currentCountry = reactive({
  name: 'Ghana',
  flag_url: '/flags/GHS.png',
  currency_symbol: 'GHS',
});

const countryList = ref('custom');
const fixedHeight = ref(false);
const showIcon = ref(true);
const disabled = ref(false);
const selectFirst = ref(false);

const mixins = this.IMixinState;
const defaultCountry = ref({});
const countries = ref([{}]);
const list = countryList.value;
const countryLoading = ref(false);
const walletBalance = ref('');

const setCountries = async () => {
  countryLoading.value = true;

  if (list === 'inbound') {
    checkCountryProps();
    const countriesData = await mixins.$quickSendApi.getInboundCountries('/');
    countries.value = countriesData.data;
    const defaultSelected = countries.value.filter(
      country => currentCountry.value.name === country.name
    );
    countryLoading.value = false;
    emit('selected', defaultSelected[0]);
  } else if (list === 'outbound') {
    checkCountryProps();
    const countriesData = await mixins.$quickSendApi.getOutBoundCountries('/');
    const ng = {
      name: 'Nigeria',
      flag_url: `${mixins.$config.flagsUrl}/nigeria_flag.png`,
      country_code: 'NG',
      code: '+234',
      abbreviation: 'NG',
      currency_symbol: 'NGN',
      currency: 'Naira',
    };
    const ke = {
      name: 'Kenya',
      flag_url: `${mixins.$config.flagsUrl}/kenya_flag.png`,
      country_code: 'KE',
      code: '+254',
      abbreviation: 'KE',
      currency_symbol: 'KSH',
      currency: 'Kenyan Shilling',
    };
    countries.value = countriesData.data;
    countries.value.unshift(ng);
    countries.value.unshift(ke);
    const defaultSelected = countries.value.filter(
      country => currentCountry.value.name === country.name
    );
    countryLoading.value = false;
    emit('selected', defaultSelected[0]);
  } else if (list === 'default') {
    checkCountryProps();
    countries.value = supportedCountries;
    countryLoading.value = false;
    if (!selectFirst.value) {
      emit('selected', defaultCountry.value);
    }
  } else if (list === 'custom') {
    checkCountryProps();
    countries.value = [
      {
        name: 'Nigeria',
        flag_url: `${mixins.$config.flagsUrl}/nigeria_flag.png`,
        country_code: 'NG',
        dialing_code: '+234',
      },
      {
        name: 'Ghana',
        flag_url: `${mixins.$config.flagsUrl}/ghana_flag.png`,
        country_code: 'GH',
        dialing_code: '+233',
      },
      {
        name: 'Kenya',
        flag_url: `${mixins.$config.flagsUrl}/kenya_flag.png`,
        country_code: 'KE',
        dialing_code: '+254',
      },
    ];
    countryLoading.value = false;
  } else if (list === 'wallet') {
    const walletCountries = await mixins.getUserWalletsCountries();
    countries.value = supportedCountries.filter(country =>
      walletCountries.includes(country.name)
    );
    if (Object.keys(currentCountry.value).length === 0) {
      defaultCountry.value = countries.value[0];
    } else {
      checkCountryProps();
    }
    walletBalance.value = '0.00';
    await selectedCountry(defaultCountry.value);
  } else {
    checkCountryProps();
    countryLoading.value = false;
  }
};

const checkCountryProps = () => {
  if (typeof currentCountry.value === 'function') {
    defaultCountry.value = currentCountry.value();
  } else {
    defaultCountry.value = currentCountry.value;
  }
};

const selectedCountry = async country => {
  defaultCountry.value = country;
  if (walletBalance.value) {
    walletBalance.value = await mixins.getWalletBalance(country.name);
  }
  countryLoading.value = false;
  emit('selected', country);
};

watch(
  () => countryList.value,
  newVal => {
    list = newVal;
    setCountries();
  },
  { deep: true }
);

watch(
  () => currentCountry.value,
  newVal => {
    defaultCountry.value = newVal;
  },
  { deep: true }
);

onMounted(() => {
  setCountries();
});
</script>
