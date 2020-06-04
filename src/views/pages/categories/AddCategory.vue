<template>
  <content-box>
    <div class="bg-white px-10 pt-0 pb-10">
      <transition name="el-zoom-in-top">
        <el-row :gutter="40" v-show="true">
          <el-col :span="24">
            <el-form :model="categoryModel" :rules="rules" ref="categoryForm">
              <div class="card-box first-margin">
                <el-col :span="24">
                  <router-link to="/settings?activeName=3">
                    <font-awesome-icon icon="times" size="lg" style="color: #1f1f1f;" />
                  </router-link>
                </el-col>
                <!-- <div class="card-header">
                  <h5>{{ displayTitle }}</h5>
                  <p>{{ $t('form.hint') }}</p>
                </div>-->

                <div class="form-title border-b pb-3 mt-5">
                  <h3 class="text-xl text-blue-500">{{ $t('category.add') }}</h3>
                </div>
                <div class="card-body mt-5">
                  <el-row :gutter="40">
                    <el-col :sm="24" :lg="12">
                      <el-form-item :label="$t('category.tableData.name')" prop="name">
                        <el-input v-model="categoryModel.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :sm="24" :lg="12">
                      <el-form-item :label="$t('category.tableData.desc')">
                        <el-input v-model="categoryModel.desc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :sm="24" :lg="12">
                      <el-form-item label="Price">
                        <el-input v-model="categoryModel.price"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                    <el-form-item>
                      <!-- <label for="">{{$t('category.tableData.status')}}</label> -->
                      <el-switch
                        v-model="categoryModel.isUsable"
                        :active-text="$t('category.tableData.unusable')"
                        :inactive-text="$t('category.tableData.usable')"
                      ></el-switch>
                    </el-form-item>

                </div>
              </div>
            </el-form>
            <div class="card-button first-margin mt-5">
              <div class="card-header" style="padding-left: 0px;">
                <el-button type="primary" @click="handleSave">{{ $t('category.save') }}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </transition>
    </div>
  </content-box>
</template>

<script>
import axios from 'axios'
import { provider } from '../../../service/provider'
import ContentBox from '@/components/ContentBoxNoBorder.vue'

export default {
  data() {
    return {
      categoryModel: {
        _id: '',
        name: '',
        desc: '',
        isUsable: true,
        price: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: 'តម្រូវអោយបំពេញ',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    ContentBox,
  },
  methods: {
    handleSave() {
      this.$refs['categoryForm'].validate((valid) => {
        if (valid) {
          const { token, user, activeStore } = this.$store.state.user
          const url = `${provider.baseURL}${provider.prefix}/categories/upsert`
          this.categoryModel.createdBy = user._id
          this.categoryModel.storeId = activeStore
          axios
            .post(url, this.categoryModel, {
              headers: {
                token
              }
            })
            .then((res) => {
              if (res.data.code === 201) {
                this.$message.success('ប្រតិបត្តិការជោគជ័យ')
                this.$router.push('/categories')
                if (this.categoryModel._id) {
                  this.$router.push('/settings?activeName=3')
                } else {
                  Object.assign(this.$data, this.$options.data.apply(this)) //clear property after success
                }
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        }
      })
    },
    fetchCategoryById(id) {
      const { token } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/categories/${id}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            if (res.data.data.length > 0) {
              const d = res.data.data[0]
              for (let k in this.categoryModel) {
                if (k === 'price') {
                  this.categoryModel[k] = d[k] || 0
                } else {
                  this.categoryModel[k] = d[k]
                }
              }
            }
          }
        })
    }
  },
  computed: {
    displayTitle() {
      const { enName, khName } = this.$route.meta
      switch (this.$store.state.defaultLocale) {
        case 'en':
          return enName || ''
        case 'km':
          return khName || ''
      }
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.fetchCategoryById(id)
    }
  }
}
</script>
