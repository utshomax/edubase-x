<template>
  <Nuxt />
</template>
<script>
export default {
  created() {
    this.$config.underMaintenance.toString() == "false"
      ? this.$router.push("/")
      : null;
  }
};
</script>
