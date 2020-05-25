<template>
  <transition name="el-zoom-in-top">
    <content-box>
      <div v-show="true">
        <el-form :model="editUserForm" :rules="rules" ref="editUser">
          <el-col :span="24">
            <router-link to="/settings?activeName=0">
              <font-awesome-icon icon="times" size="lg" />
            </router-link>
          </el-col>
          <div class="form-title border-b pb-3">
            <h3 class="text-xl">កែប្រែអ្នកប្រើប្រាស់</h3>
          </div>
          <div class="card-body mt-5">
            <el-row :gutter="40">
              <el-col :xs="24" :sm="12" :lg="8">
                <el-form-item :label="$t('user.tableData.tel')" prop="tel">
                  <el-input type="number" v-model="editUserForm.tel" placeholder="15427757"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="12" :lg="8">
                <el-form-item :label="$t('user.chooseStores')">
                  <el-select
                    v-model="editUserForm.stores"
                    multiple
                    :placeholder="$t('user.chooseStores')"
                  >
                    <el-option
                      v-for="item in storeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8">
                <el-form-item :label="$t('user.chooseRoles')">
                  <el-select
                    v-model="editUserForm.roles"
                    multiple
                    :placeholder="$t('user.chooseRoles')"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in rolesOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-switch
                v-model="editUserForm.profile.approved"
                :active-text="$t('user.approved')"
                inactive-text
              ></el-switch>
            </el-row>
          </div>
        </el-form>

        <div
          class="action flex justify-between"
        >
          <div class="">
            <el-button
              type="warning"
              @click="handleSubmit"
              :loading="isLoading"
            > <i class="uil-check-circle mr-2"></i> {{ $t('user.edit') }}</el-button>
            <el-button
              type="success"
              @click="dialogFormVisible = true"
              :loading="isLoading"
            ><i class="uil-keyhole-circle"></i> {{ $t('user.changePassword') }}</el-button>
          </div>
          <btn-cancel></btn-cancel>
        </div>

        <!--Modal change password-->
        <el-dialog :visible.sync="dialogFormVisible">
          <div class="form-title border-b pb-3 mb-5">
            <h3 class="text-xl">{{ $t('user.changePassword') }}</h3>
          </div>
          <el-form :model="changePasswordForm" :rules="rules" ref="changePass">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('user.password')" prop="password">
                  <el-input
                    type="password"
                    v-model="changePasswordForm.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('user.changePassword')" prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="changePasswordForm.confirmPassword"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="action mt-5">
            <el-button type="warning" @click="handleChangePassword">
              <i class="uil-check-circle mr-2"></i>
              {{ $t('user.changePassword') }}
            </el-button>
          </div>
        </el-dialog>
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
      } else if (value !== this.changePasswordForm.password) {
        callback(new Error('ពាក្យសម្ងាត់មិនត្រូវគ្នា'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
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
          { required: true, message: 'តម្រូវអោយបំពេញ', trigger: 'blur' },
          { min: 5, message: 'តិចបំផុត​ ៥ អក្សរ', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: 'តម្រូវអោយបំពេញ', trigger: 'blur' },
          {
            min: 8,
            max: 11,
            message: 'តិចបំផុត​ ៨ លេខ ច្រើនបំផុត​ ១១ លេខ',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: 'តម្រូវអោយបំពេញ', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: 'តម្រូវអោយបំពេញ', trigger: 'blur' },
          { validator: validConfirmPass, trigger: 'blur' }
        ]
      },
      changePasswordForm: {
        password: '',
        confirmPassword: ''
      },
      editUserForm: {
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
            this.storeOptions = data.data
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    handleSubmit() {
      const { token, user } = this.$store.state.user
      const { id } = this.$route.params
      const url = `${provider.baseURL}/user/update/${id}/r/${user._id}`
      this.$refs['editUser'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          let { modules } = this.editUserForm;
          if (!modules || modules.length === 0) {
            if(!modules) {
              modules = [this.$store.state.defaultModule];
            } else {
              modules.push(this.$store.state.defaultModule);
            }
          }
          axios
            .post(url, this.editUserForm, {
              headers: {
                token
              }
            })
            .then((res) => {
              if (res.data.code === 201) {
                this.$message.success('កែប្រែបានជោគជ័យ')
                this.isLoading = false
                this.$router.push('/settings')
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
    },
    handleChangePassword() {
      const { token, user } = this.$store.state.user
      const { id } = this.$route.params
      const url = `${provider.baseURL}/user/update/${id}/r/${user._id}/change_password`
      this.$refs['changePass'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          axios
            .post(
              url,
              {
                password: this.changePasswordForm.password
              },
              {
                headers: {
                  token
                }
              }
            )
            .then((res) => {
              if (res.data.code === 201) {
                this.$message.success('ប្តូរពាក្យសម្ងាត់បានជោគជ័យ')
                this.$router.push('/settings')
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((er) => {
              this.$message.error(er.message)
            })
        }
      })
    },
    fetchProfile(id) {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}/user/profile`
      axios
        .post(
          url,
          { _id: id, requestId: user._id },
          {
            headers: {
              token
            }
          }
        )
        .then((res) => {
          if (res.data.code === 201) {
            let data = res.data.data
            for (let k in this.editUserForm) {
              this.editUserForm[k] = data[k]
            }
          }
        })
        .catch((er) => {
          this.$message.error(er)
        })
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchProfile(id)
    this.fetchStores()
  }
}
</script>
