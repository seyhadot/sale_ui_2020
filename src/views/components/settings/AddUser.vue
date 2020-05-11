<template>
    <div>
        <div class="bgdark"></div>
        <div class="container">
            <transition name="el-zoom-in-top">
                <el-row :gutter="20" v-show="true">
                    <el-col :span="18" :offset="3">
                        <el-row>
                            <el-form :model="createUserForm" :rules="rules" ref="createUser">
                                <div class="card-box first-margin">
                                    <div
                                            class="flex right"
                                            style="text-align:right;padding-top:8px;padding-right: 8px;"
                                    >
                                        <el-col :span="24">
                                            <router-link to="/settings?activeName=0">
                                                <font-awesome-icon icon="times" size="lg" style="color: #1f1f1f"/>
                                            </router-link>
                                        </el-col>
                                    </div>
                                    <div class="card-header">
                                        <h5>{{$t('user.add')}}</h5>
                                        <p>{{$t('user.addHint')}}</p>
                                    </div>
                                    <div class="card-body">
                                        <el-row :gutter="16">
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.tableData.accountName')" prop="username">
                                                    <el-input v-model="createUserForm.username" placeholder="Kevin"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.tableData.tel')" prop="tel">
                                                    <el-input
                                                            type="number"
                                                            v-model="createUserForm.tel"
                                                            placeholder="15427757"
                                                    ></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="16">
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.password')" prop="password">
                                                    <el-input
                                                            type="password"
                                                            v-model="createUserForm.password"
                                                            :placeholder="$t('user.password')"
                                                    ></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.confirmPassword')" prop="confirmPassword">
                                                    <el-input
                                                            type="password"
                                                            v-model="createUserForm.confirmPassword"
                                                            :placeholder="$t('user.confirmPassword')"
                                                    ></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="16">
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.chooseStores')">
                                                    <el-select
                                                            v-model="createUserForm.stores"
                                                            multiple
                                                            :placeholder="$t('user.chooseStores')"
                                                            style="width: 100%;"
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
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.chooseRoles')">
                                                    <el-select
                                                            v-model="createUserForm.roles"
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
                                                    v-model="createUserForm.profile.approved"
                                                    :active-text="$t('user.approved')"
                                                    inactive-text
                                            ></el-switch>
                                        </el-row>
                                    </div>
                                </div>
                            </el-form>
                            <div class="card-button first-margin">
                                <div class="card-header" style="padding-left:0px;">
                                    <el-button
                                            type="primary"
                                            @click="handleSubmit"
                                            :loading="isLoading"
                                    >{{$t('user.add')}}</el-button>
                                </div>
                            </div>
                        </el-row>
                    </el-col>
                </el-row>
            </transition>
        </div>
    </div>
</template>

<script>
  import { provider } from "@/service/provider";
  import axios from "axios";

  export default {
    data() {
      let validConfirmPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("តម្រូវអោយបំពេញ"));
        } else if (value !== this.createUserForm.password) {
          callback(new Error("ពាក្យសម្ងាត់មិនត្រូវគ្នា"));
        } else {
          callback();
        }
      };
      return {
        isLoading: false,
        storeOptions: [],
        rolesOptions: [
          {
            label: "Admin",
            value: "admin"
          },
          {
            label: "GM",
            value: "gm"
          },
          {
            label: "Decore",
            value: "decore"
          },
          {
            label: "Cashier",
            value: "cashier"
          },
          {
            label: "Customer",
            value: "customer"
          }
        ],
        rules: {
          username: [
            { required: true, message: this.$i18n.t('required'), trigger: "blur" },
            { min: 5, message: "តិចបំផុត​ ៥ អក្សរ", trigger: "blur" }
          ],
          tel: [
            { required: true, message: this.$i18n.t('required'), trigger: "blur" },
            {
              min: 8,
              max: 11,
              message: "តិចបំផុត​ ៨ លេខ ច្រើនបំផុត​ ១១ លេខ",
              trigger: "blur"
            }
          ],
          password: [
            { required: true, message: this.$i18n.t('required'), trigger: "blur" }
          ],
          confirmPassword: [
            { required: true, message: this.$i18n.t('required'), trigger: "blur" },
            { validator: validConfirmPass, trigger: "blur" }
          ]
        },
        createUserForm: {
          username: "",
          password: "",
          confirmPassword: "",
          tel: "",
          profile: {
            approved: true
          },
          stores: [],
          roles: [],
          modules: [],
        }
      };
    },
    methods: {
      fetchStores() {
        const { token, user } = this.$store.state.user;
        const url = `${provider.baseURL}${provider.prefix}/store/all`;
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
          .then(response => {
            const data = response.data;
            if (data.code == 403) {
              this.$message.error(data.message);
            } else {
              console.log(user.stores);
              this.storeOptions = data.data.filter(s => user.stores.map(store => store._id).includes(s.value));
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      },
      handleSubmit() {
        const { token } = this.$store.state.user;
        const url = `${provider.baseURL}/user/create`;
        this.$refs["createUser"].validate(valid => {
          if (valid) {
            this.isLoading = true;
            if(this.createUserForm.modules.length === 0) {
              this.createUserForm.modules.push(this.$store.state.defaultModule);
            }
            axios
              .post(url, this.createUserForm, {
                headers: {
                  token
                }
              })
              .then(res => {
                if (res.data.code === 201) {
                  this.$message.success("បង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ");
                  this.createUserForm = {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    tel: "",
                    profile: {
                      approved: true
                    },
                    stores: [],
                    roles: [],
                    modules: [],
                  };
                  this.isLoading = false;
                } else {
                  this.$message.error(res.data.message);
                  this.isLoading = false;
                }
              })
              .catch(er => {
                this.$message.error(er.message);
                this.isLoading = false;
              });
          }
        });
      }
    },
    created() {
      this.fetchStores();
    }
  };
</script>

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Battambang|Bokor|Chenla|Kantumruy|Kdam+Thmor|Khmer|Nokora|Odor+Mean+Chey|Roboto|Taprom");

    .card-button {
        transition: box-shadow ease 0.2s;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        .card-header {
            margin-bottom: 0;
            padding: 0.75rem 1.25rem;
            color: inherit;
            border-bottom: 0 solid rgba(0, 0, 0, 0.125);
            background-color: transparent;
        }
    }

    .first-margin {
        margin: 30px 10px 30px 35px;
    }
    .second-margin {
        margin: 30px 30px 30px 5px;
    }
    .lmargin {
        margin: 30px 10px 30px 35px;
    }
    .container {
        margin-top: -220px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
    }

    .el-switch.is-checked .el-switch__core {
        border-color: #1f1f1f;
        background-color: #1f1f1f;
    }
    .el-switch__label.is-active {
        color: #1f1f1f;
    }
    @media (min-width: 1200px) {
        .container {
            max-width: 1140px;
        }
    }
</style>
