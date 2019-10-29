<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <h1>About Verifier</h1>
        <p>Check whether the blockchain-based assets that you own or you're about to purchase live up to their name. With just a few clicks, you can:</p>
        <ul>
          <li>Check asset <strong>validity</strong></li>
          <li>Verify asset <strong>ownership</strong></li>
          <li><strong>Inspect</strong> asset content and metadata</li>
        </ul>
        <div class="flex">
          <p>It provides verification for assets on <strong>Ethereum</strong> blockchain network. The 0xcert Verifier is powered by the 0xcert Framework and the enhanced non-fungible token Xcert.</p>
          <img width="95" height="54" src="/verifier/images/0xcert-verified.png" alt="0xcert verified">
        </div>
        <n-link
          to="/verify"
          class="button mt-2"
        >
          Start verifying
        </n-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import Header from '~/components/Header'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
