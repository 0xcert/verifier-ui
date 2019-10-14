<template>
  <div class="body">
    <div class="flex">
      <div class="flex-grow">
        <p class="max-width">
          Proactively harness sticky deliverables via bleeding-edge bandwidth. Distinctively e-enable error-free mindshare for cross-media materials. Assertively plagiarize clicks-and-mortar outsourcing before interdependent meta-services. Continually facilitate empowered potentialities after accurate convergence. Globally transform parallel.
        </p>
      </div>
      <img src="/images/trusted.svg" alt="Trusted">
    </div>
    <pre>
    {{ data }}
    </pre>
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
        <td><status valid /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Status from '~/components/Status'

export default {
  components: {
    Status
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
