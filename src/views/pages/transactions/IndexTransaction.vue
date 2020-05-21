<template>
  <!-- <content-box> -->
    <el-row class="content xs:p-5 xs:pt-0 sm:p-5 xl:p-10 xl:pt-0">
      <el-card>
        <el-tabs v-model="activeName">
        
          <el-tab-pane :label="$t('customer.title')">
            <span slot="label">{{$t('customer.title')}}</span>
            <transition name="el-zoom-in-top">
              <el-row v-if="activeName === '0'">
                <customer />
              </el-row>
            </transition>
          </el-tab-pane>
          <el-tab-pane label="Inventory Transactions">
            <transition name="el-zoom-in-top">
              <el-row v-if="activeName === '1'">
                <inventory-transaction />
              </el-row>
            </transition>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>
  <!-- </content-box> -->
</template>


<script>
import ContentBox from '@/components/ContentBox.vue'
import Overview from "./Overview.vue";
import Customer from "./Customer.vue";
import Order from "./Order.vue";
import Payment from "./Payment.vue";
import InventoryTransaction from "./InventoryTransaction.vue";
export default {
  components: {
    Overview,
    Customer,
    Order,
    Payment,
    InventoryTransaction,
    ContentBox
  },
  data() {
    return {
      activeName: "0"
    };
  },
  created() {
    const { activeName } = this.$route.query;
    if (!!activeName) {
      this.activeName = activeName;
    }
  }
};
</script>
