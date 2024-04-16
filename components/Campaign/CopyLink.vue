<template>


    <div class="flex gap-2">
        <MazInput disabled id="copyUrlField" class="w-full" key="lg" color="warning"
            v-model="campaignUrl" placeholder="200" size="md" />

        <MazBtn @click="copyToClipboard()" size="sm" color="warning" >
            <Icon name="clarity:copy-to-clipboard-line" size="25" />
            Copy
        </MazBtn>
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
<style></style>