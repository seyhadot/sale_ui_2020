<template>
  <div class="flex body_wrapper bg-main h-screen">
    <sidebar class="sidebar-container" />
    <div class="wrapper_main w-full">
      <Navbar />
      <main class="w-full">
        <div class="bread_crumb content xs:px-5 xl:px-10 pt-8 pb-3">
          <ul class="flex font-bold">
            <el-breadcrumb class="app-breadcrumb" separator="•">
              <transition-group el-fade-in-linear name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                  <span
                    v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                    class="no-redirect"
                  >{{ item.meta.title }}</span>
                  <router-link
                    :to="item.path"
                    v-else
                    @click.prevent="handleLink(item)"
                  >{{ item.meta.title }}</router-link>
                </el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>
          </ul>
        </div>
        <router-view :key="key" />
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'
import pathToRegexp from 'path-to-regexp'

export default {
  name: 'Layout',
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
      }
      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)

    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
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

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;

  a {
    position: relative;
    font-size: 14px;
    background: #fff;
    margin-bottom: 6px;
    padding: 7px 10px;
    border-radius: 10px;
    border: 1px solid #e0e6ed;
    -webkit-box-shadow: 2px 5px 17px 0 rgba(31, 45, 61, 0.1);
    box-shadow: 0px 1px 8px 0px rgba(31, 45, 61, 0.1);
    &:hover {
      color: $pink;
    }
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
    position: relative;
    font-size: 14px;
    background: #fff;
    margin-bottom: 6px;
    padding: 7px 10px;
    border-radius: 10px;
    border: 1px solid #e0e6ed;
    -webkit-box-shadow: 2px 5px 17px 0 rgba(31, 45, 61, 0.1);
    box-shadow: 0px 1px 8px 0px rgba(31, 45, 61, 0.1);
  }
}
.el-breadcrumb__item .el-breadcrumb__separator {
  color: $pink;
}
</style>
