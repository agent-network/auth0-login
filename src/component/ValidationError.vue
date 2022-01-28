<template>
  <div class="error">{{ error }}</div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  margin-top: 8px;
  color: #eb5757;
}
</style>
