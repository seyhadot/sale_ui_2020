<template>
  <content-box>
    <div class="table-responsive">
      <div class="card-header">
        <form class="form-inline flex justify-between mb-5">
          <label class="mr-sm-2 form-label">
            <h3 class="text-3xl font-bold text-bunting">{{ $route.meta.name }}</h3>
          </label>
          <el-button type="primary" @click="handleCreateProduct" icon="uil-plus" circle></el-button>
        </form>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th style="width: 18px;">
              <div class="custom-control custom-checkbox text-left">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
            </th>

            <th class="text-left">
              <a href="javascript:void(0)">Name</a>
            </th>

            <th class="text-left" style="width: 120px;">
              <a href="javascript:void(0)">Price</a>
            </th>
            <th style="width: 150px;">
              <a href="javascript:void(0)">Sku</a>
            </th>

            <th class="text-center" style="width: 80px;">
              <a href="javascript:void(0)">Category</a>
            </th>

            <th style="width: 37px;">Stock</th>

            <th style="width: 120px;">
              <a href="javascript:void(0)">Active</a>
            </th>
            <th style="width: 24px;" class="pl-0"></th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="o in products" :key="o._id">
            <td>
              <div>
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
            </td>

            <td>
              <div class="flex flex-no-wrap items-center rounded-full">
                <div class="avatar avatar-sm mr-3">
                  <slot v-if="o.productSource === 'facebook'">
                    <img :src="displayFacebookImageUrl(o.imageUrl)" class="avatar-img rounded-md" />
                  </slot>
                  <slot v-else>
                    <img :src="getImageUrl(o.imageUrl)" class="avatar-img rounded-md" style="height: 48px; width: 48px;" />
                  </slot>
                </div>
                <div>
                  <p class="mb-0">
                    <strong>{{ o.name }}</strong>
                  </p>
                  <small class="text-menu_low">lorna_kirlin@nora.biz</small>
                </div>
              </div>
            </td>
            <td>
              <span class="Price text-menu_low">{{ o.price | numeralGen(company) }}</span>
            </td>
            <td class="Number text-center text-menu_low">
              <span>{{ o.skewNumber }}</span>
            </td>
            <td>
              <span class="Category chip chip-outline-secondary">{{ o.categoryDoc.name }}</span>
            </td>

            <td class="text-center flex justify-center items-center">
              <span class="flex items-center text-center mt-3">
                <span class="w-4">12</span>
                <span class="flex ml-2 w-1 h-4 bg-red-500 rounded overflow-hidden">
                  <span class="h-3 flex w-full bg-red-200"></span>
                </span>
              </span>
            </td>

            <td class="text-menu_low text-center">
              <i class="uil-check text-3xl text-green-600"></i>
              <!-- <i class="uil-multiply text-xl font-bold text-gray-600"></i> -->
            </td>
            <td class="text-right">
              <el-row class="flex">
                <el-button @click="drawer = true" type="success" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </el-row>
              <!-- <a href class="text-gray-700">
                <i
                  class="flex items-center justify-center bg-menu_blue uil-ellipsis-v w-8 h-8 rounded-full"
                ></i>
              </a>-->
            </td>
            <div></div>
          </tr>
        </tbody>
      </table>
      <el-drawer title="Edit Product" size="60%" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
        <el-row class="flex mt-3 px-10" :gutter="40">
          <el-col :span="12">
            <label for>Order Name</label>
            <el-input clear placeholder="Please input" v-model="input"></el-input>
          </el-col>
          <el-col :span="12">
            <label for>My License Number</label>
            <el-input clear placeholder="Please input" v-model="input"></el-input>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </content-box>
</template>

<script>
import axios from 'axios'
import { provider } from '../../../service/provider'
import _ from 'lodash'
import ContentBox from '../../../components/ContentBoxNoBorder.vue'

export default {
  data() {
    return {
      checked: true,
      isLoading: true,
      total: 0,
      currentPage: 1,
      query: '',
      limit: 10,
      skip: 0,
      products: [],
      company: null,
      drawer: false,
      direction: 'rtl'
    }
  },
  components: {
    ContentBox
  },
  watch: {
    query: _.debounce(function (val) {
      this.fetchProduct()
    }, 300),
    currentPage(val) {
      this.skip = val * this.limit - this.limit
    },
    skip(val) {
      this.fetchProduct()
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure you want to close this?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    displayFacebookImageUrl(images) {
      if (images.length > 0) {
        return images[images.length - 4].url
      }
      return require('@/assets/img/no-image.png')
    },
    getImageUrl(images) {
      if (images.length > 0) {
        return `${images[0].url}?${images[0].token}`
      }
      return require('@/assets/img/no-image.png')
    },
    handleCreateProduct() {
      this.$router.push({ name: 'Add Product' })
    },
    fetchProduct() {
      const { token, activeStore } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/products?q=${this.query}&limit=${this.limit}&skip=${this.skip}&storeId=${activeStore}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.products = res.data.data
          }
        })
    },
    countProduct() {
      const { token, activeStore } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/products/count?storeId=${activeStore}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.total = res.data.data
          }
        })
    },
    handleRemoveProduct(product) {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/products/${product._id}/edit`
      product.createdBy = user._id
      product.status = 'archived'
      axios
        .post(url, product, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.$message.success('ប្រតិបត្តិការបានជោគជ័យ')
            this.products = this.products.filter((o) => o._id !== product._id)
            this.total -= 1
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {})
    },
    handleCommand(o, command) {
      console.log(command)
      if (command === 'edit') {
        this.$router.push(`/products/${o._id}/edit`)
      } else if (command === 'remove') {
        this.$alert(`ចង់លុបទំនិញ ${o.name}?`, 'បញ្ជាក់', {
          confirmButtonText: 'OK',
          callback: (action) => {
            if (action === 'confirm') {
              this.handleRemoveProduct(o)
            }
          }
        })
      } else if (command === 'printBarcode') {
        const { token, activeStore } = this.$store.state.user
        const url = this.$router.resolve({
          path: `/reports/product_barcode?barcode=${o.skewNumber}&token=${token}&activeStore=${activeStore}`
        })
        window.open(url.href, '_blank')
      }
    }
  },
  created() {
    this.fetchProduct()
    this.countProduct()
    const { company } = this.$store.state
    this.company = company
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  }
}
</script>
