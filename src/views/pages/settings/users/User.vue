<template>
  <el-col :span="24" v-loading="isLoading">
    <div class="flex justify-between items-center mb-4">
      <el-col :xs="15" :sm="12" :md="10" :lg="8">
        <form class="form-inline-search my-2 my-lg-0">
          <div class="pl-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <el-input
              v-model="search"
              id="input-search"
              class="form-control product-search"
              :placeholder="$t('user.tableData.search')"
            />
          </div>
        </form>
      </el-col>

      <el-button
        type="primary"
        @click="handleGotoCreateUser"
        icon="icon-feather-plus text-xl"
        class="btn-new-product"
      ></el-button>
    </div>
    <!-- <el-button
          icon="el-icon-plus"
          type="warning"
          @click="handleGotoCreateUser"
    >{{ $t('user.add') }}</el-button>-->

    <el-row>
      <el-table
        :data="tableData.filter((data) => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
        @row-click="handleClick"
      >
        <el-table-column :label="$t('user.tableData.accountName')" prop="username"></el-table-column>
        <el-table-column :label="$t('user.tableData.createdAt')">
          <template slot-scope="scope">{{ scope.row.createdAt | moment('DD/MM/YYYY HH:mm') }}</template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.status')">
          <template
            slot-scope="scope"
          >{{ scope.row.profile.approved ? 'បានអនុញ្ញាត' : 'មិនទាន់បានអនុញ្ញាត' }}</template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.roles')">
          <template slot-scope="scope">
            <span :key="role" v-for="role in scope.row.roles">
              <slot v-if="role === 'admin'">
                <div class="badge bg-green-500 uppercase bg- mr-2">{{ role }}</div>
              </slot>
              <slot v-if="role === 'gm'">
                <div class="badge bg-pink-500 uppercase bg- mr-2">{{ role }}</div>
              </slot>
              <slot v-if="role === 'cashier'">
                <div class="badge bg-indigo-500 uppercase bg- mr-2">{{ role }}</div>
              </slot>
              <slot v-if="role === 'super'">
                <div class="badge bg-orange-500 uppercase bg- mr-2">{{ role }}</div>
              </slot>
              <slot v-if="role === 'customer'">
                <div class="badge bg-pink-500 uppercase bg- mr-2">{{ role }}</div>
              </slot>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.stores')">
          <template slot-scope="scope">
            <el-tag
              :key="store._id"
              v-for="store in scope.row.stores"
              class="mr-2 mb-2"
            >{{ store.name }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column align="right">
          <template slot="header" slot-scope="scope">
          </template>
        </el-table-column>-->
      </el-table>
    </el-row>
    <!-- Diaglog form -->
  </el-col>
</template>

<script>
import { provider } from '@/service/provider'
import axios from 'axios'

export default {
  data() {
    return {
      isLoading: true,
      dialogFormVisible: false,
      search: '',
      select: '',
      tableData: []
    }
  },
  methods: {
    handleGotoCreateUser() {
      this.$router.push({ name: 'add_user' })
    },
    fetchUsers() {
      const { token, user, activeStore } = this.$store.state.user
      const url = provider.isSuper(user.roles) ? `${provider.baseURL}/user/super/list` : `${provider.baseURL}/user/fetch_all`
      if (provider.isSuper(user.roles)) {
        axios
          .get(`${url}?req_id=${user._id}`, {
            headers: {
              token: token
            }
          })
          .then((response) => {
            const data = response.data
            if (data.code == 403) {
              this.$message.error('something went wrong')
            } else {
              this.tableData = data.data
            }
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      } else {
        axios
          .post(
            `${url}?store_id=${activeStore}`,
            { _id: user._id },
            {
              headers: {
                token: token
              }
            }
          )
          .then((response) => {
            const data = response.data
            if (data.code == 403) {
            } else {
              this.tableData = data.data
            }
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      }
    },
    handleClick(row) {
      const { user } = this.$store.state.user
      if (provider.isAdmin(user.roles) || provider.isSuper(user.roles) || provider.isGM(user.roles)) {
        this.$router.push(`/settings/users/${row._id}/edit`)
      }
    }
  },
  created() {
    this.fetchUsers()
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  }
}
</script>
<style lang="scss">
.badge {
  line-height: 1;
  padding: 0.375rem 0.5625rem;
  color: #ffffff;
  // background-color: #ff6f7d;
  display: inline-block;
  padding: 0.4em 0.8em;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>