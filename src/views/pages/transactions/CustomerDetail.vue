<template>
  <el-row class="bg-gray-700 h-full p-10 customer-bg">
    <div v-if="customer">
      <el-col :span="16">
        <div class="customer-detail">
          <h1 class="text-5xl text-white font-bold mb-8 flex items-center">{{customer.name}}</h1>
          <div class="content-detail flex mb-5">
            <i class="uil-calling text-white text-4xl"></i>
            <div class="text-base text-white font-bold ml-3">
              <div>086 844487</div>
              <div>092 844487</div>
            </div>
          </div>
          <div class="content-detail flex mb-5">
            <i class="uil-mailbox text-white text-4xl"></i>
            <div
              class="text-base w-64 text-white font-bold ml-3 flex items-center"
            >terminal@gmail.com</div>
          </div>
          <div class="content-detail flex mb-5">
            <i class="uil-atm-card text-white text-4xl"></i>
            <div class="text-base w-64 text-white font-bold ml-3 flex items-center">00881721</div>
          </div>
          <div class="content-detail flex">
            <i class="uil-location-point text-white text-4xl"></i>
            <div class="text-base w-64 text-white font-bold ml-3 flex items-center">
              <div>Street 119, Krong Battambang, Cambodia</div>
            </div>
          </div>
          <div class="flex w-full justify-center mt-10">
            <div class="w-7/12 border-b"></div>
          </div>
        </div>
      </el-col>
    </div>
    <el-col :span="8">
      <div class="flex h-full flex-col justify-between">
        <div class="credit-card bg-blue-400 h-56 rounded-lg mb-10"></div>
        <div class="credit-card bg-gray-700 h-56 rounded-lg"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
    customer: {
        type: Object,
        defautValue: null
    }
  }
  }
</script>

<style lang="scss" scoped>
</style>