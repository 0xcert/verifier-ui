<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <h1>Validate your asset</h1>
        <p>Fill the fields and validate an asset online, completely decentralized. </p>
        <ValidationObserver v-slot="{ passes }" >
          <form @submit.prevent="passes(verifyAsset)" class="'form mt-1'">
            <validation-provider 
              rules="required" 
              v-slot="{ errors }" 
              name="DID"
              :class="'form-group'"
            >
              <input
                type="text"
                v-model="data.did"
                class="form-field"
                placeholder="Enter a valid DID."
              >
              <label for="email" v-text="'Enter a valid DID'" />
              <div class="alert" v-text="errors[0]" />
            </validation-provider>
            <validation-provider 
              rules="required" 
              v-slot="{ errors }" 
              name="Schema"
              :class="'form-group'"
            >
              <resizable-textarea>
                <textarea
                  type="text"
                  rows="1"
                  v-model="data.schema"
                  class="form-field"
                  placeholder="Enter a valid asset schema."
                />
              </resizable-textarea>
              <label for="schema" v-text="'Enter a valid asset schema.'" />
              <div class="alert" v-text="errors[0]" />
            </validation-provider>
            <validation-provider 
              rules="required" 
              v-slot="{ errors }" 
              name="Evidence"
              :class="'form-group'"
            >
              <resizable-textarea>
                <textarea
                  type="text"
                  rows="1"
                  v-model="data.evidence"
                  class="form-field"
                  placeholder="Enter a valid asset evidence"
                />
              </resizable-textarea>
              <label for="evidence" v-text="'Enter a valid asset evidence'" />
              <div class="alert" v-text="errors[0]" />
            </validation-provider>
            <validation-provider 
              rules="required" 
              v-slot="{ errors }" 
              name="Metadata"
              :class="'form-group'"
            >
              <resizable-textarea>
                <textarea
                  type="text"
                  rows="1"
                  v-model="data.metadata"
                  class="form-field"
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
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Notice from '~/components/Notice'
import ResizableTextarea from '~/components/ResizableTextarea'
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import { min, required, email } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";

extend("required", required);
extend("email", email);
localize({ en });

export default {
  components: {
    Notice,
    Header,
    Footer,
    ResizableTextarea,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    verifyAsset() {
      alert('Verified!')
    }
  }
}
</script>

<style lang="scss">
@import '~assets/_forms.scss';

</style>
