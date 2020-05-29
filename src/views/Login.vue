<template>
  <div class="h-screen bg-menu_yellow bg_cover w-full">
    <div class="bg-logo w-full">
      <img src="../assets/img/login/cover.png" alt class="w-full h-screen" />
    </div>
    <div class="forny-container absolute pt-10" style="right: 18%;">
      <div class="forny-inner w-72 flex flex-col items-center justify-center">
        <div class="forny-logo relative" style="top: 70px;">
          <img src="../assets/img/login/logo.png" class="w-40 h-40 rounded-full" />
        </div>
        <div class="forny-form w-72 bg-white pt-16 rounded-lg pb-16">
          <div class="text-center text-xs my-3 text-gray-600">
            <p class>We Selling...</p>
          </div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <div class="form-group">
              <div class="input-group flex justify-center px-8">
                <div class="actions w-full mb-3 relative">
                  <div class="login_form mb-3">
                    <div class="absolute left-0" style="z-index: 1;margin-left: 10px;margin-top: 8px;}">
                      <i class="uil-user text-menu_gray"></i>
                    </div>
                    <el-input class="input_email" placeholder="ឈ្មោះគណនី" v-model="loginForm.username" prop="username"></el-input>
                  </div>

                  <div class="login_form mb-3">
                    <div class="absolute left-0" style="z-index: 1;margin-left: 10px;margin-top: 8px;}">
                      <i class="uil-key-skeleton text-menu_gray"></i>
                    </div>
                    <el-input class="input_email" placeholder="លេខសំងាត់" v-model="loginForm.password" type="password"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <el-form-item class="action flex w-full justify-center">
                <el-button type="warning" class="btn-block w-48" @click="handleLogin" :loading="isLoading">{{ showLoadingText }} </el-button>
              </el-form-item>
              <el-form-item class="action flex w-full justify-center">
                <el-checkbox v-model="isRemember">Remember for 24 hours</el-checkbox>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <el-row type="flex" justify="center" style="margin-top: -20px;">
          <el-radio-group v-model="locale">
            <el-radio-button label="km">ភាសាខ្មែរ</el-radio-button>
            <el-radio-button label="en">English</el-radio-button>
          </el-radio-group>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { provider } from '@/service/provider'
import request from 'superagent'

export default {
  data() {
    return {
      locale: 'km',
      isLoading: false,
      isRemember: false,
      rules: {
        username: [
          {
            required: true,
            message: 'ឈ្មោះគណនីតម្រូវអោយបំពេញ',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: 'ឈ្មោះគណនីគួរតែចន្លោះពី 3 ទៅ​​​​​ 20 តួ',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'លេខសម្ងាត់តម្រូវអោយបំពេញ',
            trigger: 'blur'
          }
        ]
      },
      loginForm: {
        username: null,
        password: null
      }
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val
      this.$store.commit('setDefaultLocale', val)
    },
    isRemember(val) {
      this.handleRememberFor1day(val)
    }
  },
  computed: {
    showLoadingText() {
      return this.isLoading ? this.$t('loading') : this.$t('login')
    }
  },
  methods: {
    handleRememberFor1day(flagAddToCookie) {
      if (flagAddToCookie) {
        this.$cookie.set('salewhat::account::username', `${this.loginForm.username}`, { expires: '24h' })
        this.$cookie.set('salewhat::account::password', `${this.loginForm.password}`, { expires: '24h' })
      } else {
        //clear cookie
        this.$cookie.delete('salewhat::account::username')
        this.$cookie.delete('salewhat::account::password')
      }
    },
    handleLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          ///Uncomment the line below for mock up data and comment all line below `Production`
          // this.$store.commit("setUser", {
          //   token: "123",
          //   user: { username: "thkeam" }
          // });
          // this.$router.push("/");
          /// Production
          setTimeout(() => {
            request
              .post(provider.baseURL + '/user/login')
              .send({
                username: this.loginForm.username,
                password: this.loginForm.password
              })
              .end((err, result) => {
                console.log(result)
                
                if (!err) {
                  let body = result.body
                  if (body.code == 201) {
                    const user = body.data
                    this.$store.commit('setUser', {
                      token: body.token,
                      user
                    })
                    if (user.stores && user.stores.length > 1) {
                      this.$router.push({ name: 'Store' })
                    } else {
                      this.$router.push('/')
                    }
                  } else {
                    this.isLoading = false
                    this.$message({
                      type: 'error',
                      message: `${body.data}`
                    })
                  }
                }
              })
          }, 500)
        } else {
          return false
        }
      })
    }
  },
  created() {
    const usernameCookie = this.$cookie.get('salewhat::account::username')
    const passwordCookie = this.$cookie.get('salewhat::account::password')
    if (usernameCookie) {
      this.loginForm = {
        username: usernameCookie,
        password: passwordCookie
      }
      if (this.$mount()) {
        this.handleLogin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*:focus {
  outline: none !important;
}
.bg_cover {
  background: url('../assets/img/login/salewhat.svg') #272d33 center center no-repeat;
  background-size: 60%;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background-position: 20% 30%;

  .bg-logo {
    position: absolute;

    img {
      width: 100%;
    }
  }
}

.el-input__inner {
  padding-left: 40px;
}
</style>
