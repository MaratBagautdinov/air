<template>
  <div class="w-full py-[40px]">
    <ul class="flex items-center gap-[30px]">
      <li class="w-[260px] flex flex-col gap-[10px]" v-for="i in [1,2]">
        <div class="w-full shimmer h-[100px]" v-for="i in (isBackLine ? [1,2] : [1])"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const {isBackLine} = storeToRefs(useStore());
</script>