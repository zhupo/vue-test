<template>
  <div class="news">/
    <div class="newList">
      <ul>
       <li>
        <a href="#">
          <div class="new_img">
            <img src="http://vue.studyit.io/upload/201504/16/201504161229442885.jpg" alt="" />
          </div>
          <div class="content">
            <p class="title">我爱你中国</p>
            <div class="new-desc">
              <p class="summary">我的摘要内容</p>
              <p>
                <span class="praise">点赞数：222222</span>
                <span class="time">发表时间：2020-09-06</span>
              </p>
            </div>
          </div>
        </a>
       </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      msg: "我是新闻列表页面"
    };
  }
  // props: {
  //   msg: String
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding-top: 5px;
}
.news{
  padding-bottom:100px;
}
.newList{
  width:100%;
  border-bottom:1px solid #cccccc;
  font-sizi:12px;
}
.newList ul li {
  position:relative;
}
.newList ul li a{
  display:block;
  width:100%;
  heigth:150px;
  color:#808080;
  display:flex;
  text-decoration:none;
}
.new_img{
  width:30%;
  text-align:center;
  display:flex;
  align-items:center;
  justify-content:center;
}
.content .title{
  font-sizi:15px;
  display:inline-block;
  color:#131f3c;
  letter-spacing:0;
  padding-bottom:7px;
  font-family:PingFangSC-Regular;
  margin-to:10px;
}
.content .new-desc{

}
.new-desc span{
  color:#ff6700;
}
.summary{
  padding:5px 0;
}
.time{
  margin-left:30px;
}
</style>
