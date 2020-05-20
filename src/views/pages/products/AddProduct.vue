<template>
  <content-box>
    <!--        Price options drawer-->

    <el-dialog
      title="Add Product Options"
      :visible.sync="priceOptionsDrawer"
      width="50%"
      :before-close="handleDrawerClose"
    >
      <el-row :gutter="40">
        <el-col :span="24">
          <el-select
            filterable
            clearable
            v-model="priceOptionId"
            placeholder="Select Price Options"
          >
            <el-option
              v-for="item in productOptionsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="24">
          <br />
          <hr />
          <el-row :gutter="20">
            <el-col :span="20">
              <el-table :data="addProduct.priceOptions">
                <el-table-column label="Option Name">
                  <template slot-scope="scope">{{displayProductionName(scope.row.priceOptionId)}}</template>
                </el-table-column>
                <el-table-column label="Price">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.price"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="120">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleRemovePriceOption(scope.row.priceOptionId)"
                      type="text"
                      size="small"
                      icon="el-icon-delete"
                    >Remove</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>

    <el-row :gutter="40" v-show="true">
      <el-col :span="24">
        <el-form :model="addProduct" :rules="rules" ref="addProductForm">
          <div>
            <div class="flex right" style="text-align:right;padding-top:8px;">
              <el-col :span="24">
                <router-link to="/settings?activeName=2">
                  <font-awesome-icon icon="times" size="lg" style="color: #1f1f1f" />
                </router-link>
              </el-col>
            </div>
            <div class="card-header">
              <label class="mr-sm-2 form-label">
                <h3 class="text-3xl font-bold text-bunting">{{$route.meta.title}}</h3>
              </label>

              <p></p>
            </div>
            <div class="card-body">
              <el-form-item>
                <div>
                  <label for>{{$t('product.form.photo')}}</label>
                </div>
                <el-upload
                  v-loading="uploadProgress"
                  action="#"
                  multiple
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :auto-upload="false"
                  :file-list="fileList"
                  :on-change="onUploadChange"
                  :on-remove="handleRemoveFile"
                >
                  <i class="el-icon-upload"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </el-form-item>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item :label="$t('product.form.name')" prop="name">
                    <el-input placeholder="ABC.." v-model="addProduct.name"></el-input>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="8">
                  <el-form-item :label="$t('product.form.price')" prop="price">
                    <el-input :placeholder="pricePlaceHolder" v-model="addProduct.price">
                      <template slot="append">
                        <el-button type="success" @click="handleClickPriceOptions">Add Price Options</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>-->

                <el-col :span="8">
                  <el-form-item :label="$t('product.form.skewNumber')" prop="skewNumber">
                    <el-autocomplete
                      style="width: 100%;"
                      v-model="addProduct.skewNumber"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="000001"
                      @select="handleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('product.form.category')">
                    <el-select
                      style="width: 100%"
                      v-model="addProduct.categoryId"
                      :placeholder="$t('product.form.category')"
                    >
                      <el-option
                        style="width: 100%;"
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="Sub category">
                    <el-select
                      style="width: 100%"
                      multiple
                      clearable
                      filterable
                      v-model="addProduct.subCategories"
                      placeholder="Sub categories"
                    >
                      <el-option
                        style="width: 100%;"
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item>
                    <label for>{{$t('product.form.type')}}</label>
                    <br />
                    <el-radio
                      v-model="addProduct.type"
                      v-for="(o,i) in productTypes"
                      :key="i"
                      :label="o"
                    >{{o.toUpperCase()}}</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-show="addProduct.type == 'stock'">
                  <el-form-item :label="$t('product.form.expired')" prop="expiredAt">
                    <label for></label>
                    <el-date-picker
                      v-model="addProduct.expiredAt"
                      type="datetime"
                      :picker-options="options"
                      :placeholder="$t('product.form.expired')"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('product.form.addToSlide')">
                    <el-checkbox v-model="addProduct.isAddToSlide"></el-checkbox>
                  </el-form-item>
                </el-col>
                <transition name="el-fade-in">
                  <el-col :span="10" v-show="addProduct.isAddToSlide">
                    <el-form-item
                      :label="$t('product.form.addToSlideExpired')"
                      prop="finishedAddToSlideAt"
                    >
                      <el-date-picker
                        v-model="addProduct.finishedAddToSlideAt"
                        type="datetime"
                        :picker-options="options"
                        :placeholder="$t('product.form.addToSlideExpired')"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </transition>
              </el-row>-->
            </div>
          </div>

          <div class="action" style="padding-left:0px;">
            <el-button
              type="warning"
              @click="handleSave"
              :loading="isLoading"
            >{{$t('product.save')}}</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </content-box>
</template>

