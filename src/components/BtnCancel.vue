<template>
  <el-button type="primary" @click="btnCancel()">
    <i class="uil-times-circle mr-2"></i>
    {{ $t('user.cancel') }}
    </el-button>
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