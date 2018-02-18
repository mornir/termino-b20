<template>
  <div id="app">
    <img src="./assets/logo.png">
    <SearchBar :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']"/>
    <button @click="getJSON">Get JSON from server</button>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    SearchBar,
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
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
