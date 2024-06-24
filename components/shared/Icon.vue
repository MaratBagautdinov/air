<template>
  <InlineSvg
    :src="import.meta.glob(`@/public/assets/svg/${name}.svg`)"
    class="fill-current"
  />
</template>

<script>
  import InlineSvg from "vue-inline-svg";

  export default {
    components: { InlineSvg },
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  };
</script>