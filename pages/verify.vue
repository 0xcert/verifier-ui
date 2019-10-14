<template>
  <div class="container">
    <div class="main box">
      <Header />
      <transition name="fade" mode="out-in">
        <div v-if="!submitted" key="input" class="body">
          <h1>Verify your asset</h1>
          <p>Fill the fields and validate an asset online, completely decentralized. </p>
          <ValidationObserver v-slot="{ passes }">
            <form class="form mt-1" @submit.prevent="passes(verifyAsset)">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="DID"
                :class="'form-group'"
              >
                <input
                  v-model="data.did"
                  type="text"
                  class="form-field"
                  placeholder="Enter a valid DID."
                >
                <label for="email" v-text="'Enter a valid DID'" />
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Schema"
                :class="'form-group'"
              >
                <resizable-textarea>
                  <textarea
                    v-model="data.schema"
                    type="text"
                    rows="1"
                    class="form-field code"
                    placeholder="Enter a valid asset schema."
                  />
                </resizable-textarea>
                <label for="schema" v-text="'Enter a valid asset schema.'" />
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Evidence"
                :class="'form-group'"
              >
                <resizable-textarea>
                  <textarea
                    v-model="data.evidence"
                    type="text"
                    rows="1"
                    class="form-field code"
                    placeholder="Enter a valid asset evidence"
                  />
                </resizable-textarea>
                <label for="evidence" v-text="'Enter a valid asset evidence'" />
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required|json"
                name="Metadata"
                :class="'form-group'"
              >
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
                <div class="alert" v-text="errors[0]" />
              </validation-provider>
              <div class="form-group">
                <select v-model="network" name="network" class="form-field select">
                  <option :value="1">
                    Mainnet
                  </option>
                  <option :value="2">
                    Rinkeby
                  </option>
                  <option :value="3">
                    Ropsten
                  </option>
                </select>
                <label for="metadata" v-text="'Select network'" />
              </div>
              <button type="submit" class="button mt-2">
                Verify Asset
              </button>
            </form>
          </ValidationObserver>
        </div>
        <div v-if="loading" key="loading" class="loading">
          Loading ...
        </div>
        <div v-else key="results" class="results">
          <results :data="data" />
          <button class="button" @click="resetForm()">
            Verify Another Asset
          </button>
        </div>
      </transition>
      <notice />
    </div>
    <Footer />
  </div>
</template>

<script>
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
      data: {},
      network: 1,
      submitted: false,
      loading: false
    }
  },
  methods: {
    verifyAsset () {
      this.loading = true
      this.submitted = true
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
  justify-content: center;
  align-items: center;
}
</style>
