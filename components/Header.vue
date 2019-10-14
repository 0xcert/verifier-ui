<template>
  <div class="header">
    <div class="logo">
      <img src="/images/0xcert-verify.svg" alt="0xcert verify">
    </div>
    <div class="powered">
      <img src="/images/poweredby.svg" alt="Powered by 0xcert Framework">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.powered {
  display: none;
}

@media only screen and (min-device-width: 768px) {
  .powered {
    display: block;
  }
}
</style>
