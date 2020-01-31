<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="tabs">
        <span
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :class="['tab', 'tab-' + index, {active: tab.active}]"
          @click="toggle(tabs[index])"
        >
          {{ tab.label }}
        </span>
      </div>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <transition name="fade" mode="out-in">
          <div v-if="state === 'form'" key="input" class="body">
            <h1>Verify your asset</h1>
            <p class="pb-2">
              To start verification, you can fill first three fields than fill other by clicking <strong>Fill data</strong> button, which retrive the data from the blockchain. You can either manually enter all the fields. When done, click <strong>Verify asset</strong>.
              <n-link to="/about">
                Learn more
              </n-link>
            </p>
            <form class="form mt-1" @submit.prevent="passes(verifyAsset)">
              <div class="form-group">
                <select v-model="formData.network" name="network" class="form-field select">
                  <option
                    v-for="network in networks"
                    :key="network.id"
                    :value="network.id"
                    v-text="network.label"
                  />
                </select>
                <label for="metadata" v-text="'Select network'" />
              </div>
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
                  placeholder="Enter asset ID"
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
                  placeholder="Enter ledger ID"
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
                      placeholder="Enter asset schema"
                    />
                  </resizable-textarea>
                  <label for="schema" v-text="'Enter asset schema'" />
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
                      placeholder="Enter asset evidence"
                    />
                  </resizable-textarea>
                  <label for="evidence" v-text="'Enter asset evidence'" />
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
                  <label for="metadata" v-text="'Enter asset metadata'" />
                </div>
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <button class="button mt-2" @click="getAssetInfo()">
                Fill data
              </button>
              <button type="submit" :disabled="invalid" class="button mt-2">
                Verify Asset
              </button>
            </form>
          </div>
          <div v-if="state === 'loading'" key="loading" class="loading">
            <img src="~/assets/loader.svg" alt="Loader" class="mb-2">
            Verifying asset ...
          </div>
          <div v-if="state === 'loading-asset'" key="loading-asset" class="loading">
            <img src="~/assets/loader.svg" alt="Loader" class="mb-2">
            Loading asset data ...
          </div>
          <div v-if="state === 'results'" key="results" class="results">
            <results :data="formData" />
            <a class="button mt-2" @click="resetForm()">
              Verify Another Asset
            </a>
          </div>
          <div v-if="state === 'embed'" key="embed" class="embed">
            <h1>Embed asset verification</h1>
            <p class="pb-2">
              Here you can embed your asset verification to your website or generate unique QR code for download and print. With embeded widget or QR code anyone can verify that your asset is valid.
            </p>
            <div class="form-group">
              <select v-model="formData.network" name="network" class="form-field select">
                <option
                  v-for="network in networks"
                  :key="network.id"
                  :value="network.id"
                  v-text="network.label"
                />
              </select>
              <label for="metadata" v-text="'Select network'" />
            </div>
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
                placeholder="Enter asset ID"
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
                placeholder="Enter ledger ID"
              >
              <label for="email" v-text="'Enter ledger ID'" />
              <div class="alert" v-text="errors[0]" />
            </validation-provider>
            <button
              class="button mt-1"
              :disabled="invalid"
              @click="generateQRCode()"
            >
              Generate QR code
            </button>
            <button
              class="button mt-1"
              :disabled="invalid"
              @click="generateURL()"
            >
              Generate URL
            </button>
            <div v-if="url" class="url mt-2">
              <label v-text="'URL'" />
              <div class="field">
                <img
                  class="icon copy"
                  src="~/assets/copy.svg"
                  alt="Copy to clipboard"
                  @click="copyToClipboard(url)"
                >
                <p v-text="url" />
              </div>
            </div>
            <div class="qr-code">
              <canvas ref="canvas" class="canvas" />
              <img
                ref="image"
                src=""
                class="code"
                @error="regenerateQrCode()"
              >
              <button
                v-if="qrCodeGenerated"
                class="button"
                @click="downloadQRCode()"
              >
                Download QR code
              </button>
            </div>
          </div>
        </transition>
      </ValidationObserver>
      <notice />
    </div>
    <Footer />
  </div>
</template>

