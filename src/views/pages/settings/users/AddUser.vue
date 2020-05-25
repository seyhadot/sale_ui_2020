<template>
  <transition name="el-zoom-in-top">
    <content-box>
      <div class="content-card bg-white" v-show="true">
        <el-form :model="createUserForm" :rules="rules" ref="createUser">
          <el-col :span="24">
            <router-link to="/settings?activeName=0">
              <font-awesome-icon icon="times" size="lg" />
            </router-link>
          </el-col>

          <div class="form-title border-b pb-3">
            <h3 class="text-xl text-blue-500">{{ $t('user.add') }}</h3>
          </div>

          <div class="card-body mt-5">
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item :label="$t('user.tableData.accountName')" prop="username">
                  <el-input v-model="createUserForm.username" placeholder="Username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('user.tableData.tel')" prop="tel">
                  <el-input type="number" v-model="createUserForm.tel" placeholder="000-000-0000"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('user.password')" prop="password">
                  <el-input type="password" v-model="createUserForm.password" :placeholder="$t('user.password')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('user.confirmPassword')" prop="confirmPassword">
                  <el-input type="password" v-model="createUserForm.confirmPassword" :placeholder="$t('user.confirmPassword')"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('user.chooseStores')">
                  <el-select v-model="createUserForm.stores" multiple :placeholder="$t('user.chooseStores')" style="width: 100%;">
                    <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('user.chooseRoles')">
                  <el-select v-model="createUserForm.roles" multiple :placeholder="$t('user.chooseRoles')">
                    <el-option v-for="item in rolesOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-switch v-model="createUserForm.profile.approved" :active-text="$t('user.approved')" inactive-text></el-switch>
          </div>
          <div class="action mt-5">
            <el-button type="warning" @click="handleSubmit" :loading="isLoading">
              <i class="uil-check-circle mr-2"></i>
              {{ $t('user.add') }}</el-button>
            <btn-cancel></btn-cancel>
          </div>
        </el-form>
      </div>
    </content-box>
  </transition>
</template>

<script>
import { provider } from '@/service/provider'
import axios from 'axios'
import ContentBox from '@/components/ContentBox.vue'
import BtnCancel from '@/components/BtnCancel.vue'

export default {
  data() {
    let validConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('តម្រូវអោយបំពេញ'))
      } else if (value !== this.createUserForm.password) {
        callback(new Error('ពាក្យសម្ងាត់មិនត្រូវគ្នា'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      storeOptions: [],
      rolesOptions: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'GM',
          value: 'gm'
        },
        {
          label: 'Decore',
          value: 'decore'
        },
        {
          label: 'Cashier',
          value: 'cashier'
        },
        {
          label: 'Customer',
          value: 'customer'
        }
      ],
      rules: {
        username: [
          { required: true, message: this.$i18n.t('required'), trigger: 'blur' },
          { min: 5, message: 'តិចបំផុត​ ៥ អក្សរ', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$i18n.t('required'), trigger: 'blur' },
          {
            min: 8,
            max: 11,
            message: 'តិចបំផុត​ ៨ លេខ ច្រើនបំផុត​ ១១ លេខ',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: this.$i18n.t('required'), trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: this.$i18n.t('required'), trigger: 'blur' },
          { validator: validConfirmPass, trigger: 'blur' }
        ]
      },
      createUserForm: {
        username: '',
        password: '000000',
        confirmPassword: '000000',
        tel: '',
        profile: {
          approved: true
        },
        stores: [],
        roles: [],
        modules: []
      }
    }
  },
  components: {
    ContentBox,
    BtnCancel
  },
  methods: {
    fetchStores() {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/store/all`
      axios
        .post(
          `${url}`,
          {
            requestId: user._id
          },
          {
            headers: {
              token: token
            }
          }
        )
        .then((response) => {
          const data = response.data
          if (data.code == 403) {
            this.$message.error(data.message)
          } else {
            console.log(user.stores)
            this.storeOptions = data.data.filter((s) => user.stores.map((store) => store._id).includes(s.value))
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    handleSubmit() {
      const { token } = this.$store.state.user
      const url = `${provider.baseURL}/user/create`
      this.$refs['createUser'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          if (this.createUserForm.modules.length === 0) {
            this.createUserForm.modules.push(this.$store.state.defaultModule)
          }
          axios
            .post(url, this.createUserForm, {
              headers: {
                token
              }
            })
            .then((res) => {
              if (res.data.code === 201) {
                this.$message.success('បង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ')
                this.$router.push('/settings')
                this.createUserForm = {
                  username: '',
                  password: '',
                  confirmPassword: '',
                  tel: '',
                  profile: {
                    approved: true
                  },
                  stores: [],
                  roles: [],
                  modules: []
                }
                this.isLoading = false
              } else {
                this.$message.error(res.data.message)
                this.isLoading = false
              }
            })
            .catch((er) => {
              this.$message.error(er.message)
              this.isLoading = false
            })
        }
      })
    }
  },
  created() {
    this.fetchStores()
  }
}
</script>
