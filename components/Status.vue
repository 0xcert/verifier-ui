<template>
  <div class="status" v-if="valid" >
    <img src="/images/valid.svg" alt="">
      Valid
  </div>
  <div class="status" v-else>
    <img src="/images/invalid.svg" alt="">
      Not valid
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
