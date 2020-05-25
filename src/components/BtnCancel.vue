<template>
  <el-button type="primary" @click="btnCancel()">
    <span class="uil-times-circle mr-2"></span>
    {{ $t('user.cancel') }}</el-button>
</template>

<script>
  export default {
    methods: {
      btnCancel(){
        this.$router.go(-1)
      },
    },
  }
</script>