<template>
  <content-box>
    <transition name="el-zoom-in-top">
      <el-row :gutter="20" v-show="true">
        <el-col :span="24">
          <el-form :model="customerModel" :rules="rules" ref="customerForm">
            <div class="card-box first-margin">
              <div class="flex right" style="text-align:right;padding-top:8px;">
                <el-col :span="24">
                  <router-link to="/transactions?activeName=3">
                    <font-awesome-icon icon="times" size="lg" style="color: #1f1f1f" />
                  </router-link>
                </el-col>
              </div>

              <div class="form-title border-b pb-3 text-blue-500">
                <h3 class="text-xl">{{displayTitle}}</h3>
              </div>
              <div class="card-body mt-5">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item :label="$t('customer.tableData.name')" prop="name">
                      <el-input v-model="customerModel.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('customer.tableData.tel')">
                      <el-input v-model="customerModel.tel"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item :label="$t('customer.tableData.desc')">
                      <el-input v-model="customerModel.desc" type="textarea" :rows="4"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item :label="$t('customer.tableData.store')" prop="name">
                      <el-select
                        v-model="customerModel.storeId"
                        :placeholder="$t('customer.selectStore')"
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
                </el-row>
                <el-row>
                  <!-- <el-form-item :label="$t('customer.tableData.status')"> -->
                  <el-form-item>
                    <el-switch
                      v-model="customerModel.isActive"
                      :active-text="$t('customer.tableData.isActive')"
                      :inactive-text="$t('customer.tableData.isDeactive')"
                    ></el-switch>
                  </el-form-item>
                </el-row>
              </div>
            </div>
          </el-form>
          <div class="action">
            <el-button type="warning" @click="handleSave">
              <i class="uil-check-circle mr-2"></i> 
              {{$t('customer.save')}}
            </el-button>
            <btn-cancel></btn-cancel>
          </div>
        </el-col>
      </el-row>
    </transition>
  </content-box>
</template>


<script>
    import axios from "axios";
    import {provider} from "@/service/provider";
    import ContentBox from '@/components/ContentBox.vue'
    import BtnCancel from '@/components/BtnCancel.vue'

    export default {
      components: {
        ContentBox,
        BtnCancel
      },
        data() {
            return {
                customerModel: {
                    _id: "",
                    name: "",
                    storeId: "",
                    isActive: true,
                    tel: "",
                    createdBy: "",
                    desc: ""
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: "តម្រូវអោយបំពេញ",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            handleSave() {
                this.$refs["customerForm"].validate(valid => {
                    if (valid) {
                        const {token, user} = this.$store.state.user;
                        const url = !!this.customerModel._id ? `${provider.baseURL}${provider.prefix}/customers/${this.customerModel._id}/edit` : `${provider.baseURL}${provider.prefix}/customers/add`;
                        this.customerModel.createdBy = user._id;
                        axios
                            .post(url, this.customerModel, {
                                headers: {
                                    token
                                }
                            })
                            .then(res => {
                                if (res.data.code === 201) {
                                    this.$message.success("ប្រតិបត្តិការជោគជ័យ");
                                    if (this.customerModel._id) {
                                        this.$router.push("/transactions?activeName=3");
                                    } else {
                                        Object.assign(this.$data, this.$options.data.apply(this)); //clear property after success
                                    }
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(err.message);
                            });
                    }
                });
            },
            fetchCustomerById(id) {
                const {token} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/customers/${id}`;
                axios
                    .get(url, {
                        headers: {
                            token
                        }
                    })
                    .then(res => {
                        if (res.data.code === 201) {
                            if (res.data.data) {
                                const d = res.data.data;
                                for (let k in this.customerModel) {
                                    this.customerModel[k] = d[k];
                                }
                            }
                        }
                    });
            }
        },
        computed: {
            displayTitle() {
                const {enName, khName} = this.$route.meta;
                switch (this.$store.state.defaultLocale) {
                    case "en":
                        return enName || "";
                    case "km":
                        return khName || "";
                }
            },
            storeOptions() {
                return this.$store.state.user.stores.map(map => ({
                    label: map.shortcutName,
                    value: map._id
                }));
            }
        },
        created() {
            const {id} = this.$route.params;
            if (id) {
                this.fetchCustomerById(id);
            }
        }
    };
</script>
