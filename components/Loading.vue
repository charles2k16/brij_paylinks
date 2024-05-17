<template>
    <div class="w-full flex flex-col items-center gap-y-3">
        <p>{{message}}</p>
        <MazLoadingBar class="mb-5" color="warning" />
    </div>
</template>
<script setup lang="ts">
//props
const props = defineProps<{
  message: string
}>()
</script>
<style lang="">

</style>