<template>
  <el-row :gutter="40" class="pt-5">
    <!-- <el-button icon="el-icon-plus" type="primary" @click="handleCreateCustomer">{{$t('customer.add')}}</el-button> -->
    <!-- <el-row type="flex" style="padding: 20px">
            <el-col :span="16">
                <el-dropdown trigger="click" style="cursor: pointer" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{$t("customer.batchActions.title")}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" command="remove" :disabled="isDisableCommand()">
                            {{$t('customer.batchActions.remove')}}
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" command="active" :disabled="isDisableCommand()">
                            {{$t('customer.batchActions.active')}}
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" command="edit" :disabled="isDisableEdit()">
                            {{$t('customer.batchActions.edit')}}
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" command="deselect" divided
                                          :disabled="isDisableCommand()">{{$t('customer.batchActions.deselect')}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="8">
                <el-input
                        v-model="search"
                        size="mini"
                        :placeholder="$t('customer.search')">
                </el-input>
            </el-col>
        </el-row>
        <el-table
                ref="customerTable"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    :label="$t('customer.tableData.timestamp')"
                    width="150">
                <template slot-scope="scope">{{ scope.row.timestamp | moment('DD/MM/YYYY HH:mm') }}</template>
            </el-table-column>
            <el-table-column
                    property="name"
                    :label="$t('customer.tableData.name')"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="tel"
                    :label="$t('customer.tableData.tel')"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="desc"
                    :label="$t('customer.tableData.desc')"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property="userDoc.username"
                    :label="$t('customer.tableData.createdBy')"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    :label="$t('customer.tableData.status')"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.isActive ? $t("customer.tableData.isActive") : $t('customer.tableData.isDeactive')}}
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label=""
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClickDetail(scope.row)" type="info" size="small">{{$t('customer.view')}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <transition name="el-zoom-in-top">
            <el-row type="flex" justify="center" style="padding: 20px;" v-show="!search">
                <el-pagination
                        :current-page.sync="page"
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-row>
    </transition>-->
    <el-col :span="5">
      <div class="p-0">
        <div
          class="h-full overflow-scroll overflow-hidden overflow-x-scroll overflow-hidden font-sans"
        >
          <div class="customer-search">
            <i class="uil-search"></i>
            <el-input v-model="search" :placeholder="$t('customer.search')" clearable />
          </div>
          <ul v-for="(value, key) in grouped" :key="value._id">
            <h2 class="bg-cerise rounded-px6 px-2 py-1 text-white font-semibold uppercase text-xl">{{ key }}</h2>
            <li v-for="customer in value" :key="customer._id" class="py-3 border-b">
              <a href="#" @click="handleClickCustomer(customer)" class>
                <p class="text-base text-gray-800 text-sm capitalize">{{customer.name}}</p>
                <span class="text-gray-500">{{customer.tel}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :span="19" class="rounded-px6">
      <customer-detail :customer="selectedCustomer"></customer-detail>
    </el-col>
  </el-row>
</template>

<script>
import {
  provider
} from '@/service/provider';
import axios from 'axios';
import _ from 'lodash';
import numeral from 'numeral';
import CustomerDetail from './CustomerDetail.vue'
export default {
  components: {
    CustomerDetail,
  },
  data() {
    return {
      search: "",
      selectedCustomer: null,
      total: 0,
      page: 1,
      tableData: [],
      multipleSelection: []
    }
  },
  watch: {
    search: _.debounce(function () {
      this.fetchCustomer();
    }, 200),
    page(val) {
      this.fetchCustomer();
    }
  },
  methods: {
    handleClickCustomer(customer){
      this.selectedCustomer = customer;
    },
    generateRouteUrl(row) {
      return `/payments/add?txt=${row.name}`;
    },
    handleClickDetail(row) {
      this.$router.push(`/customers/${row._id}/show`);
    },
    handleCommand(command) {

      switch (command) {
        case 'edit':
          this.$router.push(`/customers/${this.multipleSelection[0]._id}/edit`);
          break;
        case 'remove':
          this.handleToggleActive(false);
          break;
        case 'active':
          this.handleToggleActive(true);
          break;
        case 'deselect':
          this.toggleSelection();
          break;
      }
    },
    handleToggleActive(arg) {
      const {
        token,
        user
      } = this.$store.state.user;
      const url = `${provider.baseURL}${provider.prefix}/customers/removes`;
      const ids = this.multipleSelection.map(map => map._id);
      const body = {
        ids,
        selector: {
          createdBy: user._id,
          isActive: arg
        }
      };
      this.$alert(`${arg ? 'Activate' : "Deactivate"} ${this.multipleSelection.map(map => map.name)}`, 'បញ្ជាក់', {
        confirmButtonText: 'OK',
        callback: action => {
          if (action === 'confirm') {
            axios.post(url, body, {
                headers: {
                  token
                }
              })
              .then((res) => {
                if (res.data.code === 201) {
                  this.multipleSelection.forEach(o => {
                    o.isActive = arg;
                  });
                  this.$message.success("Success");
                  this.toggleSelection();
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch((err) => this.$message.error(err.message));
          }
        }
      });

    },
    isDisableCommand() {
      return this.multipleSelection.length === 0;
    },
    isDisableEdit() {
      return this.multipleSelection.length === 0 || this.multipleSelection.length > 1;
    },
    toggleSelection() {
      this.$refs.customerTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCreateCustomer() {
      this.$router.push('/customers/add')
    },
    fetchCustomer() {
      const {
        token,
        activeStore
      } = this.$store.state.user;
      const url = `${provider.baseURL}${provider.prefix}/customers?q=${this.search}&page=${this.page}&s=${activeStore}`;
      axios.get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.tableData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        })
    },
    countCustomer() {
      const {
        token,
        activeStore
      } = this.$store.state.user;
      const url = `${provider.baseURL}${provider.prefix}/customers/count?s=${activeStore}`;
      axios.get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.total = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        })
    }
  },
  computed: {
    grouped() {
      return _.groupBy(this.tableData, (item) => {
        return item.name.charAt(0)
      })
    }
  },
  created() {
    this.fetchCustomer();
    this.countCustomer();
  }
}
</script>


<style lang="scss" scoped>
.customer-bg {
  // background: url('../../../assets/img/customer-bg.png') rgba(244, 54, 143, 0.616) center center no-repeat;
  background-image: url('../../../assets/img/customer-bg.png'), linear-gradient(to right, #f4368e, #9e3792);
  background-size: 100%;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background-position: 20% 30%;
  border-radius: 6px;
}
</style>