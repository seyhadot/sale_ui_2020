<template>
    <div>
        <div class="bgdark"></div>
        <div class="container">
            <transition name="el-zoom-in-top">
                <el-row :gutter="20" v-show="true">
                    <el-col :span="18" :offset="3">
                        <el-row>
                            <el-form :model="editUserForm" :rules="rules" ref="editUser">
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
                                        <h5>កែប្រែអ្នកប្រើប្រាស់</h5>
                                    </div>
                                    <div class="card-body">
                                        <el-row>
                                            <el-col :span="24">
                                                <el-form-item :label="$t('user.tableData.tel')" prop="tel">
                                                    <el-input type="number" v-model="editUserForm.tel" placeholder="15427757"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="16">
                                            <el-col :span="12">
                                                <el-form-item :label="$t('user.chooseStores')">
                                                    <el-select
                                                            v-model="editUserForm.stores"
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
                                </div>
                            </el-form>
                            <div class="card-button first-margin">
                                <div class="card-header" style="padding-left:0px;">
                                    <el-button
                                            class="s__btn"
                                            @click="dialogFormVisible=true"
                                            :loading="isLoading"
                                    >{{$t("user.changePassword")}}</el-button>
                                    <el-button
                                            type="primary"
                                            @click="handleSubmit"
                                            :loading="isLoading"
                                    >{{$t("user.edit")}}</el-button>
                                </div>
                            </div>
                        </el-row>
                    </el-col>
                    <!--Modal change password-->
                    <el-dialog :title="$t('user.changePassword')" :visible.sync="dialogFormVisible">
                        <el-form :model="changePasswordForm" :rules="rules" ref="changePass">
                            <el-form-item :label="$t('user.password')" prop="password">
                                <el-input type="password" v-model="changePasswordForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.changePassword')" prop="confirmPassword">
                                <el-input
                                        type="password"
                                        v-model="changePasswordForm.confirmPassword"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleChangePassword">{{$t('user.changePassword')}}</el-button>
            </span>
                    </el-dialog>
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
        } else if (value !== this.changePasswordForm.password) {
          callback(new Error("ពាក្យសម្ងាត់មិនត្រូវគ្នា"));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
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
            { required: true, message: "តម្រូវអោយបំពេញ", trigger: "blur" },
            { min: 5, message: "តិចបំផុត​ ៥ អក្សរ", trigger: "blur" }
          ],
          tel: [
            { required: true, message: "តម្រូវអោយបំពេញ", trigger: "blur" },
            {
              min: 8,
              max: 11,
              message: "តិចបំផុត​ ៨ លេខ ច្រើនបំផុត​ ១១ លេខ",
              trigger: "blur"
            }
          ],
          password: [
            { required: true, message: "តម្រូវអោយបំពេញ", trigger: "blur" }
          ],
          confirmPassword: [
            { required: true, message: "តម្រូវអោយបំពេញ", trigger: "blur" },
            { validator: validConfirmPass, trigger: "blur" }
          ]
        },
        changePasswordForm: {
          password: "",
          confirmPassword: ""
        },
        editUserForm: {
          username: "",
          password: "",
          confirmPassword: "",
          tel: "",
          profile: {
            approved: true
          },
          stores: [],
          roles: [],
          modules: []
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
              this.storeOptions = data.data;
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      },
      handleSubmit() {
        const { token, user } = this.$store.state.user;
        const { id } = this.$route.params;
        const url = `${provider.baseURL}/user/update/${id}/r/${user._id}`;
        this.$refs["editUser"].validate(valid => {
          if (valid) {
            this.isLoading = true;
            if(this.editUserForm.modules.length === 0) {
              this.editUserForm.modules.push(this.$store.state.defaultModule);
            }
            axios
              .post(url, this.editUserForm, {
                headers: {
                  token
                }
              })
              .then(res => {
                if (res.data.code === 201) {
                  this.$message.success("កែប្រែបានជោគជ័យ");
                  this.isLoading = false;
                  this.$router.push("/settings");
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
      },
      handleChangePassword() {
        const { token, user } = this.$store.state.user;
        const { id } = this.$route.params;
        const url = `${provider.baseURL}/user/update/${id}/r/${
          user._id
        }/change_password`;
        this.$refs["changePass"].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
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
              .then(res => {
                if (res.data.code === 201) {
                  this.$message.success("ប្តូរពាក្យសម្ងាត់បានជោគជ័យ");
                  this.$router.push("/settings");
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(er => {
                this.$message.error(er.message);
              });
          }
        });
      },
      fetchProfile(id) {
        const { token, user } = this.$store.state.user;
        const url = `${provider.baseURL}/user/profile`;
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
          .then(res => {
            if (res.data.code === 201) {
              let data = res.data.data;
              for (let k in this.editUserForm) {
                this.editUserForm[k] = data[k];
              }
            }
          })
          .catch(er => {
            this.$message.error(er);
          });
      }
    },
    created() {
      const { id } = this.$route.params;
      this.fetchProfile(id);
      this.fetchStores();
    }
  };
</script>


<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Battambang|Bokor|Chenla|Kantumruy|Kdam+Thmor|Khmer|Nokora|Odor+Mean+Chey|Roboto|Taprom");

    .bgdark {
        background-color: #1f1f1f !important;
        height: 230px;
    }
    .card-box {
        transition: box-shadow ease 0.2s;
        box-shadow: 0 25px 50px rgba(8, 21, 66, 0.06);
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        border: 0 solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        background-color: #fff;
        background-clip: border-box;
        .card-header {
            margin-bottom: 0;
            padding: 0.75rem 1.25rem;
            color: inherit;
            border-bottom: 0 solid rgba(0, 0, 0, 0.125);
            background-color: transparent;
            h5 {
                font-size: 1.125rem;
                margin: 0px;
                font-family: "Chenla", "Roboto", cursive;
                font-weight: bold;
            }
            p {
                color: #8492a6 !important;
                font-style: italic;
                margin: 0;
                font-size: 0.925rem;
            }
        }
        .card-body {
            padding: 0.75rem 1.25rem;
        }
    }

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
    .el-upload {
        display: block;
        text-align: center;
        cursor: pointer;
        outline: none;
    }
    .el-upload-dragger {
        width: 100%;
        height: 130px;
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
    .s__btn {
        border-color: #f76613 !important;
        background-color: #f76613;
        color: #fff;
        &:hover {
            background-color: #f76613;
            border-color: #f76613 !important;
            opacity: 0.8;
            color: #fff;
        }
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
