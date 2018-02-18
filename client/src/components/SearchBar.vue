<template>
  <div class="autocomplete">
    <input type="text" v-model="search" @input="onChange"/>
  <ul
    v-show="isOpen"
    class="autocomplete-results"
  >
     <li
      class="loading"
      v-if="isLoading">
      Loading results...
    </li>
    <li
    v-else
      v-for="(result, i) in results"
      :key="i"
      class="autocomplete-result"
      @click="showItem(result)"
    >
      {{ result }}
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'autocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
    }
  },
  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this.search)

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true
      } else {
        // Data is sync, we can search our flat array
        this.filterResults()
        this.isOpen = true
      }
    },
    filterResults() {
      this.results = this.items.filter(
        item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      )
    },
    showItem(result) {
      this.search = result
      this.isOpen = false
    },
  },
  watch: {
    // Once the items content changes, it means the parent component
    // provided the needed data
    items: function(value) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value
        this.isOpen = true
        this.isLoading = false
      }
    },
  },
}
</script>


<style scoped>
.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>