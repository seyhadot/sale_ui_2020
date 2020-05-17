<template>
    <div>
        <div class="bgdark"></div>
        <div class="container">
            <transition name="el-zoom-in-top">
                <el-row :gutter="20" v-show="true">
                    <el-col :span="14" :offset="5">
                        <el-form :model="categoryModel" :rules="rules" ref="categoryForm">
                            <div class="card-box first-margin">
                                <div class="flex right" style="text-align:right;padding-top:8px;">
                                    <el-col :span="24">
                                        <router-link to="/settings?activeName=3">
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
                                        <el-col :span="12">
                                            <el-form-item :label="$t('category.tableData.name')" prop="name">
                                                <el-input v-model="categoryModel.name"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item :label="$t('category.tableData.desc')">
                                                <el-input v-model="categoryModel.desc"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                      <el-form-item label="Price">
                                        <el-input v-model="categoryModel.price"></el-input>
                                      </el-form-item>
                                    </el-row>
                                    <el-row>
                                        <el-form-item :label="$t('category.tableData.status')">
                                            <el-switch
                                                    v-model="categoryModel.isUsable"
                                                    :active-text="$t('category.tableData.unusable')"
                                                    :inactive-text="$t('category.tableData.usable')"
                                            ></el-switch>
                                        </el-form-item>
                                    </el-row>
                                </div>
                            </div>
                        </el-form>
                        <div class="card-button first-margin">
                            <div class="card-header" style="padding-left:0px;">
                                <el-button type="primary" @click="handleSave">{{$t('category.save')}}</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </transition>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    import {provider} from "../../../service/provider";

    export default {
        data() {
            return {
                categoryModel: {
                    _id: "",
                    name: "",
                    desc: "",
                    isUsable: true,
                    price: 0,
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
                this.$refs["categoryForm"].validate(valid => {
                    if (valid) {
                        const {token, user, activeStore} = this.$store.state.user;
                        const url = `${provider.baseURL}${provider.prefix}/categories/upsert`;
                        this.categoryModel.createdBy = user._id;
                        this.categoryModel.storeId = activeStore;
                        axios
                            .post(url, this.categoryModel, {
                                headers: {
                                    token
                                }
                            })
                            .then(res => {
                                if (res.data.code === 201) {
                                    this.$message.success("ប្រតិបត្តិការជោគជ័យ");
                                    if (this.categoryModel._id) {
                                        this.$router.push("/settings?activeName=3");
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
            fetchCategoryById(id) {
                const {token} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/categories/${id}`;
                axios
                    .get(url, {
                        headers: {
                            token
                        }
                    })
                    .then(res => {
                        if (res.data.code === 201) {
                            if (res.data.data.length > 0) {
                                const d = res.data.data[0];
                                for (let k in this.categoryModel) {
                                  if (k === 'price') {
                                    this.categoryModel[k] = d[k] || 0;
                                  }else{
                                    this.categoryModel[k] = d[k];
                                  }
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
                    case 'en':
                        return enName || "";
                    case 'km':
                        return khName || "";
                }
            }
        },
        created() {
            const {id} = this.$route.params;
            if (id) {
                this.fetchCategoryById(id);
            }
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

    .el-switch.is-checked .el-switch__core {
        border-color: #1f1f1f;
        background-color: #1f1f1f;
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