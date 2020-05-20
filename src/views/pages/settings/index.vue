<template>
  <transition name="el-zoom-in-top">
    <content-box>
      <el-tabs v-model="activeName">
        <el-tab-pane label="User" name="user">
          <div slot="label">{{ $t('user.all') }}</div>
          <user v-if="activeName === 'user'"></user>
        </el-tab-pane>
      </el-tabs>
    </content-box>
  </transition>
</template>

<script>
import User from './users/User.vue'
import ContentBox from '../../../components/ContentBox.vue'
export default {
  components: {
    User,
    ContentBox
  },
  data() {
    return {
      activeName: 'user'
    }
  }
}
</script>
