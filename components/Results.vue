<template>
  <div class="body">
    <div class="flex">
      <div class="flex-grow">
        <p class="max-width">
          Here are the results of the 0xcert Verifier check.
        </p>
        <p class="max-width">
          Below, you can see the validity of each of the asset’s metadata field. If the status is “Unavailable”, the value of that field cannot be checked since it's set as private or does not exist within the asset.
        </p>
      </div>
      <img v-if="data.isValid" src="/images/trusted.svg" alt="Valid">
      <img v-else src="/images/untrusted.svg" alt="Not valid">
    </div>
    <table class="table">
      <thead>
        <tr>
          <td>Field</td>
          <td>Value</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, key) in flatten(metadata)" :key="row[key]">
          <td>{{ key }}</td>
          <td>{{ row }}</td>
          <td v-if="data.isValid">
            <status :icon="isDescribedBySchema(key, schema) ? 'valid' : 'warning' " />
          </td>
          <td v-else>
            <status :icon="'invalid'" />
          </td>
        </tr>
      </tbody>
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
  },
  computed: {
    metadata () {
      return this.data.metadata ? JSON.parse(this.data.metadata) : {}
    },
    schema () {
      return this.data.schema ? JSON.parse(this.data.schema) : {}
    }
  },
  methods: {
    flatten (obj) {
      const result = {}

      for (const i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue
        }
        if ((typeof obj[i]) === 'object' && obj[i] !== null) {
          const flatObject = this.flatten(obj[i])
          for (const x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;

    td {
      padding: 8px 15px;
    }

    thead {
      font-weight: bold;
      border-bottom: 2px solid rgba(0,0,0,0.4);
    }

    tbody tr:nth-child(even) td {
       background-color: rgba(0,0,0,0.03);
    }

    td:first-child {
      font-weight: bold;
      padding-right: 2rem;
      vertical-align: top;
    }

    td:nth-child(2) {
      width: 100%;
    }
  }

  .max-width {
    padding-right: 1rem;
  }
</style>
