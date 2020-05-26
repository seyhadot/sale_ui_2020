<template>
  <div class="action-form">
    <el-row>
      <el-col :span="24">
        <div class="flex justify-between items-center">
          <div class="w-4/12 flex">
            <form class="form-inline-search my-2 my-lg-0 mr-5">
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
                <input
                  type="text"
                  class="form-control product-search"
                  id="input-search"
                  placeholder="Search ..."
                  v-model="search"
                />
              </div>
            </form>
            <el-select v-model="filterTypeVal" clearable placeholder="All">
              <el-option
                v-for="item in filterTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button icon="uil-plus" type="primary" @click="handleCreateNew" class="btn-new-product"></el-button>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col :span="16">
        <!-- <div class="form-inline-search">
          <el-input v-model="search" placeholder="Search..."></el-input>
        </div>-->
      </el-col>
      <!-- Dialog -->
      <el-dialog title="Product Options" :visible.sync="dialogVisible">
        <el-form :model="ProductOptionsForm" :rules="rules" ref="product-options-form">
          <el-form-item label="Type" prop="type">
            <el-select v-model="ProductOptionsForm.type" placeholder="Select options">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Label" prop="label">
            <el-col :span="12">
              <el-input v-model="ProductOptionsForm.label" @keypress.native.enter="handleSave"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSave">Save</el-button>
        </span>
      </el-dialog>
      <!-- End dialog -->
    </el-row>
    <el-row>
      <div>
        <virtual-list :size="70" :remain="8">
          <item
            @item-action="handleItemAction"
            v-for="item of filteredProductOptionsArr"
            :key="item.id"
            :item="item"
          />
        </virtual-list>
      </div>
    </el-row>
  </div>
</template>


<script>
    import {provider} from "@/service/provider";
    import axios from 'axios';
    import item from './ProductOptionsItem';
    import virtualList from 'vue-virtual-scroll-list'

    export default {
        components: {'virtual-list': virtualList, item},
        data() {
            return {
                search: "",
                dialogVisible: false,
                id: null,
                ProductOptionsArr: [],
                filteredProductOptionsArr: [],
                filterTypeVal: "",
                typeOptions: [
                    {
                        label: "Flavor",
                        value: "flavor"
                    },
                    {
                        label: "Color",
                        value: "color"
                    },
                    {
                        label: "Shape",
                        value: "shape"
                    },
                    {
                        label: "Unit",
                        value: "unit"
                    }

                ],
                ProductOptionsForm: {
                    label: "",
                    type: "",
                    modifiedBy: ""
                },
                rules: {
                    label: [
                        {required: true, message: "Required", trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: "Required", trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            filterTypeOptions() {
                const c = this.typeOptions.map(o => o);
                c.unshift({label: "All", value: ""});
                return c;
            }
        },
        watch: {
            filterTypeVal(val) {
                this.handleFilerProductOptionsArray(val);

            },
            search(val) {
                this.handleFilerProductOptionsArray(this.filterTypeVal);
            }
        },
        methods: {
            handleCreateNew() {
                this.dialogVisible = true;
                this.id = "";
                for (let k in this.ProductOptionsForm) {
                    this.ProductOptionsForm[k] = "";
                }
            },
            handleItemAction(item) {
                if (item.action === 'edit') {
                    this.id = item.item._id;
                    for (let k in this.ProductOptionsForm) {
                        this.ProductOptionsForm[k] = item.item[k];
                    }
                    this.dialogVisible = true;
                } else {
                    this.handleRemoveItem(item.item);
                }
            },
            handleRemoveItem(item) {
                const {token, user} = this.$store.state.user;
                const removeUrl = `${provider.baseURL}${provider.prefix}/product-options/${item._id}/remove`;
                this.$alert(`Remove ${item.label}?`, 'Confirm', {
                    confirmButtonText: 'OK',
                    callback: action => {
                        if (action === 'confirm') {
                            axios.post(removeUrl, {
                                userId: user._id
                            }, {
                                headers: {
                                    token
                                }
                            })
                                .then((res) => {
                                    if (res.data.code === 201) {
                                        this.$message.success(`Removed ${item.label} `);
                                        this.fetchProductOptions();
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                })
                                .catch((err) => this.$message.error(err.message));
                        }
                    }
                });
            },
            handleFilerProductOptionsArray(val) {
                if (!!val) {
                    this.filteredProductOptionsArr = this.ProductOptionsArr.filter(o => o.type === val)
                        .filter(o => o.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
                } else {
                    this.filteredProductOptionsArr = this.ProductOptionsArr.filter(o => o.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
                }
            },

            handleSave() {
                const {token, user} = this.$store.state.user;
                const url = !this.id ? `${provider.baseURL}${provider.prefix}/product-options/add` : `${provider.baseURL}${provider.prefix}/product-options/${this.id}/edit`;
                this.$refs['product-options-form'].validate(valid => {
                    if (valid) {
                        this.ProductOptionsForm.modifiedBy = user._id;
                        axios.post(url, this.ProductOptionsForm, {
                            headers: {
                                token
                            }
                        })
                            .then((res) => {
                                if (res.data.code === 201) {
                                    if (!!this.id) {
                                        this.$message.success('updated');
                                        this.dialogVisible = false;
                                    } else {
                                        this.$message.success('added');
                                        this.ProductOptionsForm.label = "";
                                    }

                                    this.fetchProductOptions();
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch((err) => this.$message.error(err.message));
                    }
                })
            },
            fetchProductOptions() {
                const {token} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/product-options`;
                axios.get(url, {
                    headers: {
                        token
                    }
                }).then((res) => {
                    if (res.data.code === 201) {
                        this.ProductOptionsArr = res.data.data;
                        this.handleFilerProductOptionsArray(this.filterTypeVal);
                    } else {
                        this.$message.error(res.data.message
                        );
                    }
                })
                    .catch((err) => this.$message.error(err.message));
            }
        },
        created() {
            this.fetchProductOptions();
        }
    }
</script>
<style lang="scss" scoped>
.action-form {
  .el-input input.el-input__inner {
    background: #f6f6f6;
    border: 1px solid #f6f6f6;
    margin: 0px;
  }
}
</style>