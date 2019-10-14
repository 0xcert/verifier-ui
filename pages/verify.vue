<template>
  <div class="container">
    <div class="main box">
      <Header />
      <div class="body">
        <h1>Validate your asset</h1>
        <p>Fill the fields and validate an asset online, completely decentralized. </p>
        <div class="form mt-1">
          <div class="form-group">
            <input
              type="text"
              name="did"
              class="form-field"
              placeholder="Enter a valid DID."
            >
            <label for="email">
              Enter a valid DID
            </label>
            <!-- <div v-show="errors" class="alert" v-text="errors.first('did')" /> -->
          </div>
          <div class="form-group">
            <resizable-textarea>
              <textarea
                type="text"
                rows="1"
                name="schema"
                class="form-field"
                placeholder="Enter a valid asset schema."
              />
            </resizable-textarea>
            <label for="schema">
              Enter a valid asset schema.
            </label>
            <!-- <div v-show="errors" class="alert" v-text="errors.first('schema')" /> -->
          </div>
          <div class="form-group">
            <resizable-textarea>
              <textarea
                type="text"
                rows="1"
                name="evidence"
                class="form-field"
                placeholder="Enter a valid asset evidence"
              />
            </resizable-textarea>
            <label for="evidence">
              Enter a valid asset evidence
            </label>
            <!-- <div v-show="errors" class="alert" v-text="errors.first('evidence')" /> -->
          </div>
          <div class="form-group">
            <resizable-textarea>
              <textarea
                type="text"
                rows="1"
                name="metadata"
                class="form-field"
                placeholder="Enter asset Metadata"
              />
            </resizable-textarea>
            <label for="metadata">
              Enter asset Metadata
            </label>
            <!-- <div v-show="errors" class="alert" v-text="errors.first('metadata')" /> -->
          </div>
        </div>
        <div class="cta">
          <n-link
            to="/verify"
            class="button"
          >
            Verify Asset
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
import ResizableTextarea from '~/components/ResizableTextarea'

export default {
  components: {
    Notice,
    Header,
    Footer,
    ResizableTextarea
  }
}
</script>

<style lang="scss">
@import '~assets/_forms.scss';

.main {
  max-width: 650px;
}

.cta {
  display: flex;
  margin: 1.5rem 0;
}
</style>
