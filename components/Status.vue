<template>
  <div class="status">
    <img v-if="icon === 'valid'" src="/images/valid.svg" alt="Valid">
    <img v-if="icon === 'invalid'" src="/images/invalid.svg" alt="Invalid">
    <img v-if="icon === 'warning'" src="/images/warning.svg" alt="Unknown">
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
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
