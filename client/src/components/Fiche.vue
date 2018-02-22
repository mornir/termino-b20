<template>
  <div class="fiche">
    <div class="language">
      <!-- http://flaglane.com/download/german-flag/ -->
      <img src="../assets/german-flag-small.png" alt="german-flag" width="50px">
      <span class="term">{{data.german}}</span>
    </div>
    <div class="language">
      <img src="../assets/french-flag-small.png" alt="french-flag" width="50px">
      <span class="term">{{data.french}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.fiche {
  background-color: #ffffff;
  padding: 2rem 2rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.language {
  padding: 1rem 0;
}

img {
  vertical-align: text-bottom;
}

.term {
  font-size: 2rem;
  margin-left: 1rem;
}
</style>
