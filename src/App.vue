<template>
  <div id="app">
    <div v-if="isLoading">
      <div class="loader-wrapper">
        <div class="typewriter">
          <div v-loading="isLoading">
            <h1 style="">សូមមេត្តារង់ចាំ...</h1>
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
    }, 1500)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Khmer&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&display=swap');

body {
  background: $body;
  font-family: 'Khmer', 'Exo 2', sans-serif;
}
</style>
