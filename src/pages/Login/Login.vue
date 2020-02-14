<template>

  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginMethods}" @click="loginMethods=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginMethods}" @click="loginMethods=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="submitForm">
          <div :class="{on: loginMethods}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="rightPhone===false"  id="btnSendCode"
                      class="get_verification" @click.prevent="sendYZM(this)"
                      :class="{onShowYZM: rightPhone }">
                {{time !=0 ? `已发送${time}s` :'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginMethods}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="11" placeholder="密码" v-model="pwd" v-else>

                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? '开' : '关'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img  class="get_verification" src="http://localhost:8081/getVerifyCode" alt="captcha"
                     @click="getVerifyCode" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconfanhui"></i>
      </a>
    </div>
    <alert-tip :alert-text="alertText" v-show="alertShow" v-on:closeTip="closeAlert"></alert-tip>
  </section>

</template>

<script type="text/ecmascript-6">
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {getInfo, postInfo} from "../../api/axios";
  import {reqSmsLogin} from "../../api";

  export default {
    data() {
      return {
        loginMethods: true, //true手机 false账号
        phone: '',
        code: '',
        time: 0,
        name: '',
        pwd: '',
        showPwd: false,
        captcha: '',
        alertText: '',
        alertShow: false,
        interval: 0,
        sending: false
      }
    },
    computed: {
      rightPhone() {
        const {phone} = this
        return /^1[345789]\d{9}$/.test(phone)
      }
    },
    components: {
      AlertTip
    },
    methods: {
      sendYZM(event) {
        //倒计时
        if (this.time == 0) {

          this.time = 10
          this.interval = setInterval(() => {

            if (this.time > 0) {
              this.time--
            } else {
              clearInterval(this.interval)
            }
          }, 1000);
        }
        //发送验证码
        getInfo("/api/font/user/sendCode", {phone: this.phone}).then(res => {
          if (res.code != 200) {
            this.showAlert("发送验证码错误")
            if (this.time) {
              this.time = 0
              clearInterval(this.interval)
            }
          }
        })
      },
        submitForm() {
        let result
        if (this.loginMethods) {
          //手机登入
          const {rightPhone, phone, code} = this
          if (!rightPhone) {
            this.showAlert("手机格式不正确")
            return
          } else if (!/^\d{6}$/.test(code)) {
            //短信验证码不是6位
            this.showAlert("短信验证码不是6位")
            return
          }
          //发送ajax请求提交表单数据
            postInfo('/api/font/user/smsLogin',{phone:this.phone,code:this.code})
            .then(res=>{
             if(res.code ==200){
               const user = res.data
               this.$router.replace('/profile')
             }else{
               this.showAlert(res.message)
             }
            })
        }
        else {
          const {name, pwd, captcha} = this
          if (!this.name) {
            this.showAlert(" 用户名不能为空")
            return
          } else if (!this.pwd) {
            this.showAlert("密码不能为空")
            return
          } else if (!this.captcha) {
            this.showAlert("验证码不能为空")
            return
          }
          //发送ajax请求提交表单数据
          postInfo('/api/font/user/userLogin',{name:this.name,pwd:this.pwd,captcha:this.captcha})
            .then(res=>{
              if(res.code ==200){
                const user = res.data
                this.$store.dispatch('getUserinfo',user)
                this.$router.replace('/profile')
              }else{
                this.getVerifyCode();
                this.showAlert(res.message)
              }
            })
        }
      },
      showAlert(alertText) {
        this.alertText = alertText
        this.alertShow = true
      },
      closeAlert() {
        this.alertShow = false
      },
      getVerifyCode() {
        this.$refs.captcha.src = 'http://localhost:8081/getVerifyCode?time=' + Date.now()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.onShowYZM
                  color black

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(30px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
