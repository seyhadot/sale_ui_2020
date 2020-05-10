<template>
  <header class="h-60px header_scroll w-full bg-topaz" :class="{ header_fixed: scrollPosition > 100 }">
    <nav class="flex justify-between items-center h-full">
      <div class="h-full"></div>
      <ul class="flex h-full">
        <li class="flex items-center h-full" v-if="$resize && $mq.above(690)">
          <a @click="toggleFullScreen" class="cursor-pointer flex items-center h-full px-3 text-white text-lg hover:text-white">
            <i class="uil-focus"></i>
          </a>
        </li>
        <li class="flex items-center h-full dropdown_menu">
          <a v-click-outside="hideDropDownMennu" @click="toggleDropDownMenu" v-bind:class="{ 'active_profile': showStar }"
  v-on:click="showStar = !showStar" class="flex items-center h-full px-3">
            <span class="font-sans text-xs text-menu_profile">Heng Seyha</span>
            <img class="rounded-full w-8 h-8 ml-2" src="@/assets/img/login/user.png" />
            <span class="caret text-gray-400"></span>
          </a>
          <div class="icon-browse grid-dropdown grid-open" v-show="dropDownMenu" style="right: 56px; top: 60px;">
            <a href="#" class="icon-menu-item"> <i class="uil-shop"></i> Dashboard </a>
            <a href="#" class="icon-menu-item"> <i class="uil-envelope-alt"></i> Messages </a>
            <a href="#" class="icon-menu-item"> <i class="uil-bookmark"></i> Bookmark </a>
            <a href="#" class="icon-menu-item"> <i class="uil-shopping-basket"></i> Cart </a>
            <a href="#" class="icon-menu-item"> <i class="uil-shield-check"></i> Privacy </a>
            <a href="#" class="icon-menu-item"> <i class="uil-bolt-alt"></i> Upgrade </a>
            <router-link to="/dashboard" class="more-app text-cerise"><i class="uil-sign-out-alt"></i>  Logout</router-link>
          </div>
        </li>
        <li class="flex justify-between items-center h-full hover:bg-bcg">
          <router-link to="/store" class="flex h-full px-4">
            <div class="app-icon h-full flex justify-center items-center">
              <div class="app-icon-inner">
                <div class="app-icon-block first"></div>
                <div class="app-icon-block"></div>
                <div class="app-icon-block"></div>
                <div class="app-icon-block"></div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  data() {
    return {
      scrollPosition: null,
      openDropDown: false,
      dropDownMenu: false,
      fullScreen: false,
    }
  },
  methods: {
    toggleDropDownMenu() {
      this.dropDownMenu = !this.dropDownMenu
    },

    hideDropDownMennu() {
      this.dropDownMenu = false
      this.showStar = false
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    },
    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen()

      const docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  directives: {
    ClickOutside
  }
}
</script>
