<template>
  <el-row>
    <div class="bgdark"></div>
    <div class="container1">
      <transition name="el-zoom-in-top">
        <el-row :gutter="20" v-show="true">
          <el-col :span="18" :offset="3">
            <div class="card-box first-margin">
              <!--<div class="flex right" style="text-align:right;padding-top:8px;">-->
              <!--<el-col :span="24">-->
              <!--<router-link to="/transactions?activeName=3">-->
              <!--<font-awesome-icon icon="times" size="lg" style="color: #1f1f1f"/>-->
              <!--</router-link>-->
              <!--</el-col>-->
              <!--</div>-->
              <div class="card-header" align="center">
                <div class="flex-columns">
                  <div class="flex-flexible flex middle margin-top-minus-4px">
                    <p class="page-title">{{ $t('customer.title') }} {{ customer.name || '' }}</p>
                  </div>
                  <!-- Stage Buttons-->
                  <div class="stage-btns">
                    <el-button type="primary" @click="handleClickEdit">{{ $t('customer.edit') }}</el-button>
                  </div>
                </div>
                <div style="text-align: left;">
                  <div class="stage__info flex">
                    <p class="textwrap">Created by: {{ customer.userDoc.username }}</p>
                    <span>
                      <span class="vertical-line">&nbsp;</span>
                    </span>
                    <span class="textwrap">
                      <span>{{ customer.timestamp | moment('DD/MM/YYYY HH:mm') }}</span>
                    </span>
                  </div>
                </div>

                <!-- <p>TODO://</p>
                <p>{{customer.name}}</p>
                <p></p>
                <p></p>
                <p>IsActive: {{customer.isAtive ? "Active" : "Deactive"}}</p>
                <p>Store: {{customer.storeDoc.name}}</p> -->
                <vue-json-pretty :data="customer"></vue-json-pretty>
              </div>
              <!-- <div class="card-body"></div> -->
            </div>
            <!-- <div class="card-button first-margin">
              <div class="card-header" style="padding-left:0px;">

              </div>
            </div> -->
          </el-col>
        </el-row>
      </transition>
    </div>
  </el-row>
</template>

<script>
import axios from 'axios'
import { provider } from '../../service/provider'
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    VueJsonPretty
  },
  data() {
    return {
      customer: {}
    }
  },
  methods: {
    fetchCustomerById(id) {
      const { token } = this.$store.state.user
      const url = `${provider.baseURL}${provider.prefix}/customers/${id}`
      axios
        .get(url, {
          headers: {
            token
          }
        })
        .then((res) => {
          if (res.data.code === 201) {
            this.customer = res.data.data
          }
        })
    },
    handleClickEdit() {
      this.$router.push(`/customers/${this.customer._id}/edit`)
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.fetchCustomerById(id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Battambang|Bokor|Chenla|Kantumruy|Kdam+Thmor|Khmer|Nokora|Odor+Mean+Chey|Roboto|Taprom');

body {
  font-family: 'Chenla', 'Roboto', cursive;
}

.bgdark {
  background-color: #1f1f1f !important;
  height: 230px;
}
p {
  margin: 0px;
}
.flex-columns {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
  text-align: left;
  .flex-flexible {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    .page-title {
      font-family: Geogrotesque, Arial, -apple-system, Helvetica Neue Bold, sans-serif;
      font-size: 24px;
      font-weight: 500;
      font-style: normal;
      color: #393a3d;
      padding-top: 5px;
      margin: 0px;
    }
  }
  .margin-top-minus-4px {
    margin-top: -4px;
  }
}
.vertical-line {
  width: 1px;
  background-color: #b8b8b8;
  height: 20px;
  margin: 0 15px;
  float: left;
}
.stage__info {
  font-size: 13px;
  font-weight: 400;
}

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
  margin-top: -70px;
  .card-header {
    margin-bottom: 0;
    padding: 0.75rem 1.25rem;
    color: inherit;
    border-bottom: 0 solid rgba(0, 0, 0, 0.125);
    background-color: transparent;
    h5 {
      font-size: 1.125rem;
      margin: 0px;
      font-family: 'Chenla', 'Roboto', cursive;
      font-weight: bold;
    }
    p {
      /*color: #8492a6 !important;*/
      font-style: italic;
      margin: 0;
      font-size: 0.925rem;
    }
  }
  .card-body {
    padding: 0.75rem 1.25rem;
  }
}
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>
