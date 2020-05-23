<template>
  <div id="app">
    <div v-if="isLoading" mode="out-in">
      <div class="loader-wrapper">
        <div class="typewriter">
          <div v-loading="isLoading">
            <h1>សូមមេត្តារង់ចាំ...</h1>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 1300)
  },
    components: {
     
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Khmer&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Basic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');

body {
  background: $body;
  height: 100%;
  outline: none;
  font-size: 1rem;
  font-family: 'Poppins', 'Exo 2', 'KhmerR', sans-serif;
}
</style>
