<template>
  <aside class="sidebar h-screen bg-topaz-1">
    <ul class="w-160px page-menu-inner">
      <li class="hover:bg-white">
        <a @click="setMenu()" class="sidebar_toggle cursor-pointer hover:text-cerise w-full flex items-center justify-center py-3 text-white" v-if="$resize && $mq.above(690)">
          <i class="uil-wrap-text text-4xl"></i>
        </a>

        <a @click="setMenuMobile()" class="hover:text-cerise w-full flex items-center justify-center py-3 text-white" v-if="$resize && $mq.below(690)">
          <i class="uil-wrap-text text-4xl"></i>
        </a>
      </li>
      <nav class="ul-wrapper">
        <ul data-submenu-title="Menu" class="text-bunting">
          <li>
            <el-tooltip class="item" effect="dark" content="Dashboard" placement="right-start">
              <router-link to="/dashboard" class="transition ease-in duration-700 w-full flex items-center justify-center">
                <i class="uil-dashboard text-5xl"></i>
                <!-- <span>Dashboard</span> -->
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="Form" placement="right-start">
              <router-link to="/form" class="transition ease-in duration-700 w-full flex items-center justify-center">
                <i class="uil-comment-alt-dots text-5xl"></i>
                <!-- <span>Form</span> -->
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="Products" placement="right-start">
              <router-link to="/products" class="transition ease-in duration-700 w-full flex items-center justify-center">
                <i class="uil-shopping-basket text-5xl"></i>
                <!-- <span>Products</span> -->
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="Categories" placement="right-start">
              <router-link to="/categories" class="transition ease-in duration-700 w-full flex items-center justify-center">
                <i class="uil-chart-pie text-5xl"></i>
                <!-- <span>Products</span> -->
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="User" placement="right-start">
              <router-link to="/user" class="transition ease-in duration-700 w-full flex items-center justify-center">
                <i class="uil-user text-5xl"></i>
                <!-- <span>Users</span> -->
              </router-link>
            </el-tooltip>
          </li>
        </ul>
      </nav>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 'about'
    }
  },
  methods: {
    setMenu() {
      this.active = !this.active
      const sitebody = document.body
      this.active ? sitebody.classList.add('menu_callaped') : sitebody.classList.remove('menu_callaped')
    },
    setMenuMobile() {
      this.active = !this.active
      const sitebody = document.body
      this.active ? sitebody.classList.add('menu_mobile_callaped') : sitebody.classList.remove('menu_mobile_callaped')
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem // no need for Vue.set()
    }
  }
}
</script>
