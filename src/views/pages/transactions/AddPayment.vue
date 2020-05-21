<template>
    <div>
        <div class="bgdark"></div>
        <div class="container">
            <transition name="el-zoom-in-top">
                <el-row :gutter="20" v-show="true">
                    <el-col :span="20" :offset="2">
                        <el-form ref="addPaymentForm">
                            <div class="card-box first-margin">
                                <div class="flex right" style="text-align:right;padding-top:8px;">
                                    <el-col :span="24">
                                        <router-link to="/transactions?activeName=3">
                                            <font-awesome-icon icon="times" size="lg" style="color: #1f1f1f"/>
                                        </router-link>
                                    </el-col>
                                </div>
                                <div class="card-header">
                                    <h5>{{displayTitle}}</h5>
                                    <p>{{$t('form.hint')}}</p>
                                </div>
                                <div class="card-body">
                                    <el-row :gutter="20">
                                        <el-col :span="8">
                                            <el-form-item label="Customer" prop="name">
                                                <el-autocomplete
                                                        ref="customerName"
                                                        style="width: 100%"
                                                        v-model="customerName"
                                                        :fetch-suggestions="querySearch"
                                                        placeholder="15427757"
                                                        :trigger-on-focus="false"
                                                        @select="handleSelect"
                                                ></el-autocomplete>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :offset="8" :span="6">
                                                <h4>Amount Recieved</h4>
                                                <h1 style="margin: 0px;font-size: 25px;color: green"><b>KHR 20,0000</b></h1>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
                                            <el-form-item label="Outstanding Transactions">
                                                <el-table
                                                        border
                                                        ref="multipleTable"
                                                        :data="orders"
                                                        style="width: 100%"
                                                        @selection-change="handleSelectionChange">
                                                    <el-table-column
                                                            type="selection"
                                                            width="55">
                                                    </el-table-column>
                                                    <el-table-column
                                                            label="Date"
                                                            width="500">
                                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                                    </el-table-column>
                                                    <el-table-column
                                                            property="name"
                                                            label="Name"
                                                            width="120">
                                                    </el-table-column>
                                                    <el-table-column
                                                            property="address"
                                                            label="Address"
                                                            show-overflow-tooltip>
                                                    </el-table-column>
                                                </el-table>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-form>
                    </el-col>
                </el-row>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {provider} from "../../service/provider";
    import _ from 'lodash';
    export default {
        data() {
            return {
                customerName: "",
                storeId: "",
                customerOptions: [],
                loadingOrders: true,
                orders: [{
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-08',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-06',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-07',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }],
                multipleSelection: []
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
        },
        methods: {
            fetchCustomers(queryString, cb) {
                const {token, activeStore} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/customers?q=${queryString}&page=1&s=${activeStore}`;
                axios.get(url, {
                    headers: {
                        token
                    }
                })
                    .then((res) => {
                        if (res.data.code === 201) {
                            const customers = res.data.data.map(o => ({
                                value: o.name,
                                _id: o._id
                            }));
                            const result = queryString ? customers.filter(this.createFilter(queryString)) : customers;
                            cb(result);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }).catch((err) => {
                    this.$message.error(err.message);
                })
            },
            querySearch: _.debounce(function (queryString, cb) {
                this.fetchCustomers(queryString, cb);
            }, 300),
            createFilter(queryString) {
                return (customer) => {
                    return (customer.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.customerName = item.value;
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        created() {
            const {txt} = this.$route.query;
            if (!!txt) {
                this.customerName = txt;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        margin-top: -220px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
    }
</style>