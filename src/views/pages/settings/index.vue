<template>
    <transition name="el-zoom-in-top">
        <el-card style="min-height: 95.5vh;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="User" name="user">
                    <div slot="label">
                        {{$t('user.all')}}
                    </div>
                    <user  v-if="activeName==='user'"></user>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </transition>
</template>

<script>
  import User from "./users/User.vue";

  export default {
    components: {
      User
    },
    data() {
      return {
        activeName: "user"
      }
    }
  }
</script>
