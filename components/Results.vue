<template>
  <div class="body">
    <div class="flex">
      <div class="flex-grow">
        <h1 v-if="data.isValid">
          The asset is valid.
        </h1>
        <h1 v-else>
          The asset is invalid.
        </h1>
        <p class="max-width">
          This is the result of the 0xcert Verifier check.
          If the validity status of a field is ⚠️, its values cannot be checked since it’s set as private or does not exist within the asset.
        </p>
      </div>
      <img v-if="data.isValid" src="/images/trusted.svg" alt="Valid">
      <img v-else src="/images/untrusted.svg" alt="Not valid">
    </div>
    <div v-if="Object.keys(metadata).length != 0" class="table">
      <div class="thead">
        <div class="tr">
          <div class="td" v-text="'Key'" />
          <div class="td" v-text="'Value'" />
          <div class="td text-right" v-text="'Status'" />
        </div>
      </div>

      <div class="tbody">
        <div v-for="(value, key) in flatten(metadata)" :key="value[key]" class="tr">
          <div class="td key">
            {{ getKeyDescription(key) }}
          </div>
          <div class="td value">
            {{ value }}
          </div>
          <div v-if="data.isValid" class="td status">
            <status :icon="isDescribedBySchema(key, schema) ? 'valid' : 'warning' " />
          </div>
          <div v-else class="td">
            <status :icon="'invalid'" />
          </div>
        </div>
      </div>
    </div>
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
  },
  data () {
    return {
      properties: {}
    }
  },
  computed: {
    metadata () {
      const obj = this.data.metadata ? JSON.parse(this.data.metadata) : {}
      const exclude = [
        '$evidence',
        '$schema'
      ]
      exclude.forEach(key => delete obj[key])
      for (const [key] of Object.entries(obj)) {
        if (obj[key] === null || obj[key].length === 0) {
          delete obj[key]
        }
      }
      return obj
    },
    schema () {
      return this.data.schema ? JSON.parse(this.data.schema) : {}
    }
  },
  async beforeMount () {
    const schemaURL = await JSON.parse(this.data.metadata).$schema
    this.properties = await this.$axios.get(schemaURL)
      .then(res => res.data.properties)
  },
  methods: {
    flatten (obj) {
      const result = {}
      for (const [key] of Object.entries(obj)) {
        if (obj[key] === null || obj[key].length === 0) {
          delete obj[key]
        }
      }
      for (const i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue
        }
        if ((typeof obj[i]) === 'object' && obj[i] !== null) {
          const flatObject = this.flatten(obj[i])
          for (const x in flatObject) {
            if (!Object.prototype.hasOwnProperty.call(flatObject, x)) {
              continue
            }
            result[i + '.' + x] = flatObject[x]
          }
        } else {
          result[i] = obj[i]
        }
      }

      return result
    },
    isDescribedBySchema (path, schema) {
      path = Array.isArray(path) ? path : path.split('.')
      if (path.length > 0) {
        if (schema.type === 'object') {
          const keys = Object.keys(schema.properties)
          if (keys.includes(path[0])) {
            return this.isDescribedBySchema(path.slice(1), schema.properties[path[0]])
          } else {
            return false
          }
        } else if (schema.type === 'array') {
          if (isNaN(path[0])) { // is numeric
            return false
          } else {
            return path.length > 1 ? this.isDescribedBySchema(path.slice(1), schema.items) : true
          }
        } else {
          return false
        }
      } else {
        return true
      }
    },
    getKeyDescription (key) {
      return this.properties[key] ? this.properties[key].description : key
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin: 2rem 0 0;

  .tr {
    @include breakpoint(medium) {
      display: grid;
      grid-template-columns: 30% 60% 10%;
    }
  }

  .td {
    @include breakpoint(medium) {
      padding: 8px 0;
    }
  }

  .value {
    word-break: break-all;
  }

  .key {
    font-weight: bold;
    padding-right: 2rem;
    vertical-align: top;
  }

  .status {
    text-align: right;
  }

  .thead {
    font-weight: bold;
    border-bottom: 2px solid rgba(0,0,0,0.4);

    @include breakpoint(small only) {
      display: none;
    }
  }

  .tbody .tr:nth-child(even) td {
    background-color: rgba(0,0,0,0.03);
  }

  .td:nth-child(2) {
    width: 100%;
  }
}

.max-width {
  padding-right: 1rem;
}

.text-right {
  text-align: right
}
</style>
