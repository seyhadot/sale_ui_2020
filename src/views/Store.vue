<template>
  <div class="xs:px-0 sm:px-10 lg:px-32 xl:px-56 mt-6">
 
    <div class="flex justify-between items-center">
      <div>
        <h1 class="xs:text-2xl sm:text-4xl lg:text-6xl font-bold text-white font-Raleway">Applications</h1>
      </div>
      <button class="more-app border-2 px-4 py h-10 line text-white font-bold font-Raleway">
        <span class="uil-plus mr-2 font-normal"></span> Add Store
        <!-- <span class="caret text-white"></span> -->
      </button>
    </div>
    <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-10">
      <div v-for="x in 7" class="store bg-menu_gray ml-0 flex justify-center relative items-center align-middle">
          <div class="absolute top-0 right-0 pr-3 text-menu_profile pt-2 edit_setting">
            <el-button class="p-0 z-10" type="text" @click="dialogVisible = true"><i class="uil-cog"></i></el-button>
          </div>
        <router-link to="dashboard" class="w-full h-full py-16">
          <div class="text-menu_yellow text-center">
            <i class="uil-shop text-6xl"></i>
          </div>
          <div class="absolute bottom-0 left-0 pl-3 pb-2">
            <span class="text-menu_profile text-xs capitalize">Base App</span>
          </div>
        </router-link>
      </div>
    </div>
    <el-dialog title="Store" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.store {
  border: 1px solid #4b4b4b;
  box-shadow: 4px 4px 31px rgba(0, 0, 0, 0.3);
  .edit_setting {
    display: none;
    transition: 0.5s;
  }
}
.store:hover {
  border: 1px solid #fff;
  background: #fff;
  opacity: 0.7;
  .edit_setting {
    display: block;
    transition: 0.5s;
    transition: opacity 0.2s;
  }
  span {
    color: #4b4b4b;
    font-weight: 600;
  }
  .uil-cog {
    color: #4b4b4b;
    &:hover {
      color: #fec171;
    }
  }
}
</style>
