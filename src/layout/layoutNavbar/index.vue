<template>
  <div class="flex body_wrapper bg-bunting h-auto h-full h-screen ">
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
