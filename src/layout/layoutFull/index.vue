<template>
  <div class="flex body_wrapper">
    <sidebar class="sidebar-container" />
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full">
        <div class="content px-5 pt-4">
          <div class="px-2">
            <div class="flex -mx-3">
              <div class="w-1/2 px-1">
                <div class="border-t-4 border-cerise"></div>
              </div>
              <div class="w-1/2 px-1">
                <div class="border-t-4 border-topaz"></div>
              </div>
            </div>
          </div>
          <div class="content-card bg-white px-6 py-5">
            <router-view :key="key" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
