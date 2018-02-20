<template>
  <div id="app">
    <header>Terminology der B20</header>
    <main>
      <div class="search">
<!--     <SearchInput :items="searchResults" @input="getSuggestions" :isAsync="true"/> -->
    <input type="text" class="searchInput" />
    <button class="searchButton">Get Details</button>
    </div>
    <div class="results">
      <ul>
        <li>bread</li>
        <li>butter</li>
        <li>oil</li>
        <li>tomatoes</li>
        <li>cheese</li>
        <li>chicken</li>
      </ul>
    </div>
    </main>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput.vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      searchResults: [],
    }
  },
  components: {
    SearchInput,
  },
  methods: {
    getJSON() {
      axios
        .get(`http://localhost:8081/test`)
        .then(res => {
          // JSON responses are automatically parsed.
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSuggestions() {
      axios
        .get(`http://localhost:8081/all`)
        .then(res => {
          // JSON responses are automatically parsed.
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style>
header {
  background-color: blue;
  color: white;
  text-align: center;
  height: 10vh;
  line-height: 10vh;
  font-size: 2rem;
}

body {
  margin: 0;
  font-size: 16px;
}

main {
  display: grid;
  height: 90vh;
  grid-template-rows: 1fr 2fr;
  grid-row-gap: 2rem;
  width: 80%;
  margin: auto;
}

.search {
  align-self: end;
  justify-self: center;
  display: flex;
  height: 5rem;
  width: 100%;
  margin: 0 2rem;
}

.searchButton {
  font-size: 1.5rem;
  margin-left: 1rem;
  flex-grow: 1;
}

.searchInput {
  flex-grow: 3;
  font-size: 2rem;
}

.results {
  background: red;
  border-radius: 2px;
  margin-bottom: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