<script>
import { HttpProvider as EthereumHttpProvider } from '@0xcert/ethereum-http-provider'
// import { BitskiProvider } from '@0xcert/ethereum-bitski-frontend-provider'
import { AssetLedger as EthereumAssetLedger } from '@0xcert/ethereum-asset-ledger'
import { HttpProvider as WanchainHttpProvider } from '@0xcert/wanchain-http-provider'
import { AssetLedger as WanchainAssetLedger } from '@0xcert/wanchain-asset-ledger'
import QrCodeWithLogo from 'qrcode-with-logos'
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
      qrCodeGenerated: false,
      tabs: [
        {
          label: 'verify',
          active: true,
          state: 'form'
        },
        {
          label: 'embed',
          active: false,
          state: 'embed'
        }
      ],
      formData: {
        assetId: this.$route.query.assetId || '',
        assetLedgerId: this.$route.query.ledgerId || '',
        schema: this.$route.query.schema || '',
        evidence: this.$route.query.evidence || '',
        metadata: this.$route.query.metadata || '',
        network: Number(this.$route.query.network) || 1,
        isValid: false
      },
      state: 'form',
      networks: [
        {
          id: 1,
          label: 'Ethereum - Mainnet',
          url: '//mainnet.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4'
        },
        {
          id: 2,
          label: 'Ethereum - Rinkeby',
          url: '//rinkeby.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4'
        },
        {
          id: 3,
          label: 'Ethereum - Ropsten',
          url: '//ropsten.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4'
        },
        {
          id: 4,
          label: 'Ethereum - Kovan',
          url: '//kovan.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4'
        },
        {
          id: 5,
          label: 'Ethereum - Goerli',
          url: '//goerli.infura.io/v3/a491d5932d4d47b58f4ba2e043278ac4'
        },
        {
          id: 6,
          label: 'Wanchain - Mainnet',
          url: '//gwan-ssl.wandevs.org:56891'
        },
        {
          id: 7,
          label: 'Wanchain - Testnet',
          url: '//gwan-ssl.wandevs.org:46891/'
        }
      ],
      qrcode: null,
      url: ''
    }
  },
  computed: {
    currentNetwork () {
      return this.networks.find(x => x.id === this.formData.network)
    },
    assetLedger () {
      let httpProvider
      switch (this.formData.network) {
        case 1:
          httpProvider = new EthereumHttpProvider({ url: this.currentNetwork.url })
          return new EthereumAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 2:
          httpProvider = new EthereumHttpProvider({
            url: this.currentNetwork.url
          })
          // httpProvider = new BitskiProvider({
          //   network: 'rinkeby'
          // })
          return new EthereumAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 3:
          httpProvider = new EthereumHttpProvider({ url: this.currentNetwork.url })
          return new EthereumAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 4:
          httpProvider = new EthereumHttpProvider({ url: this.currentNetwork.url })
          return new EthereumAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 5:
          httpProvider = new EthereumHttpProvider({ url: this.currentNetwork.url })
          return new EthereumAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 6:
          httpProvider = new WanchainHttpProvider({ url: this.currentNetwork.url })
          return new WanchainAssetLedger(httpProvider, this.formData.assetLedgerId)
        case 7:
          httpProvider = new WanchainHttpProvider({ url: this.currentNetwork.url })
          return new WanchainAssetLedger(httpProvider, this.formData.assetLedgerId)
        default:
          throw new Error('Invalid network ID')
      }
    }
  },
  async mounted () {
    const params = this.$route.query
    if (this.formData.assetId && this.formData.assetLedgerId && this.formData.network) {
      await this.getAssetInfo()
    }
    if (Object.keys(params).length > 0 && params.constructor === Object) {
      const isFormValid = await this.$refs.observer.validate()
      if (!isFormValid) { return }
      this.verifyAsset()
    }
  },
  methods: {
    toggle (tab) {
      for (const item of this.tabs) {
        item.active = false
      }
      tab.active = true
      this.state = tab.state
    },
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
    async getAssetInfo () {
      try {
        const asset = await this.assetLedger.getAsset(this.formData.assetId)
        if (asset.uri) {
          const result = await this.$axios.get(asset.uri)
          this.formData.metadata = JSON.stringify(result.data)
          this.formData.schema = JSON.stringify((await this.$axios.get(result.data.$schema)).data)
          this.formData.evidence = JSON.stringify((await this.$axios.get(result.data.$evidence)).data)
        }
      } catch {
        this.$toast.error('Error fetching asset information.')
      }
    },
    async verifyAsset () {
      this.state = 'loading'
      await this.calculate(this.formData)
      window.scrollTo(0, 0)
      this.state = 'results'
    },
    generateURL () {
      this.url = `https://verify.0xcert.org?assetId=${this.formData.assetId}&ledgerId=${this.formData.assetLedgerId}&network=${this.formData.network}`
    },
    copyToClipboard (text) {
      this.$toast.success('Coppied to clipboard.')
      navigator.clipboard.writeText(text)
    },
    async generateQRCode () {
      this.qrcode = new QrCodeWithLogo({
        canvas: this.$refs.canvas,
        content: `https://verify.0xcert.org?assetId=${this.formData.assetId}&ledgerId=${this.formData.assetLedgerId}&network=${this.formData.network}`,
        width: 380,
        image: this.$refs.image,
        logo: {
          src: 'https://verify.0xcert.org/images/0xcert-logo-ico.svg',
          borderRadius: 0,
          logoSize: 0.15,
          borderSize: 0.03
        }
      })
      await this.qrcode.toImage()
      this.qrCodeGenerated = true
    },
    async downloadQRCode () {
      if (this.qrcode) {
        await this.qrcode.downloadImage(this.formData.assetId)
      }
    },
    async regenerateQrCode (event) {
      if (this.qrCodeGenerated) {
        await this.generateQRCode()
      }
    },
    resetForm () {
      this.state = 'form'
      this.formData = {}
      this.formData.network = 1
      this.$router.replace('/')
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

.canvas {
  position: absolute;
}

.qr-code {
  margin-top: 1rem;
  text-align: center;

  .code {
    display: block;
    margin: 0 auto;
  }
}
.url {

  label {
    font-weight: bold;
  }
}

.field {
  margin-top: 2px;
  background-color: #ECEFF1;
  border-radius: 4px;
  padding: 10px 30px 10px 10px;
  position: relative;

  p {
    margin-top: 5px;
  }
}

.copy {
  height: 15px;
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -7px;
}
</style>
