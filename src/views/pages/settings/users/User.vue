<template>
  <el-col :span="24" v-loading="isLoading">
    <el-row>
      <div class="action mb-5 flex justify-between">
        <el-button icon="el-icon-plus" type="warning" @click="handleGotoCreateUser">{{ $t('user.add') }}</el-button>
        <el-col :span="8">
          <el-input v-model="search" size="large" class="search" :placeholder="$t('user.tableData.search')" clearable />
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-table :data="tableData.filter((data) => !search || data.username.toLowerCase().includes(search.toLowerCase()))" @row-click="handleClick">
        <el-table-column :label="$t('user.tableData.accountName')" prop="username"></el-table-column>
        <el-table-column :label="$t('user.tableData.createdAt')">
          <template slot-scope="scope">{{ scope.row.createdAt | moment('DD/MM/YYYY HH:mm') }}</template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.status')">
          <template slot-scope="scope">{{ scope.row.profile.approved ? 'បានអនុញ្ញាត' : 'មិនទាន់បានអនុញ្ញាត' }}</template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.roles')">
          <template slot-scope="scope">
            <span :key="role" v-for="role in scope.row.roles">
              <el-tag type="warning" class="mr-2">
                {{ role }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.tableData.stores')">
          <template slot-scope="scope">
            <el-tag :key="store._id" v-for="store in scope.row.stores">
              {{ store.name }}
            </el-tag>
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
