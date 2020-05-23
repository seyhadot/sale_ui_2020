<template>
  <div class="flex body_wrapper bg-white">
    <sidebar class="sidebar-container" />
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full bg-white">
        <div class="content">
          <router-view :key="key" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'

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
