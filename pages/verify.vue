<template>
  <div class="container">
    <div class="main box">
      <Header />
      <transition name="fade" mode="out-in">
        <div v-if="!submitted" key="input" class="body">
          <h1>Verify your asset</h1>
          <p>Fill in the fields and validate your asset. With no blockchain knowledge needed and in a completely decentralized way.</p>
          <ValidationObserver v-slot="{ passes }">
            <form class="form mt-1" @submit.prevent="passes(verifyAsset)">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Assed ID"
                :class="'form-group'"
              >
                <input
                  v-model="data.assetId"
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
                  v-model="data.assetLedgerId"
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
                      v-model="data.schema"
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
                      v-model="data.evidence"
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
                      v-model="data.metadata"
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
                <select v-model="network" name="network" class="form-field select">
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
          <results :data="data" />
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
      data: {
        assetId: '1',
        assetLedgerId: '0xeb4dddeababc29a03c7731bbca04099b66ca63f8',
        schema: '{"type":"object","properties":{"books":{"type":"array","items":{"type":"object","properties":{"note":{"type":"string"},"title":{"type":"string"}}}},"email":{"type":"integer"},"event":{"type":"object","properties":{"organizer":{"type":"object","properties":{"email":{"type":"string"},"name":{"type":"string"}}},"title":{"type":"string"}}},"name":{"type":"string"},"tags":{"type":"array","items":{"type":"string"}}}}',
        evidence: '{"$schema":"https://conventions.0xcert.org/87-asset-evidence-schema.json","data":[{"path":[],"nodes":[{"index":0,"hash":"048c8f3384d5600792a4c8279d2c933fa43c26b81f2cab63462b72dd7488baad"},{"index":1,"hash":"1fba16a89b1b3db0b386153879172947f611d8218c7ac1d5ccf076cdbbf10048"},{"index":2,"hash":"75d267b7e8c97cf872a5470ce7cd6ad0bd58dd8b93f01a6419d3864c79210dcd"},{"index":3,"hash":"78dbcc37c29dc20ba67f95e716ba983696fe82328c39ff0aa3d3aca1ec28a946"},{"index":4,"hash":"5a05b47bdbe78e03118fed48d332a97099303f2ae6c9faab7651fcde142549ca"},{"index":5,"hash":"c55bf29bdc98704b2fa7003fca49e290b2c87e2f8c268dcec7a3eb3a0832bcbd"},{"index":6,"hash":"680bddde558d04defa8fa5817e96eb7f47e4f07a17d6b3bda1a78c58ea05ded8"},{"index":7,"hash":"33fd0c47dda49e229f2ca37c40e780e842f3abf4db9c68d9d5c62ec32e2c149a"},{"index":8,"hash":"283e38811185f219e37064989f7ba3ab7191c58eafe8dea39688a7372931d76d"},{"index":9,"hash":"39aba70a5d3462793d229c44379ad0dffbe9ddf37b517efbef7f5c26f2ef0d71"},{"index":10,"hash":"c81d40dbeed369f1476086cf882dd36bf1c3dc35e07006f0bec588b983055487"}],"values":[{"index":0,"value":"2a285bc4360ec118d26920d3d35f00a01bd07772425911eb7202061797f1a8d9","nonce":"5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"},{"index":1,"value":"A","nonce":"6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},{"index":2,"value":"9b079860f537c3300225f312a865f209cf410a7489b140f1eec2f9da9bd88ff2","nonce":"d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35"},{"index":3,"value":"B","nonce":"4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce"},{"index":4,"value":"424c29d28b8657a27d2904cafc9758b7bc1f860fd19f4df08389e7dcf124f9f8","nonce":"4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"}]},{"path":["books"],"nodes":[{"index":0,"hash":"2a285bc4360ec118d26920d3d35f00a01bd07772425911eb7202061797f1a8d9"},{"index":1,"hash":"57db7b50d66063a0ce4268afcb04f31e784e167147cbff5e7880b96dd1d7d5fc"},{"index":2,"hash":"9072b93ea0db4a8cbfde49f9e05d080f64d31ef090b23ea2075dcce1f0beacf1"},{"index":3,"hash":"aecc1eb57f758ffa468f3f7e3b94484631282d911763cfe69ac858def7bf5616"},{"index":4,"hash":"5651e5ec586dd4e9084e878703c0f3a95a6f5e44cf02c3a0060e50bd33605cb5"}],"values":[{"index":0,"value":"d6abab7a34f79d32c758384226784dced1f9f1e534c61b564985d5099f480124","nonce":"65c37f8cfaf9775bc2ed2a9ddd01b80d5bb18b8510aa31da54994e0b4cd4bd87"},{"index":1,"value":"a5de64cdfd1dac0424ccea66b7b204466b052ee08642524f302c0a5c87c2fdc3","nonce":"5873196876cf1b107595e6a76eab1aeefd04a4668b60fb7a4a8f6083588e9a71"}]},{"path":["books",0],"nodes":[{"index":0,"hash":"d6abab7a34f79d32c758384226784dced1f9f1e534c61b564985d5099f480124"},{"index":1,"hash":"1dc26d90ffaf782463c373bcd754b5ab6ea083cfe88528f81ce28eae05ce3648"},{"index":2,"hash":"986926395fdcba23e7bb309844d3cb597a0230f35feb420cca9bd712380c4aa1"},{"index":3,"hash":"1bc26c5dd0333f76c39a65136977650e4695acf4d6f3e4098a554166d64a0f38"},{"index":4,"hash":"b20ebf6f279943435af691c1bacb0a324b3f749b0f8c8be54085f6239779da3f"}],"values":[{"index":0,"value":"A0","nonce":"81332cd731081dc2be80085e2957e57baa59d9cad61b898a730bee20590a36c3"},{"index":1,"value":"B0","nonce":"c2b0c4aa1c311dfa1818da8d209c5737c82865c0b4a8ab2b6f4f7b368773271b"}]},{"path":["books",1],"nodes":[{"index":0,"hash":"a5de64cdfd1dac0424ccea66b7b204466b052ee08642524f302c0a5c87c2fdc3"},{"index":1,"hash":"81a58d636160ffd9fbed847b88b30abf8c26eacce9821bedd1e218892385a6cc"},{"index":2,"hash":"70b0af4e56994399271ed928f7b6c2e66f0453c792dba792a5b9dc1342644852"},{"index":3,"hash":"1e5ab8ec8c170a4f3149281ae8bdee7f46d45eefbc231f1c353c6117a63cfb62"},{"index":4,"hash":"c2c4f0f829f4ba5b41d178f414b19a4f899cd15f977ca9c70cee5a93eb484ef5"}],"values":[{"index":0,"value":"A1","nonce":"7cd03296656117a708ea3ec4670487281b656884b280a59abc96fc55777b7e76"},{"index":1,"value":"B1","nonce":"c98a8b779e867e7804aa24c74bb7d89b862ed8ecf2698ad3b732e1a4c4a056ea"}]},{"path":["event"],"nodes":[{"index":0,"hash":"9b079860f537c3300225f312a865f209cf410a7489b140f1eec2f9da9bd88ff2"},{"index":1,"hash":"c289a98b2f73710c6846a908b1e2dafc84351de902510497e6b696d763e1a043"},{"index":2,"hash":"732576d3f7e924a0b5c6ac17d10e5fb036d448e9871f2d38bfb2e8cffd5cd71b"},{"index":3,"hash":"b809cb441aa72b3079ab14f9798575518a79fe6428420ae6e39fc71e55bc7d2f"},{"index":4,"hash":"05bdae17239d6772f0a206068505f0a9d4ea56db31668aed055136912a6de0f2"}],"values":[{"index":0,"value":"e41ddc3a726700cacec02298841db28af75d0671969a565b72de12d12d0e2736","nonce":"293ff6ac108e226a78170251c8be9e83073894e5ba2861c598fb5ea93793cf3f"},{"index":1,"value":"A","nonce":"773e265874120170921b17e39250d568228dcc5bcde5fd5237c86783fa0f9cf9"}]},{"path":["event","organizer"],"nodes":[{"index":0,"hash":"e41ddc3a726700cacec02298841db28af75d0671969a565b72de12d12d0e2736"},{"index":1,"hash":"65fe2f8b7b6304deec8828c78f9f0164d947a64b093cffb64073febcdea68660"},{"index":2,"hash":"d401ae6bc697486cff8f9d8824c236f4c23c5665907c51970eab0bd268a77ae6"},{"index":3,"hash":"7a1938cf9f10de72f858993447a7151eb6404cf9a9d00975721cdf750dcc5290"},{"index":4,"hash":"1a2feaef8a3e8cf5d0ba00ebb6f86904aab110bb8b3950c794b2547e13a6a73c"}],"values":[{"index":0,"value":"A","nonce":"8f77a41d39e72211e57f3fe4f2105a8ce02989b9486ece4f64fec61bd0dfc1b4"},{"index":1,"value":"B","nonce":"f2c6defbdfd54cae320d14d82a80cdd3edfe010ebba2308862ff3bc1aff9cda9"}]},{"path":["tags"],"nodes":[{"index":0,"hash":"424c29d28b8657a27d2904cafc9758b7bc1f860fd19f4df08389e7dcf124f9f8"},{"index":1,"hash":"4a67374c116b0e67ffdf2f578278feeb37d8ced99ca7b10077270f7ade438557"},{"index":2,"hash":"16787522ca866b1cfee580d2f2324370a582cef1ed0f67b103384eac5c18b26a"},{"index":3,"hash":"cec0f0e44536c8a4b5f87126f006cd948e72218a724ab84325a4b32644ea580b"},{"index":4,"hash":"31d1bbce9ba40dae929fa705796d1ea4e373ff56e41a6606b92efad0de25ea14"}],"values":[{"index":0,"value":1,"nonce":"1781cfa60b137d3e23a3c2db6688b0bce270318492460faa21fd7bf0d47dd9ed"},{"index":1,"value":2,"nonce":"79e816898d37875e5cb4684ff84077b09c5fb315c2d4d3c4cb1cac61ad6cbecc"}]}]}',
        metadata: '{"books":[{"note":"A0","title":"B0"},{"note":"A1","title":"B1"}],"email":"A","event":{"organizer":{"email":"A","name":"B"},"title":"A"},"name":"B","tags":[1,2]}'
      },
      network: 3,
      submitted: false,
      loading: false
    }
  },
  computed: {
    httpProvider () {
      switch (this.network) {
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
      switch (this.network) {
        case 1: // ethereum mainnet
        case 2: // ethereum rinkeby
        case 3: // ethereum ropsten
          return new EthereumAssetLedger(this.httpProvider, this.data.assetLedgerId)
        case 4: // wanchain mainnet
        case 5: // wanchain testnet
          return new WanchainAssetLedger(this.httpProvider, this.data.assetLedgerId)
        default:
          throw new Error('Invalid network ID [2]')
      }
    }
  },
  methods: {
    async calculate (data) {
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
      console.log('VALID!')
    },
    async verifyAsset () {
      this.loading = true
      this.submitted = true
      await this.calculate(this.data)
      window.scrollTo(0, 0)
      this.loading = false
    },
    resetForm () {
      this.submitted = false
      this.loading = false
      this.data = {}
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
