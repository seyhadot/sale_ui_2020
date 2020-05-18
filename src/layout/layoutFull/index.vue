<template>
  <div class="flex body_wrapper bg-main h-screen">
    <sidebar class="sidebar-container" />
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full ">
        <div class="bread_crumb content px-10 xs:px-5 xl:px-10 py-5">
          <ul class="flex font-bold">
            <!-- <li>
              <a href>{{$route.meta.name}}</a>
            </li> -->
            <li>
              <a href>{{$route.meta.title}}</a>
            </li>
          </ul>
        </div>
        <router-view :key="key" />
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

<style lang="scss">
.bg-main {
  background: url('../../assets/img/bg.png') no-repeat;
  background-size: 60%;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background-position: 20% 30%;
}
</style>
