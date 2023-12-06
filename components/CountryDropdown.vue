<template>
  <div>
    <el-dropdown class="countryList" :disabled="disabled">
      <span
        v-if="defaultCountry"
        class="el-dropdown-link align_center mt-5 country_selector"
      >
        <img :src="defaultCountry.flag_url" alt="flag" class="mr-5" />
        <span v-if="list === 'custom'" class="cty_name">
          {{ defaultCountry.name }}
        </span>
        <span v-else class="cty_name">
          {{ defaultCountry.currency_symbol }}
          <span v-if="walletBalance"> ({{ walletBalance }})</span>
        </span>

        <el-icon-arrow-down v-if="showIcon" />
      </span>
      <span v-else class="el-dropdown-link align_center mt-5 country_selector">
        Select Country

        <el-icon-arrow-down v-if="showIcon" />
      </span>
      <template #dropdown>
        <el-dropdown-menu
          v-if="list !== 'none'"
          :class="fixedHeight ? 'auto-height' : 'all'"
        >
          <el-dropdown-item
            v-for="(country, index) in countries"
            :key="index"
            class="mt-5"
          >
            <span
              class="align_center py-5"
              style="font-size: 18px"
              @click="selectedCountry(country)"
            >
              <img
                :src="country.flag_url"
                alt="flag"
                class="mr-10"
                style="width: 24px"
              />{{ country.name }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits, toRefs } from 'vue';
import { supportedCountries } from '@/assets/data/index.js';
const emit = defineEmits(['selected']);

const props = defineProps({
  fixedHeight: {
    type: Boolean,
    default: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selectFirst: {
    type: Boolean,
    default: false,
  },
  currentCountry: {
    type: [Object, Function],
    required: false,
    default: () => ({
      name: 'Ghana',
      flag_url: 'https://api.brij.money/media/icons/flags/ghana_flag.png',
      currency_symbol: 'GHS',
    }),
  },
  countryList: {
    type: String,
    default: 'custom',
  },
});

const defaultCountry = ref({});
const countries = ref([{}]);
const list = ref('');
const countryLoading = ref(false);
const walletBalance = ref('');

list.value = props.countryList;

const { currentCountry: currentCountryRef } = toRefs(props);

const setCountries = async () => {
  if (list.value === 'default') {
    checkCountryProps();
    countries.value = supportedCountries;
    countryLoading.value = false;
    if (!props.selectFirst) {
      emit('selected', defaultCountry.value);
    }
  }
};

const checkCountryProps = () => {
  console.log('default c', typeof currentCountryRef.value);
  console.log('default refc', currentCountryRef);
  if (typeof currentCountryRef.value === 'function') {
    defaultCountry.value = currentCountryRef.value;
  } else {
    defaultCountry.value = currentCountryRef.value;
  }
};

const selectedCountry = async country => {
  defaultCountry.value = country;
  countryLoading.value = false;
  emit('selected', country);
};

onMounted(setCountries);

watch(
  () => list,
  newVal => {
    list = newVal;
    setCountries();
  },
  { deep: true }
);

watch(currentCountryRef, (newValue, oldValue) => {
  defaultCountry.value = newVal;
});

// watch(
//   () => currentCountry.value,
//   newVal => {
//     defaultCountry.value = newVal;
//   },
//   { deep: true }
// );
</script>

<style lang="scss" scoped>
.country_selector {
  border: 1.3px solid #dcdfe6;
  padding: 0 10px;
  height: 50px;
  border-radius: 4px;
  font-size: 18px;

  img {
    border-radius: 50px;
    width: 24px;
  }

  i {
    margin-left: 10px;
    font-weight: bold;
  }

  .cty_name {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