<script>
    import {app, provider} from "../../../service/provider";
    import ContentBox from '../../../components/ContentBox.vue'
    import moment from "moment";
    import axios from "axios";
    import _ from "lodash";

    export default {
        components: {
            ContentBox,
        },
        data() {

            let validateFinishAddedToSlideDate = (rule, value, callback) => {
                if (this.addProduct.isAddToSlide && !value) {
                    callback(new Error("តម្រូវអោយបំពេញថ្ងៃបញ្ចប់ស្លាយ"));
                } else {
                    callback();
                }
            };
            return {
                priceOptionId: "",
                categoryOptions: [],
                id: null,
                direction: 'rtl',
                productOptionsArr: [],
                priceOptionsDrawer: false,
                isLoading: false,
                companyDoc: null,
                options: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now();
                    }
                },
                productTypes: ["none-stock", "stock"],
                dialogImageUrl: "",
                dialogVisible: false,
                uploadProgress: false,
                fileList: [],
                addProduct: {
                    price: 0,
                    name: "",
                    skewNumber: "",
                    type: "none-stock",
                    isAddToSlide: false,
                    finishedAddToSlideAt: null,
                    imageUrl: [],
                    expiredAt: null,
                    createdBy: "",
                    categoryId: "",
                    subCategories: [],
                    priceOptions: [],
                },
                rules: {
                    finishedAddToSlideAt: [
                        {validator: validateFinishAddedToSlideDate, trigger: "blur"}
                    ],
                    name: [
                        {
                            required: true,
                            trigger: "blur",
                            message: "តម្រូវអោយបំពេញ"
                        },
                        {
                            min: 5,
                            trigger: "blur",
                            message: "យ៉ាងតិចបំបេញងោយបាន​ ៥តួ"
                        }
                    ],
                    skewNumber: [
                        {
                            required: true,
                            trigger: "blur",
                            message: "តម្រូវអោយបំពេញ"
                        }
                    ],
                    price: [
                        {
                            required: true,
                            trigger: "blur",
                            message: "តម្រូវអោយបំពេញ"
                        }
                    ]
                }
            };
        },
        methods: {
            handleRemovePriceOption(priceOptionId){
                this.addProduct.priceOptions = this.addProduct.priceOptions.filter(o => o.priceOptionId !== priceOptionId);
            },
            displayProductionName(priceOptionId){
                const productOption =  this.productOptionsArr
                    .filter(o => o.value === priceOptionId)
                    .map(o => `${o.label}`)
                return productOption.join('');
            },
            handleDrawerClose(done) {
                done();
            },
            handleClickPriceOptions(){
                this.priceOptionsDrawer = true;
            },
            querySearchAsync: _.debounce(function (queryString, cb) {
                let vm = this;
                const {token,activeStore} = vm.$store.state.user;
                const url = `${provider.baseURL}${
                    provider.prefix
                    }/products?s=${queryString}&storeId=${activeStore}`;
                axios
                    .get(url, {
                        headers: {
                            token
                        }
                    })
                    .then(res => {
                        if (res.data.code === 201) {
                            const skewNumbers = res.data.data.map(map => ({
                                value: map.skewNumber,
                                skewNumber: map.skewNumber
                            }));
                            const filter = product =>
                                product.skewNumber
                                    .toLowerCase()
                                    .indexOf(queryString.toLowerCase()) === 0;
                            const results = queryString
                                ? skewNumbers.filter(filter)
                                : skewNumbers;
                            cb(results);
                        } else {
                            cb([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 200),
            fetchCategories() {
                const {token,activeStore} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/categories/all?s=true&store_id=${activeStore}`;
                axios
                    .get(url, {
                        headers: {
                            token
                        }
                    })
                    .then(res => {
                        if (res.data.code === 201) {
                            this.categoryOptions = res.data.data.map(map => ({
                                label: map.name,
                                value: map._id
                            }));
                        }
                    });
            },
            handleSelect(item) {
                this.addProduct.skewNumber = item.value;
            },
            handleRemoveFile(file, fileList) {
                const index = this.fileList.findIndex(o => o.name === file.name);
                this.addProduct.imageUrl.splice(index, 1);
                this.fileList = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleUpload() {
                var storageRef = app.storage().ref();
                let vm = this;
                // this.addProduct.imageUrl = [];
                this.uploadProgress = true;

                this.fileList.map(file => {
                    this.blobToDataString(file.url, data => {
                        var uploadTask = storageRef
                            .child(`/images/products/${file.name}`)
                            .putString(data, "data_url");
                        uploadTask.on(
                            "state_changed",
                            function (snapshot) {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress =
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                if (progress >= 100) {
                                    vm.uploadProgress = false;
                                }
                            },
                            function (error) {
                                vm.uploadProgress = false;
                            },
                            function () {
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                uploadTask.snapshot.ref
                                    .getDownloadURL()
                                    .then(function (downloadURL) {
                                        const splitUrl = downloadURL.split("?");
                                        const f = vm.addProduct.imageUrl.filter(
                                            e => e.url == splitUrl[0]
                                        );
                                        if (f.length == 0) {
                                            vm.addProduct.imageUrl.push({
                                                url: splitUrl[0],
                                                token: splitUrl[splitUrl.length - 1]
                                            });
                                        }
                                    });
                            }
                        );
                    });
                });
            },
            onUploadChange(file, fileList) {
                const matchExtension = file.name.match(/jpg|png|jpeg/g);
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!matchExtension) {
                    this.$message.error("Must be a jpg, png or csv jpeg");
                    return false;
                } else if (!isLt5M) {
                    this.$message.error("Image can not exceed 2M");
                    return false;
                } else {
                    if (fileList.length > 5) {
                        this.fileList = fileList.slice(-1);
                        this.handleUpload();
                    } else {
                        this.fileList = fileList;
                        this.handleUpload();
                    }
                }
            },
            blobToDataString(blob, callback) {
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";

                xhr.onload = function () {
                    let recoveredBlob = xhr.response;

                    let reader = new FileReader();

                    reader.onload = function () {
                        let blobAsDataString = reader.result;
                        callback(blobAsDataString);
                    };

                    reader.readAsDataURL(recoveredBlob);
                };

                xhr.open("GET", blob);
                xhr.send();
            },
            handleSave() {
                const {token, user, activeStore} = this.$store.state.user;
                //if id is exist we return edit url else we return add url
                const url = !!this.id
                    ? `${provider.baseURL}${provider.prefix}/products/${this.id}/edit`
                    : `${provider.baseURL}${provider.prefix}/products/add`;
                this.isLoading = true;
                this.$refs["addProductForm"].validate(valid => {
                    if (valid) {
                        this.addProduct.createdBy = user._id;
                        this.addProduct.storeId = activeStore;

                        axios
                            .post(url, this.addProduct, {
                                headers: {
                                    token
                                }
                            })
                            .then(res => {
                                this.isLoading = false;
                                if (res.data.code === 201) {
                                    this.$router.push("/product")
                                    this.$message.success("ប្រតិបត្តិការបានជោគជ័យ");
                                    if (!!this.id) {
                                        // if id exist we will return the product after update
                                        this.$router.push("/settings?activeName=2");
                                    } else {
                                        this.addProduct = {
                                                price: 0,
                                                name: "",
                                                skewNumber: "",
                                                type: "none-stock",
                                                isAddToSlide: false,
                                                finishedAddToSlideAt: null,
                                                priceOptions: [],
                                                imageUrl: [],
                                                expiredAt: null,
                                                createdBy: "",
                                                categoryId: ""
                                        };//clear property after success
                                    }
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.isLoading = false;
                            });
                    } else {
                        this.isLoading = false;
                    }
                });
            },
            fetchCompany() {
                axios
                    .get(`${provider.baseURL}${provider.prefix}/company`)
                    .then(res => {
                        if (res.data.code === 201) {
                            let data = res.data.data[0];
                            this.companyDoc = data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            getProductById(id) {
                const {token} = this.$store.state.user;
                const url = `${provider.baseURL}${provider.prefix}/products/${id}`;
                axios
                    .get(url, {
                        headers: {
                            token
                        }
                    })
                    .then(res => {
                        if (res.data.code === 201 && res.data.data) {
                            const data = res.data.data;
                            if (data.imageUrl.length > 0) {
                                this.fileList = data.imageUrl.map(map => ({
                                    name: "",
                                    url: `${map.url}?${map.token}`
                                }));
                            }
                            for (let k in this.addProduct) {
                                this.addProduct[k] = data[k];
                            }
                        }
                    });
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
                        this.productOptionsArr = res.data.data.map(o => ({
                            label: o.type.toUpperCase() + " " + o.label.toUpperCase() ,
                            value: o._id
                        }));
                    } else {
                        this.$message.error(res.data.message
                        );
                    }
                })
                    .catch((err) => this.$message.error(err.message));
            }
        },
        watch: {
            "addProduct.isAddToSlide"(val) {
                if (val) {
                    this.addProduct.finishedAddToSlideAt = moment().toDate();
                } else {
                    this.addProduct.finishedAddToSlideAt = null;
                }
            },
            priceOptionId(val){
                if (!!val) {
                    if (!this.addProduct.priceOptions) {
                        this.addProduct.priceOptions = [];
                    }
                    if(this.addProduct.priceOptions.filter(o => o.priceOptionId ===val).length === 0) {
                        this.addProduct.priceOptions.push(
                            {
                                priceOptionId: val,
                                price: 0
                            }
                        );
                    }
                }
            },
        },
        computed: {
            pricePlaceHolder() {
                return this.companyDoc && this.companyDoc.defaultCurrency === "KHR"
                    ? "20,000"
                    : "2";
            },
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
            if (!!id) {
                this.id = id;
                this.getProductById(id);
            }
            this.fetchCompany();
            this.fetchCategories();
            this.fetchProductOptions();
        }
    };
</script>

