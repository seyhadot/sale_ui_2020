<template>
  <div class="flex body_wrapper bg-bunting h-auto h-full h-screen bg-main">
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full">
        <div class="px-5 pt-4">
          <div class="content-card xs:px-2 sm:px-3 lg:px-6 xs:py-2 sm:py-3 lg:py-6">
            <router-view :key="key" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
.bg-main{
  background: url("../../assets/img/bg.png") center center no-repeat;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background-position: 10% 70%;
  background-size: 100%;
}
</style>

