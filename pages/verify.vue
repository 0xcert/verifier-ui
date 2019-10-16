<template>
  <div class="container">
    <div class="main box">
      <Header />
      <transition name="fade" mode="out-in">
        <div v-if="!submitted" key="input" class="body">
          <h1>Verify your asset</h1>
          <p>Fill in the fields and validate your asset. With no blockchain knowledge needed and in a completely decentralized way.</p>
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <form class="form mt-1" @submit.prevent="passes(verifyAsset)">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Assed ID"
                :class="'form-group'"
              >
                <input
                  v-model="formData.assetId"
                  type="text"
                  class="form-field"
                  placeholder="Enter asset ID."
                >
                <label for="email" v-text="'Enter asset ID'" />
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Ledger ID"
                :class="'form-group'"
              >
                <input
                  v-model="formData.assetLedgerId"
                  type="text"
                  class="form-field"
                  placeholder="Enter ledger ID."
                >
                <label for="email" v-text="'Enter ledger ID'" />
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Schema"
                :class="'form-group'"
              >
                <div class="max-height">
                  <resizable-textarea>
                    <textarea
                      v-model="formData.schema"
                      type="text"
                      rows="1"
                      class="form-field code"
                      placeholder="Enter asset schema."
                    />
                  </resizable-textarea>
                  <label for="schema" v-text="'Enter asset schema.'" />
                </div>
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Evidence"
                :class="'form-group'"
              >
                <div class="max-height">
                  <resizable-textarea>
                    <textarea
                      v-model="formData.evidence"
                      type="text"
                      rows="1"
                      class="form-field code"
                      placeholder="Enter a asset evidence"
                    />
                  </resizable-textarea>
                  <label for="evidence" v-text="'Enter a asset evidence'" />
                </div>
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Metadata"
                :class="'form-group'"
              >
                <div class="max-height">
                  <resizable-textarea>
                    <textarea
                      v-model="formData.metadata"
                      type="text"
                      rows="1"
                      class="form-field code"
                      placeholder="Enter asset Metadata"
                    />
                  </resizable-textarea>
                  <label for="metadata" v-text="'Enter asset Metadata'" />
                </div>
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <div class="form-group">
                <select v-model="formData.network" name="network" class="form-field select">
                  <option :value="1" v-text="'Ethereum - Mainnet'" />
                  <option :value="2" v-text="'Ethereum - Rinkeby'" />
                  <option :value="3" v-text="'Ethereum - Ropsten'" />
                  <option :value="4" v-text="'Wanchain - Mainnet'" />
                  <option :value="5" v-text="'Wanchain - Testnet'" />
                </select>
                <label for="metadata" v-text="'Select network'" />
              </div>
              <button type="submit" class="button mt-2">
                Verify Asset
              </button>
            </form>
          </ValidationObserver>
        </div>
        <div v-else-if="loading" key="loading" class="loading">
          <img src="~/assets/loader.svg" alt="Loader" class="mb-2">
          Verifying asset ...
        </div>
        <div v-else key="results" class="results">
          <results :data="formData" />
          <a class="button-text" @click="resetForm()">
            Verify Another Asset
          </a>
        </div>
      </transition>
      <notice />
    </div>
    <Footer />
  </div>
</template>

<script>
import { HttpProvider as EthereumHttpProvider } from '@0xcert/ethereum-http-provider'
import { HttpProvider as WanchainHttpProvider } from '@0xcert/wanchain-http-provider'
import { AssetLedger as EthereumAssetLedger } from '@0xcert/ethereum-asset-ledger'
import { AssetLedger as WanchainAssetLedger } from '@0xcert/wanchain-asset-ledger'
import { Cert } from '@0xcert/cert'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Notice from '~/components/Notice'
import ResizableTextarea from '~/components/ResizableTextarea'
import Results from '~/components/Results'

extend('required', required)
extend('email', email)
localize({ en })
extend('json', {
  message: 'The {_field_} filed is not a valid JSON.',
  validate: (value) => {
    try {
      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
  }
})

export default {
  components: {
    Notice,
    Header,
    Footer,
    Results,
    ResizableTextarea,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      formData: {
        assetId: this.$route.query.assetId || '',
        assetLedgerId: this.$route.query.assetLedgerId || '',
        schema: this.$route.query.schema || '{}',
        evidence: this.$route.query.evidence || '{}',
        metadata: this.$route.query.metadata || '{}',
        network: this.$route.query.network || 3,
        isValid: false
      },
      submitted: false,
      loading: false
    }
  },
  computed: {
    httpProvider () {
      switch (this.formData.network) {
        case 1: // ethereum mainnet
          return new EthereumHttpProvider({ url: 'https://mainnet.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4' })
        case 2: // ethereum rinkeby
          return new EthereumHttpProvider({ url: 'https://rinkeby.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4' })
        case 3: // ethereum ropsten
          return new EthereumHttpProvider({ url: 'https://ropsten.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4' })
        case 4: // wanchain mainnet
          return new WanchainHttpProvider({ url: '' })
        case 5: // wanchain testnet
          return new WanchainHttpProvider({ url: 'http://139.59.44.13:9000/node/5c9a341860626f3d2aad1dc0' })
        default:
          throw new Error('Invalid network ID [1]')
      }
    },
    assetLedger () {
      switch (this.formData.network) {
        case 1: // ethereum mainnet
        case 2: // ethereum rinkeby
        case 3: // ethereum ropsten
          return new EthereumAssetLedger(this.httpProvider, this.formData.assetLedgerId)
        case 4: // wanchain mainnet
        case 5: // wanchain testnet
          return new WanchainAssetLedger(this.httpProvider, this.formData.assetLedgerId)
        default:
          throw new Error('Invalid network ID [2]')
      }
    }
  },
  async mounted () {
    const params = this.$route.query
    if (Object.keys(params).length > 0 && params.constructor === Object) {
      const isFormValid = await this.$refs.observer.validate()
      if (!isFormValid) { return }
      this.verifyAsset()
    }
  },
  methods: {
    async calculate (data) {
      try {
        const schema = JSON.parse(data.schema || {})
        const evidence = JSON.parse(data.evidence || {})
        const metadata = JSON.parse(data.metadata || {})
        const info = await this.assetLedger.getInfo()
        const asset = await this.assetLedger.getAsset(data.assetId)
        const cert = new Cert({ schema })
        const schemaId = await cert.identify()
        if (schemaId !== info.schemaId) {
          throw new Error('The provided schema is differet from ledger.')
        }
        const imprint = await cert.calculate(metadata, evidence)
        if (imprint !== asset.imprint) {
          throw new Error('Imprint does not match.')
        }
        this.formData.isValid = true
      } catch (error) {
        this.formData.isValid = false
      }
    },
    async verifyAsset () {
      this.loading = true
      this.submitted = true
      await this.calculate(this.formData)
      window.scrollTo(0, 0)
      this.loading = false
    },
    resetForm () {
      this.submitted = false
      this.loading = false
      this.formData = {}
      this.formData.network = 3
      this.$router.replace('/verify')
    }
  }
}
</script>

<style lang="scss">
@import '~assets/_forms.scss';

.loading {
  min-height: 462px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>
