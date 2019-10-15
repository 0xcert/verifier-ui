<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <h1>Verify and trust</h1>
        <p>Check and confirm the validity of unique assets on the blockchain. Make sure the assets you own or you’re about to purchase live up to their name.</p>
        <ul>
          <li>Check validity</li>
          <li>Verify ownership and provenance</li>
          <li>Inspect content and metadata.</li>
        </ul>
        <div class="flex">
          <p>The 0xcert Verifier provides verification for assets on both Ethereum and Wanchain blockchain networks. The 0xcert Verifier is powered by the 0xcert Framework and the enhanced non-fungible token Xcert.</p>
          <img width="95" height="54" src="/images/0xcert-verified.png" alt="0xcert verified">
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
