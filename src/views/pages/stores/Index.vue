<template>
  <div class="xs:px-0 sm:px-10 lg:px-32 xl:px-56 mt-6">
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="xs:text-2xl sm:text-4xl lg:text-6xl font-bold text-white font-Raleway"
        >{{$route.meta.title}}</h1>
      </div>
      <button
        v-if="ifIsSuper"
        class="more-app border-2 px-4 py h-10 line text-white font-bold font-Raleway"
        @click="handleGoToAddStore"
      >
        <span class="uil-plus mr-2 font-normal"></span> New Store
        <span class="caret text-white"></span>  
      </button>
    </div>
    <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-10">
      <div
        :class="setStyleActiveStore(store)"
        :key="store.id"
        v-for="store in userStores"
        class="store bg-bcg ml-0 flex justify-center relative items-center align-middle"
      >
        <div class="absolute top-0 right-0 pr-3 text-menu_profile pt-2 edit_setting">
          <el-button class="p-0 z-10" type="text" @click="handleEdit(store.id)">
            <i class="uil-cog"></i>
          </el-button>
        </div>
        <div @click="handleActiveStore(store)" class="w-full h-full py-16">
          <div class="text-bunting text-center">
            <i class="uil-shop text-6xl"></i>
          </div>
          <div class="absolute bottom-0 left-0 pl-3 pb-2">
            <span class="text-bunting font-bold text-xs capitalize">{{ store.name }}</span>
          </div>
        </div>
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
import { provider } from '@/service/provider'
import axios from 'axios'
export default {
  data() {
    return {
      dialogVisible: false,
      storeData: []
    }
  },
  methods: {
    handleActiveStore(store){
      this.$store.commit("setActiveStore", store);
      this.$router.push('/dashboard');
    },
    handleEdit(id) {
      this.$router.push({ name: 'Edit Store', params: { id } })
    },
    handleGoToAddStore() {
      this.$router.push({ name: 'Add Store' })
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    fetchStores() {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/store/list`
      axios
        .post(
          `${url}`,
          {
            requestId: user._id
          },
          {
            headers: {
              token: token
            }
          }
        )
        .then((response) => {
          const data = response.data
          if (data.code == 403) {
            this.$message.error(data.message)
          } else {
            this.storeData = data.data
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    setStyleActiveStore(store){
         const {activeStore} = this.$store.state.user;
         if(store.id === activeStore){
           return 'active-store';
         }
         return '';
    }
  },
  computed: {
    userStores() {
      return this.storeData.map((s) => ({
        id: s._id,
        name: s.name
      }))
    },
    ifIsSuper() {
      const { user } = this.$store.state.user
      return provider.isSuper(user.roles)
    }
  },
  created() {
    const {user} = this.$store.state.user;
    if(provider.isSuper(user.roles)){
      this.fetchStores()
    } else {
      this.storeData = user.stores
    }
  }
}
</script>

<style lang="scss" scoped>
.store {
  border: 1px solid $bunting;
  box-shadow: 4px 4px 31px rgba(0, 0, 0, 0.3);
  .edit_setting {
    display: none;
    transition: 0.5s;
  }
}

.store:hover {
  border: 1px solid $white;
  background: $white;
  opacity: 0.7;
  .edit_setting {
    display: block;
    transition: 0.5s;
    transition: opacity 0.2s;
  }
  span {
    color: $bunting;
    font-weight: 600;
  }

  .uil-cog {
    color: $bunting;
    // &:hover {
    //   color: $pink;
    // }
  }
}
.active-store {
  background: $pink;
  i,
  span {
    color: $white;
  }
  &:hover {
    background: $pink;
    i,
    span {
      color: $white;
    }
    .uil-cog {
      color: $white;
    }
  }
}
</style>
