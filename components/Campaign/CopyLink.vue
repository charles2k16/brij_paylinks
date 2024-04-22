<template>


    <div class="flex gap-2">
        <MazInput disabled id="copyUrlField" class="w-full" key="lg" color="warning" v-model="campaignUrl"
            placeholder="200" size="md" />
        <MazBtn @click="copy(source)" size="sm" color="warning">
            <Icon name="clarity:copy-to-clipboard-line" size="25" />
            Copy
        </MazBtn>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
    campaignLink: string
}>()

// campaign url
const campaignUrl = ref(
    `https://pay.brij.money/campaign/${props.campaignLink}`
);


const source = ref(campaignUrl.value)
const { text, copy, copied } = useClipboard({ source })

// watch if contact is copied
watch(copied, (newValue) => {
    if (newValue === true) {
        ElMessage({
            message: 'Campaign url copied successfully',
            type: 'success',
        })
    }
});


</script>
<style></style>