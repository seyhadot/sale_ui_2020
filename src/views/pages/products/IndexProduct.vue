<template>
  <content-box>
    <div class="table-responsive">
      <div class="card-header">
        <div class="flex justify-between items-center mb-4">
          <el-col :span="5">
            <form class="form-inline-search my-2 my-lg-0">
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
                <input type="text" class="form-control product-search" id="input-search" placeholder="Search ..." />
              </div>
            </form>
          </el-col>

          <!-- <div>
            <el-button type="primary" @click="handleCreateProduct" icon="uil-web-grid text-xl" class="btn-category"></el-button>
            <el-button type="primary" @click="handleCreateProduct" icon="icon-feather-archive text-xl" class="btn-product-option"></el-button>
            <el-button type="primary" @click="handleCreateProduct" icon="uil-print text-2xl" class="btn-new-print"></el-button>
          </div> -->
          <el-button type="primary" @click="handleCreateProduct" icon="icon-feather-plus text-xl" class="btn-new-product"></el-button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr class="t-head">
            <th style="width: 18px;">
              <div class="custom-control my-checkbox custom-checkbox text-left">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
            </th>

            <th class="text-left">
              <a href="#">Name</a>
            </th>

            <th class="text-left" style="width: 120px;">
              <a href="#">Price</a>
            </th>
            <th style="width: 150px;">
              <a href="#">Sku</a>
            </th>

            <th class="text-center" style="width: 80px;">
              <a href="#">Category</a>
            </th>

            <th style="width: 37px;">Stock</th>

            <th style="width: 120px;">
              <a href="#">Active</a>
            </th>
            <th style="width: 24px;" class="pl-0">
              <el-button type icon="el-icon-delete" class="bg-red-600 text-white hover:text-red-700 hover:border-red-700" circle></el-button>
            </th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="o in products" :key="o._id">
            <td>
              <div class="my-checkbox">
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
              <span class="text-menu_low">{{ o.price | numeralGen(storeObj) }}</span>
            </td>
            <td class="Number text-center text-menu_low">
              <span>{{ o.skewNumber }}</span>
            </td>
            <td>
              <span class="Category chip chip-outline-secondary">{{ o.categoryDoc.name }}</span>
            </td>

            <td class="flex justify-center">
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
                <el-button @click="handleEdit(o)" type="success" icon="el-icon-edit" circle></el-button>
              </el-row>
            </td>
          </tr>
        </tbody>
      </table>
      <el-drawer :before-close="handleClose" size="60%" :direction="direction" custom-class="demo-drawer" ref="drawer" title="Edit Product" :visible.sync="drawer">
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-row class="flex mt-3 flex-col h-full px-10" :gutter="40">
              <!-- Edit by kevin-->
              <edit-product :fn-fetch-product="fetchProduct" :product="currentSelectedProduct" :title="title"></edit-product>
            </el-row>
          </el-form>
          <!-- <div class="demo-drawer__footer px-10 action action_draw pb-5">
            <el-button
              type="warning"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
            >{{ loading ? 'Submitting ...' : 'Submit' }}</el-button>
            <el-button @click="$refs.drawer.closeDrawer()" class="ml-5">Cancel</el-button>

          </div>-->
        </div>
      </el-drawer>
    </div>
  </content-box>
</template>

<script>
import axios from 'axios'
import { provider } from '@/service/provider'
import _ from 'lodash'
import ContentBox from '@/components/ContentBoxNoBorder.vue'
import EditProduct from './EditProduct'
export default {
  data() {
    return {
      form: {},
      loading: false,
      input: '',
      checked: false,
      isLoading: true,
      total: 0,
      currentPage: 1,
      title: '',
      query: '',
      limit: 10,
      skip: 0,
      products: [],
      company: null,
      drawer: false,
      direction: 'rtl',
      currentSelectedProduct: null
    }
  },
  components: {
    EditProduct,
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
    handleEdit(product) {
      this.title = 'Edit ' + product.name
      this.currentSelectedProduct = product
      this.drawer = true
    },
    handleClose(done) {
      done()
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
            this.drawer = false
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
  computed: {
    storeObj() {
      const { activeStore, stores } = this.$store.state.user
      return stores.find((o) => o._id === activeStore)
    }
  },
  created() {
    this.fetchProduct()
    this.countProduct()
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  }
}
</script>
