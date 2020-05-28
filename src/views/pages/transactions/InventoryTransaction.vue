<template>
  <el-row>
    <el-button icon="el-icon-plus" type="primary" @click="handleAddStock">Add Stock</el-button>

    <el-dialog title="Add Stock" :visible.sync="addStockDialog" @close="handleOnClose">
      <el-form :model="stockForm" :rules="rules" ref="stock-form-ref">
        <el-form-item label="Select Product">
          <el-autocomplete
            ref="addStock"
            style="width: 100%;"
            v-model="stockForm.stockProductName"
            :fetch-suggestions="querySearch"
            placeholder="Spray.."
            :trigger-on-focus="false"
            clearable
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="Stock Type" prop="type">
              <el-select v-model="stockForm.type" style="width: 100%;" placeholder="Select Type">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QTY" prop="qty">
              <el-input-number style="width: 100%;" v-model="stockForm.qty"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="Description" prop="desc">
              <el-input v-model="stockForm.desc" type="textarea" rows="3" placeholder="Write something..."></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStockDialog = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </span>
    </el-dialog>

    <!--Table Data-->
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="productDoc.name" label="Product" width="180"> </el-table-column>
      <el-table-column prop="in" label="Qty In" width="180"> </el-table-column>
      <el-table-column prop="out" label="Qty Out"> </el-table-column>
      <el-table-column prop="productDoc.qtyOnHand" label="Qty On Hand"> </el-table-column>
      <el-table-column label="Timestamp">
        <template slot-scope="scope">
          {{ scope.row.timestamp | moment('YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button type="text" @click="handleRemove(scope.$index, scope.row)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination background :current-page.sync="page" layout="total,prev, pager, next" :total="total"> </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { provider } from '@/service/provider'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      page: 1,
      total: 0,
      tableData: [],
      typeOptions: [
        {
          label: 'Stock In',
          value: 'in'
        },
        {
          label: 'Stock Out',
          value: 'out'
        }
      ],
      stockForm: {
        productId: '',
        desc: '',
        type: 'in',
        qty: 1,
        stockProductName: ''
      },
      rules: {
        product: [
          {
            required: true,
            message: 'Required',
            trigger: 'blur'
          }
        ],
        qty: [
          {
            required: true,
            message: 'required',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: 'Required',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Required',
            trigger: 'blur'
          }
        ]
      },
      addStockDialog: false
    }
  },
  watch: {
    page(val) {
      this.fetchProductStock()
    }
  },
  methods: {
    handleRemove(index, row) {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/product_stock/${row._id}/remove`
      this.$alert(`Remove Stock ${(row.productDoc && row.productDoc.name) || ''}`, 'Confirm', {
        confirmButtonText: 'OK',
        callback: (action) => {
          if (action === 'confirm') {
            axios
              .post(url, { userId: user._id }, { headers: { token } })
              .then((res) => {
                if (res.data.code === 201) {
                  this.tableData.splice(index, 1)
                  this.fetchProductStock()
                  this.countProductStock()
                } else {
                  this.$message.error(res.data.message)
                }
              })
              .catch((err) => this.$message.error(err.message))
          }
        }
      })
    },
    handleAddStock() {
      this.addStockDialog = true
    },
    handleOnClose() {
      this.stockForm.stockProductName = ''
      this.$refs['stock-form-ref'].resetFields()
    },
    handleSave() {
      const { token, user, activeStore } = this.$store.state.user
      this.$refs['stock-form-ref'].validate((valid) => {
        if (valid && !!this.stockForm.productId && this.stockForm.qty > 0) {
          const stockDoc = {
            productId: this.stockForm.productId,
            in: this.stockForm.type === 'in' ? this.stockForm.qty : 0,
            out: this.stockForm.type === 'out' ? -this.stockForm.qty : 0,
            storeId: activeStore,
            modifiedBy: user._id
          }
          const url = `${provider.baseURL}${provider.prefix}/product_stock/add`
          axios
            .post(url, stockDoc, {
              headers: {
                token
              }
            })
            .then((res) => {
              if (res.data.code === 201) {
                this.$message.success('Operation Success')
                this.stockForm.stockProductName = ''
                this.$refs['stock-form-ref'].resetFields()
                this.fetchProductStock()
                this.countProductStock()
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((err) => this.$message.error(err.message))
        }
      })
    },
    querySearch: _.debounce(function (queryString, cb) {
      const { token, activeStore } = this.$store.state.user
      const expiredDate = moment().format('YYYY-MM-DD HH:mm')
      const url = `${provider.baseURL}${provider.prefix}/products?q=${queryString}&limit=20&type=stock&storeId=${activeStore}&expiredDate=${expiredDate}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            const products = res.data.data.map((o) => ({
              value: `${o.name}-${o.skewNumber} | QtyOnHand: ${o.qtyOnHand || 0}`,
              _id: o._id
            }))
            const result = queryString ? products.filter(this.createFilter(queryString)) : products
            cb(result)
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    }, 300),
    createFilter(queryString) {
      return (product) => {
        return product.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
      }
    },
    handleSelect(item) {
      this.stockForm.stockProductName = item.value
      this.stockForm.productId = item._id
    },
    fetchProductStock() {
      const { token, activeStore } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/product_stock?page=${this.page}&storeId=${activeStore}`

      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.tableData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => this.$message.error(err.message))
    },
    countProductStock() {
      const { token, activeStore } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/product_stock/count?storeId=${activeStore}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.total = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => this.$message.error(err.message))
    }
  },
  created() {
    this.fetchProductStock()
    this.countProductStock()
  }
}
</script>
