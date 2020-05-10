<template>
  <div class="flex body_wrapper bg-menu_yellow h-full h-screen">
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full">
        <div class="px-5 pt-4">
          <div class="content-card px-6 py-5">
            <router-view :key="key" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar
    }),
    key() {
      return this.$route.path
    }
  }
}
</script>
