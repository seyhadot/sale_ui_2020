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
                                    <circle cx="11" cy="11" r="8"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
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

                    </div>
                    <el-button icon="uil-plus" type="primary" @click="handleCreateNew"
                               class="btn-new-product"></el-button>
                </div>
            </el-col>
        </el-row>
        <br/>
        <el-row :gutter="10">
            <el-col :span="16">
                <!-- <div class="form-inline-search">
                  <el-input v-model="search" placeholder="Search..."></el-input>
                </div>-->
            </el-col>
            <!-- Dialog -->
            <el-dialog title="Table " :visible.sync="dialogVisible" >
                <el-form :model="tableForm" :rules="rules" ref="product-options-form">
                    <el-form-item label="Name" prop="name">
                        <el-col :span="12">
                            <el-input v-model="tableForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Number" prop="number">
                        <el-col :span="12">
                            <el-input-number v-model="tableForm.number"></el-input-number>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Chair" prop="chair">
                        <el-col :span="12">
                            <el-input-number v-model="tableForm.chair"></el-input-number>
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
                <item
                        @table-item-action="handleItemAction"
                        v-for="item of filteredTableArr"
                        :key="item.id"
                        :item="item"
                />
            </div>
        </el-row>
    </div>
</template>


<script>
  import { provider } from '@/service/provider'
  import axios from 'axios'
  import item from './TableDetailItem'

  export default {
    components: {
      item
    },
    data() {
      return {
        search: '',
        dialogVisible: false,
        id: null,
        TableArr: [],
        filteredTableArr: [],
        filterTypeVal: '',
        tableForm: {
          name: '',
          number: 0,
          chair: 0
        },
        rules: {
          name: [
            { required: true, message: 'Required', trigger: 'blur' }
          ],
          chair: [
            { required: true, message: 'Required', trigger: 'blur' }
          ],
          number: [
            { required: true, message: 'Required', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {

      search(val) {
        this.handleFilerTableArray()
      }
    },
    methods: {

      handleCreateNew() {
        this.dialogVisible = true
        this.id = ''
        for (let k in this.tableForm) {
          this.tableForm[k] = ''
        }
      },
      handleItemAction(item) {
        if (item.action === 'edit') {
          this.id = item.item._id
          for (let k in this.tableForm) {
            this.tableForm[k] = item.item[k]
          }
          this.dialogVisible = true
        } else {
          this.handleRemoveItem(item.item)
        }
      },
      handleRemoveItem(item) {
        const { token, user } = this.$store.state.user
        const removeUrl = `${provider.baseURL}${provider.prefix}/table/${item._id}/remove`
        this.$alert(`Remove ${item.name}?`, 'Confirm', {
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
                    this.$message.success(`Removed ${item.name} `)
                    this.fetchTable()
                  } else {
                    this.$message.error(res.data.message)
                  }
                })
                .catch((err) => this.$message.error(err.message))
            }
          }
        })
      },
      handleFilerTableArray() {
        this.filteredTableArr = this.TableArr.filter(o => o.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)

      },

      handleSave() {
        const { token, user, activeStore } = this.$store.state.user
        const url = `${provider.baseURL}${provider.prefix}/table/upsert`
        this.tableForm.createdBy = user._id
        this.tableForm.storeId = activeStore
        if (this.id) {
          this.tableForm._id = this.id;
        }
        this.$refs['product-options-form'].validate(valid => {
          if (valid) {
            this.tableForm.modifiedBy = user._id
            axios.post(url, this.tableForm, {
              headers: {
                token
              }
            })
              .then((res) => {
                if (res.data.code === 201) {
                  if (!!this.id) {
                    this.$message.success('updated')
                    this.dialogVisible = false
                  } else {
                    this.$message.success('added')
                    this.tableForm = {
                      name: '',
                      number: 0,
                      chair: 0
                    }
                  }

                  this.fetchTable()
                } else {
                  this.$message.error(res.data.message)
                }
              })
              .catch((err) => this.$message.error(err.message))
          }
        })
      },
      fetchTable() {
        const { token, activeStore, user } = this.$store.state.user
        const url = `${provider.baseURL}${provider.prefix}/table/all?store_id=${activeStore}`


        axios.get(url, {
          headers: {
            token
          }
        }).then((res) => {
          if (res.data.code === 201) {
            this.TableArr = res.data.data
            this.handleFilerTableArray(this.filterTypeVal)
          } else {
            this.$message.error(res.data.message
            )
          }
        })
          .catch((err) => this.$message.error(err.message))
      }
    },
    created() {
      this.fetchTable()
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
