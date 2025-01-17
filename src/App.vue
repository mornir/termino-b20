<template>
  <div id="app">
    <header>Terminologie der B20</header>
    <main>
      <div class="search">
          <div class="autcompleteSearch">
              <input type="search" placeholder="Suchen" class="searchInput" v-model.trim="search" @input="onChange" @keyup.down="onArrowDown"
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

import { getSuggestions } from './queries'

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
    async onChange() {
      if (!this.search) return (this.isOpen = false)
      try {
        const res = await getSuggestions(this.search)
        this.isOpen = true
        const frenchSuggestions = res.data.suggest.frenchSuggester[0].options
        const germanSuggestions = res.data.suggest.germanSuggester[0].options
        this.results = [...frenchSuggestions, ...germanSuggestions]
      } catch (e) {
        this.isOpen = false
        console.log(e)
      }
    },
    showTerm(term) {
      this.searchButtonPressed = false
      this.isOpen = false
      this.fiche = term._source
      this.search = term.text
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
  background-image: url('./assets/topography.svg');
}

header {
  padding: 1rem;
  display: block;
  margin: 0 auto 4rem;
  color: #ffffff;
  text-align: center;
  font-size: 3.7rem;
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
  flex-wrap: wrap;
}

.searchButton {
  flex-grow: 1;
  background-color: #16a085;
  color: #ffffff;
  font-size: 2.5rem;
  /*margin-left: 1rem;*/
  border: none;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.autcompleteSearch {
  flex-grow: 2;
  position: relative;
  width: 70%;
}

.searchInput {
  width: 100%;
  font-size: 2.5rem;
  padding: 1rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border: none;
}

.autocomplete {
  width: 100%;
  background-color: white;
  padding: 0;
  margin: 0;
  position: absolute;
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

@media (pointer: coarse) {
  .searchButton {
    display: none;
  }
}

@media (max-width: 820px) {
  html {
    font-size: 13px;
  }
}

@media (max-width: 500px) {
  html {
    font-size: 10px;
  }
}

@media (max-width: 320px) {
  html {
    font-size: 8px;
  }
}
</style>
