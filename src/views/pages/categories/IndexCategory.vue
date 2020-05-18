<template>
<content-box>
    <el-row>
       <el-button icon="el-icon-plus" type="primary" @click="handleCreateNewCategory">{{$t('category.add')}}</el-button>
        <el-row>
            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    @row-click="handleClick">
                <el-table-column
                        :label="$t('category.tableData.createdAt')"
                        >
                    <template slot-scope="scope">
                        {{scope.row.timestamp | moment('DD/MM/YYYY HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('category.tableData.name')"
                        prop="name">
                </el-table-column>
                <el-table-column
                        :label="$t('category.tableData.desc')"
                        prop="desc">
                </el-table-column>
                <el-table-column
                        :label="$t('category.tableData.status')"
                       >
                    <template slot-scope="scope">
                        {{scope.row.isUsable ? "បើកអោយប្រើប្រាស់" : "បិទមិនអោយប្រើប្រាស់"}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                :placeholder="$t('category.tableData.search')"/>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-row>
</content-box>
</template>

<script>
    import {provider} from "../../../service/provider";
    import axios from 'axios';
    import ContentBox from '../../../components/ContentBoxNoBorder.vue'
    export default  {
        data() {
            return {
                tableData: [],
                search: '',
            }
        },
        components: {
            ContentBox,
        },
        methods: {
            fetchAllCategory(){
                const {token,activeStore} = this.$store.state.user;
                const url  = `${provider.baseURL}${provider.prefix}/categories/all?store_id=${activeStore}`;
                axios.get(url,{
                    headers: {
                        token
                    }
                })
                    .then((res)=>{
                        if (res.data.code === 201) {
                            this.tableData = res.data.data;
                        }
                    })

            },
            handleCreateNewCategory(){
                this.$router.push('/category/add');
            },
            handleClick(row){
                this.$router.push(`/category/${row._id}/edit`)
            }
        },
        created() {
            this.fetchAllCategory();
        }
    }
</script>