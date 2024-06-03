<template>
    <div class="w-full flex flex-col items-center gap-y-3">
        <Icon class="text-amber-400 text-4xl" name="line-md:loading-alt-loop"/>
        <h3 class="">{{message}}</h3>

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