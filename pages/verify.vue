<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
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
            <button type="submit" class="button mt-2">
              Verify Asset
            </button>
          </form>
        </ValidationObserver>
      </div>
      <Notice />
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
    ResizableTextarea,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      data: {}
    }
  },
  methods: {
    verifyAsset () {
      this.$router.push('/isvalid/data')
    }
  }
}
</script>

<style lang="scss">
@import '~assets/_forms.scss';
</style>
