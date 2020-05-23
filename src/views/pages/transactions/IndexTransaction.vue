<template>
  <!-- <content-box> -->
      <div class="p-10 h-full shadow-none">
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
      </div>
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
