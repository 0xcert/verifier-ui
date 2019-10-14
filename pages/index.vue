<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <h1>Get verified</h1>
        <p>Proactively harness sticky deliverables via bleeding-edge bandwidth. Distinctively e-enable error-free mindshare for cross-media materials. Assertively plagiarize clicks-and-mortar outsourcing before interdependent meta-services.</p>
        <ul>
          <li>Continually facilitate empowered potential</li>
          <li>Identifier accurate convergence</li>
          <li>Globbaly transform parallel.</li>
        </ul>
        <div class="flex">
          <p>Proactively harness sticky deliverables via bleeding-edge bandwidth. Distinctively e-enable error-free mindshare for cross-media materials. Identifier accurate convergence</p>
          <img width="95" height="54" src="/images/0xcert-verified.png" alt="0xcert verified">
        </div>
        <div class="cta">
          <n-link
            to="/verify"
            class="button"
          >
            Start verifying
          </n-link>
        </div>
      </div>
      <Notice />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Notice from '~/components/Notice'

export default {
  components: {
    Notice,
    Header,
    Footer
  }
}
</script>

<style>
.cta {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
</style>
