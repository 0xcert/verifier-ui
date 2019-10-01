<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <div class="flex">
          <div class="flex-grow">
            <p class="max-width">Proactively harness sticky deliverables via bleeding-edge bandwidth. Distinctively e-enable error-free mindshare for cross-media materials. Assertively plagiarize clicks-and-mortar outsourcing before interdependent meta-services. Continually facilitate empowered potentialities after accurate convergence. Globally transform parallel.</p>
          </div>
          <img src="/images/trusted.svg" alt="Trusted">
        </div>
        <table class="table">
          <tr>
            <td>Ledger name:</td>
            <td>ISO-9001-2019</td>
          </tr>
          <tr>
            <td>Ledger symbol:</td>
            <td>SIQ</td>
          </tr>
          <tr>
            <td>Ledger address:</td>
            <td>0x4234928123740328428741</td>
          </tr>
          <tr>
            <td>Key:</td>
            <td>first_name</td>
          </tr>
          <tr>
            <td>Value:</td>
            <td>David</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td><status valid/></td>
          </tr>
        </table>
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
import Status from '~/components/Status'

export default {
  components: {
    Status,
    Notice,
    Header,
    Footer
  }
}
</script>

<style>
.main {
  max-width: 650px;
}

.box {
  padding: 2rem;
}

.body {
  color: black;
}

.max-width {
  max-width: 460px;
  flex-grow: 1;
}
</style>
