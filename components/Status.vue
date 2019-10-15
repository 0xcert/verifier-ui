<template>
  <div v-if="valid" class="status">
    <img src="/images/valid.svg" alt="">
  </div>
  <div v-else class="status">
    <img src="/images/invalid.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    valid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="css" scoped>
.status {
  display: flex;
  font-weight: bold;
}

.status img {
  margin-right: .5rem;
}
</style>
