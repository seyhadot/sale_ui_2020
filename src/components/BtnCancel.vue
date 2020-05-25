<template>
  <el-button type="primary" @click="btnCancel()">{{ $t('user.cancel') }}</el-button>
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