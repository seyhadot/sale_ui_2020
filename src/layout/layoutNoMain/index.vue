<template>
  <div class="flex body_wrapper">
    <sidebar class="sidebar-container" />
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full">
        <div class="content xs:px-5 xl:px-10 pt-5">
          <div class="content-card">
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
