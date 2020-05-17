<template>
  <div>
    <mt-header title="评价">
      <div slot="left">
        <mt-button icon="back" @click="$router.back()">返回</mt-button>
      </div>
    </mt-header>

    <div class="shop">
        <p style="color: #6a3709">{{order.shopName}}</p>
        <ul>
          <li v-for="(orderItem,index) in order.lists">
            <div class="foods">
              <p>
                <span>{{orderItem.foodname}}</span>
                <span style="float: right">x️{{orderItem.foodcount}}</span>
              </p>
            </div>
          </li>
        </ul>


    </div>

    <div class="pingjia">
      <div class="bgImg">
        <span >食物评分</span>
        <img v-for="(star,index) in foodStars" :src="star.src" @click="rating(index,'foodscore')" alt="星星图片"/>
        <br>
        <span >服务评分</span>
        <img v-for="(star,index) in serviceStars" :src="star.src" @click="rating(index,'servicescore')" alt="星星图片"/>
      </div>
    </div>

    <div class="liuyan">
      <mt-field placeholder="亲,分享口味、环境、服务等方面等体验.." type="textarea" rows="4" v-model="comment"></mt-field>
    </div>


    <div class="tj">
      <mt-button  size="large" type="primary" @click="submitComment">提交</mt-button>

    </div>


  </div>
</template>

<script>
  import { MessageBox,Toast } from 'mint-ui';

  import {getInfo, postInfo} from "../../api/axios";

  var starOffImg = '../../static/images/star02@2x.png'
  var starOnImg = '../../static/images/star@2x.png'

  export default {
    name: "Comment",
    data() {
      return {
        foodCurrentScore: 5,
        serviceCurrentScore: 5,
        order:{},
        oid: 0,
        uid: 0,
        sid:0,
        comment: '',
        foodStars: [{
          src: starOnImg,
          active: true
        }, {
          src: starOnImg,
          active: true
        }, {
          src: starOnImg,
          active: true
        },
          {
            src: starOnImg,
            active: true
          }, {
            src: starOnImg,
            active: true
          }
        ],
        serviceStars: [{
          src: starOnImg,
          active: true
        }, {
          src: starOnImg,
          active: true
        }, {
          src: starOnImg,
          active: true
        },
          {
            src: starOnImg,
            active: true
          }, {
            src: starOnImg,
            active: true
          }
        ]
      }
    },
    methods: {
      rating(index, str) {
        if (str == 'foodscore') {
          this.printStar(index,this.foodStars,'foodscore')
        }else{
          this.printStar(index,this.serviceStars)
        }
      },
      printStar(index,lists,str){
        const total = lists.length
        if(str == 'foodscore'){
          if (this.foodCurrentScore > index + 1) {
            for (let i = total; i > index + 1; i--) {
              lists[i - 1].src = starOffImg
              lists[i - 1].active = false
            }
            this.foodCurrentScore = index + 1
          } else {
            for (let i = 0; i < index + 1; i++) {
              lists[i].src = starOnImg
              lists[i].active = true
            }
            this.foodCurrentScore = index + 1
          }
        }else{
          if (this.serviceCurrentScore > index + 1) {
            for (let i = total; i > index + 1; i--) {
              lists[i - 1].src = starOffImg
              lists[i - 1].active = false
            }
            this.serviceCurrentScore = index + 1
          } else {
            for (let i = 0; i < index + 1; i++) {
              lists[i].src = starOnImg
              lists[i].active = true
            }
            this.serviceCurrentScore = index + 1
          }
        }

      },
      submitComment(){
        this.myComment={
          oid:  this.oid,
          uid:  this.uid,
          rateType: this.rateType,
          sid:  this.sid,
          foodscore: this.foodCurrentScore,
          servicescore:  this.serviceCurrentScore,
          comment:  this.comment,
        }
        postInfo('/api/comment/save',this.myComment).then((res)=>{
            if(res.code == 200){
              Toast({
                message: '评论完成',
                position: 'top',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/order')
              },1000)
            }
        })
      }

    },
    created() {
      this.uid = parseInt(sessionStorage.getItem("userId"))
      this.oid = parseInt(this.$route.params.id)
      getInfo('/api/order',{id:this.oid}).then((res)=>{
        this.order = res.data
        this.sid = res.data.shopId
      })
    },
    computed:{
      rateType(){
        return this.foodCurrentScore >=3 ? 1 : 0
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  .shop
    font-size 22px
    .foods
      margin 10px 0px
      line-height 20px
      font-size 15px
      margin-right 10px
  .pingjia
    margin-top 50px
    .bgImg
      img
        margin-left: 5px
        width: 20px
        height:20px
  .liuyan
    margin-top 20px

  .tj
    width 100%
    position fixed
    bottom 50px
</style>
