<template>
  <div id="app">
    <header>Terminology der B20</header>
    <main>
      <div class="search">
          <div class="autcompleteSearch">
          <input type="text" class="searchInput" v-model.trim="search" @input="onChange" @keyup.down="onArrowDown"
    @keyup.up="onArrowUp"
    @keyup.enter="onEnter"/>
          <ul class="autocomplete" v-show="isOpen">

            <li v-for="(term, index) in results" :class="{ 'is-active': index === arrowCounter }"
              :key="term.text" @click="showTerm(term) ">{{term.text}}</li>

          </ul>
    </div>
    
    <button class="searchButton" @click="searchButton">Suchen</button>
    </div>

    <div class="result" v-show="fiche.id">
      <Fiche :data="fiche"/>
    </div>

    <div class="result" v-if="searchButtonPressed">
      <Fiche :data="term._source" v-for="term in results" :key="term.text"/>
    </div>
    </main>
  </div>
</template>

<script>
import Fiche from './components/Fiche.vue'
import axios from 'axios'

const url = 'https://server-gnyjbtvgir.now.sh/'
//http://localhost:8081/

export default {
  name: 'app',
  data() {
    return {
      results: [],
      search: '',
      isOpen: false,
      fiche: {},
      searchButtonPressed: false,
      arrowCounter: -1,
    }
  },
  components: {
    Fiche,
  },
  methods: {
    onChange() {
      if (!this.search) return
      this.getSuggestions()
    },
    showTerm(term) {
      this.searchButtonPressed = false
      this.isOpen = false
      this.fiche = term._source
      this.search = term.text
    },
    getSuggestions() {
      axios
        .get(`${url}suggest/${this.search}/10`)
        .then(res => {
          this.isOpen = true
          this.results = res.data
          //console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchButton() {
      this.isOpen = false
      this.fiche = {}
      this.searchButtonPressed = true
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter++
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter--
      }
    },
    onEnter() {
      if (this.arrowCounter < 0) {
        this.searchButton()
      } else {
        this.showTerm(this.results[this.arrowCounter])
        this.arrowCounter = -1
      }
    },
    handleClickOutside() {
      this.isOpen = false
      this.arrowCounter = -1
    },
  },
  mounted() {
    // close autocomplete box when click outside
    document.addEventListener('click', this.handleClickOutside)
  },
  /* Not necessary since we only have one component, but I keep for future proof */
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style>
body {
  font-size: 10px;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  min-height: 100vh;
  background-color: #cccccc;
}

header {
  padding: 1rem;
  display: block;
  margin: 0 auto 4rem;
  color: #ffffff;
  text-align: center;
  font-size: 5rem;
  background-color: #16a085;
  font-weight: 400;
}
main {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
}
.search {
  width: 100%;
  display: flex;
  align-items: start;
}

.autcompleteSearch {
  flex-grow: 2;
}

.searchInput {
  width: 100%;
  font-size: 2.5rem;
  padding: 1rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border: none;
}

.searchButton {
  flex-grow: 1;
  background-color: #16a085;
  color: #ffffff;
  font-size: 2.5rem;
  margin-left: 1rem;
  border: none;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.autocomplete {
  background-color: white;
  padding: 0;
  margin: 0;
}

.autocomplete li {
  list-style: none;
  padding: 1rem;
  border-bottom: thin solid #eeeeee;
  font-size: 1.6rem;
  color: #333333;
  cursor: pointer;
}

.autocomplete li.is-active,
.autocomplete li:hover {
  background-color: #4aae9b;
  color: white;
}

.result {
  margin-top: 4rem;
}
</style>
