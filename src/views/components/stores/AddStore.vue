<template>
  <div class="px-2 pt-4">
    <div class="content-card bg-white xs:w-12/12 sm:w-12/12 lg:w-7/12 px-3 py-5 m-auto">
      <div class="px-2">
        <div class="flex -mx-3">
          <div class="w-1/2 px-1">
            <div class="border-t-4 border-cerise"></div>
          </div>
          <div class="w-1/2 px-1">
            <div class="border-t-4 border-topaz"></div>
          </div>
        </div>
      </div>
      <el-form :model="storeForm" :rules="rules" ref="store">
        <div class="form-title border-b pb-3 mt-5">
          <h3 class="text-xl">Edit Store</h3>
        </div>
        <el-row class="mt-3" :gutter="20">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label="ឈ្មោះសាខាហាង" prop="name">
              <el-input v-model="storeForm.name" placeholder="E-commerce Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label="ឈ្មោះកាត់" prop="shortcutName">
              <el-input v-model="storeForm.shortcutName" placeholder="SWEM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label="តំណរភ្ជាប់រូបភាព">
              <el-input v-model="storeForm.coverImgUrl" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label="ពិពណ៌នា">
              <el-input type="textarea" v-model="storeForm.desc" rows="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="អាស័យដ្ឋាន" prop="address">
              <el-input type="textarea" v-model="storeForm.address" rows="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="Users">
              <el-select
                v-model="storeForm.users"
                clearable
                multiple
                placeholder="All"
                style="max-width: 100%; width: 100%;"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item>
              <label class="mr-3">Tags</label>
              <el-tag
                :key="languageTag"
                v-for="languageTag in storeForm.tags"
                closable
                :disable-transitions="false"
                @close="handleCloseTag(languageTag)"
              >{{ languageTag }}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputTagVisible"
                v-model="inputTagValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputTag"
                @blur="handleInputTag"
              ></el-input>
              <el-button
                icon="el-icon-plus"
                v-else
                class="button-new-tag"
                size="small"
                @click="showTagInput"
              ></el-button>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="flex justify-between xs:px-8 sm:px-3">
              <el-form-item>
                <el-checkbox v-model="storeForm.closeOrder">បិទការកម្ម៉ង់ទិញ</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="storeForm.isAddToBuyWhat">Add To Buywhat</el-checkbox>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="24" class="mt-2">
            <el-upload
              v-loading="uploadProgress"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="onUploadChange"
              :on-remove="handleRemove"
              style="float: left;"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
        <div class="action mt-3">
          <el-button type="warning" @click="onSubmit">រក្សាទុក</el-button>
          <router-link :to="-1">
            Cancel
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
// import GoogleMap from "@/components/GoogleMap";
import { provider, app } from '@/service/provider'
import axios from 'axios'

export default {
  data() {
    return {
      inputTagVisible: false,
      inputTagValue: '',
      storeId: null,
      fileList: [],
      userOptions: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadProgress: false,
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: true
      },
      storeForm: {
        closeOrder: false,
        name: '',
        desc: '',
        shortcutName: '',
        address: '',
        isAddToBuyWhat: false,
        coverImgUrl: '',
        logoUrl: '',
        users: [],
        tags: []
      },
      rules: {
        name: [
          {
            required: true,
            message: 'តម្រូវអោយបំពេញ',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: 'តម្រូវអោយបំពេញ',
            trigger: 'blur'
          }
        ],
        shortcutName: [
          {
            required: true,
            message: 'តម្រូវអោយបំពេញ',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 5,
            message: 'Length should be 1 to 5',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    showTagInput() {
      this.inputTagVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputTag() {
      let inputValue = this.inputTagValue
      if (inputValue) {
        this.storeForm.tags ? this.storeForm.tags.push(inputValue) : (this.storeForm.tags = [inputValue])
      }
      this.inputTagVisible = false
      this.inputTagValue = ''
    },
    handleCloseTag(tag) {
      this.storeForm.tags.splice(this.storeForm.tags.indexOf(tag), 1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUpload() {
      this.uploadProgress = true
      var storageRef = app.storage().ref()
      let vm = this
      this.fileList.map((file) => {
        this.blobToDataString(file.url, (data) => {
          var uploadTask = storageRef.child(`/images/${file.name}`).putString(data, 'data_url')
          uploadTask.on(
            'state_changed',
            function (snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              if (progress >= 100) {
                vm.uploadProgress = false
              }
            },
            function (error) {
              vm.uploadProgress = false
            },
            function () {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                vm.storeForm.logoUrl = downloadURL
              })
            }
          )
        })
      })
    },
    onUploadChange(file, fileList) {
      const matchExtension = file.name.match(/jpg|png|jpeg/g)
      if (!matchExtension) {
        this.$message.error('Must be a jpg, png or csv jpeg')
        this.fileList = []
      } else {
        if (fileList.length > 0) {
          this.fileList = fileList.slice(-1)
          this.handleUpload()
        } else {
          this.fileList = fileList
          this.handleUpload()
        }
      }
    },
    blobToDataString(blob, callback) {
      let xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'

      xhr.onload = function () {
        let recoveredBlob = xhr.response

        let reader = new FileReader()

        reader.onload = function () {
          let blobAsDataString = reader.result
          callback(blobAsDataString)
        }

        reader.readAsDataURL(recoveredBlob)
      }

      xhr.open('GET', blob)
      xhr.send()
    },
    onSubmit() {
      this.$refs['store'].validate((valid) => {
        if (valid) {
          const { token, user } = this.$store.state.user
          const url = !this.storeId ? `${provider.baseURL}${provider.prefix}/store/add` : `${provider.baseURL}${provider.prefix}/store/${this.storeId}/edit`
          this.storeForm.createdBy = user._id
          axios
            .post(`${url}`, this.storeForm, {
              headers: {
                token: token
              }
            })
            .then((response) => {
              const data = response.data
              if (data.code == 403) {
                this.$message.error(data.message)
              } else {
                if (this.storeId) {
                  this.$message.success('កែប្រែបានជោគជ័យ')
                  this.$router.push('/stores')
                } else {
                  this.$message.success('បង្កើតហាងបានជោគជ័យ')
                  Object.assign(this.$data, this.$options.data.apply(this))
                }
                //clear property after success
              }
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        }
      })
    },
    fetchStore(id) {
      const { token, user } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/store/${id}`
      axios
        .post(
          url,
          { requestId: user._id },
          {
            headers: {
              token
            }
          }
        )
        .then((res) => {
          if (res.data.code === 201) {
            this.storeId = res.data.data._id
            for (let k in this.storeForm) {
              this.storeForm[k] = res.data.data[k]
              if (k === 'logoUrl') {
                this.fileList.push({
                  name: '',
                  url: this.storeForm.logoUrl
                })
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchUserByStore() {
      const { token, user, activeBranch } = this.$store.state.user
      const url = `${provider.baseURL}/user/super/list?req_id=${user._id}`
      axios
        .get(url, { headers: { token } })
        .then((res) => {
          if (res.data.code === 201) {
            this.userOptions = res.data.data.map((user) => ({
              label: user.username,
              value: user._id
            }))
          } else {
            this.$message.error(res.data.data)
          }
        })
        .catch((err) => this.$message.error(err.message))
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.fetchStore(id)
    }
    this.fetchUserByStore()
  }
}
</script>

<style lang="scss" scoped>
.el-switch.is-checked .el-switch__core {
  border-color: #1f1f1f;
  background-color: #1f1f1f;
}

.el-switch__label.is-active {
  color: #1f1f1f;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 120px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
