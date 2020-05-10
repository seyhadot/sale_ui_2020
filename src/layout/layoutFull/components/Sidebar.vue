<template>
  <aside class="sidebar h-screen bg-menu_yellow">
    <ul class="w-160px page-menu-inner">
      <li class="hover:bg-menu_gray">
        <a
          @click="setMenu()"
          class="sidebar_toggle cursor-pointer hover:text-menu_yellow w-full flex items-center justify-center py-3 text-menu_gray"
          v-if="$resize && $mq.above(690)"
        >
          <i class="uil-wrap-text text-4xl"></i>
        </a>

        <a @click="setMenuMobile()" class="hover:text-menu_yellow w-full flex items-center justify-center py-3 text-menu_gray" v-if="$resize && $mq.below(690)">
          <i class="uil-wrap-text text-4xl"></i>
        </a>
      </li>
      <nav class="ul-wrapper">
        <ul data-submenu-title="Apps">
          <li>
            <router-link to="dashboard">
              <i class="uil-dashboard"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="form">
              <i class="uil-comment-alt-dots"></i>
              <span>Form</span>
            </router-link>
          </li>
          <li>
            <router-link to="product">
              <i class="uil-shopping-basket"></i>
              <span>Products</span>
            </router-link>
          </li>
          <li>
            <router-link to="user">
              <i class="uil-user"></i>
              <span>Users</span>
            </router-link>
          </li>
          <li>
            <a>
              <i class="uil-envelope-alt"></i>
              <span>Email</span>
            </a>
            <ul>
              <li>
                <a href="email-inbox">Inbox</a>
                <a href="email-inbox-read">Email Read</a>
                <a href="email-compose">Email Compose</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i class="uil-receipt"></i>
              <span>Report</span>
            </a>
            <ul>
              <li>
                <a href="shop-card">Products Grid</a>
              </li>
              <li>
                <a href="shop-listing">Products List</a>
              </li>
              <li>
                <a href="shop-product">Product</a>
              </li>
              <li>
                <a href="shop-cart">Products Cart</a>
              </li>
              <li>
                <a href="shop-checkout">Products Checkout</a>
              </li>
            </ul>
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
