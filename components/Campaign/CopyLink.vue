<template>
    <p class="text-gray-400 text-sm mb-2">Campaign Link</p>
    <div class="flex justify-between  w-full gap-x-2 mb-2">
        <!-- Input for link -->
        <div class="flex-1">
            <el-input disabled id="copyUrlField" placeholder="Eg. 0553904533" v-model="campaignUrl" clearable></el-input>
        </div>
        <div>
            <button @click="copyToClipboard()" type="button"
                class="flex-1 secondary-custom-bg-color px-4 flex flex-row py-3 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                <Icon name="clarity:copy-to-clipboard-line" size="25" />
                <p class="font-medium">Copy</p>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'

const props = defineProps<{
    campaignLink: string
}>()

function copyToClipboard() {
    console.log('copyin ....')
    const inputElement = document.getElementById('copyUrlField') as HTMLInputElement;
    if (inputElement) {
        inputElement.select();
        navigator.clipboard.writeText(inputElement.value)
            .then(() => {
                console.log(`Text copied to clipboard: ${inputElement.value}`);
                console.log(`Text copied to clipboard: ${campaignUrl}`);
                ElMessage({
                    message: 'Campaign link copied successfully',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.error(`Failed to copy text: ${error}`);
            });
    }
}


  // campaign url
  const campaignUrl = ref(
    `https://pay.brij.money/campaign/${props.campaignLink}`
  );

</script>
<style>

</style>