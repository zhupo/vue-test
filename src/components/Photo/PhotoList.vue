<template>
  <div class="photoList">
    <Navbar title="图文列表" />
    <div class="category-list">
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <a href="javascript:void(0)" :class='{active: index == currentIndex}' @click="changeHash(index, category.id)">{{ category.name }}</a>
        </li>
      </ul>
    </div>
    <!-- 图片展示区域 -->
    <div class="photo-list">
      <ul>
        <li v-for="(item, index) in imgList" :key="index">
          <router-link :to='{name: "photo.detail", query: {id: item.id}}'>
            <!-- <img :src="item.url" alt=""> -->
            <!-- mint-ui 的懒加载 -->
            <img v-lazy="item.url">
          </router-link>
          <p>
            <span>{{item.title}}</span>
            <br>
            <span>{{item.summary}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoList",
  data() {
    return {
      categories: [],
      imgList: [],
      currentIndex: 0
    }
  },
  methods: {
    loadImgByCategoryId(id) {
      this.$axios.get(`api/photos?categoryId=${id}`)
      .then(res => {
        this.imgList = res.data;
        if (this.imgList.length === 0) {
          this.$toast({
            message: '没有图片',
            // iconClass: 'iconfont icon-shibail',
            duration: 1000
          });
        }
      })
      .catch(err => {
        console.log('图片列表获取失败', err);
      })
    },

    changeHash(index, categore) {
      if (index != this.currentIndex) {
        //动态路由跳转
        this.$router.push({name: 'photo.list', params: {categoryId: categore}})
        this.currentIndex = index;
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    //在渲染该组件的对应路由被confirm前调用
    //不能获取实例‘this’
    //因为当前守卫执行前，组建实例还没被创建
    next(vm => {
      vm.loadImgByCategoryId(to.params.categoryId);
    });
  },
  beforeRouteUpdate (to, from, next) {
    //在当前路由改变，但是该组建被复用时调用
    this.loadImgByCategoryId(to.params.categoryId);
    next();
  },
  created() {
    //获取分类信息
    this.$axios.get("api/photo-categories")
    .then(res => {
      this.categories = res.data;
      this.categories.unshift({"id": 0, "name": "全部"});
    }).catch(err => {
      console.log('分类信息获取失败', err)
    })
  }
}
</script>

<style lang="css" scoped>
.category-list {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.category-list ul {
  width: 100%;
  /* height: 50px; */
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.category-list ul li {
  display: inline-block;
  width: 25%;
  height: 100%;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
.category-list ul li a {
  text-decoration: none;
  font-size: 16px;
}
.category-list ul li a.active {
  color: #FC0280;
}
.photo-list ul li {
  width:100%;
  position: relative;
}
.photo-list ul li a {
  display: block;
  width: 100%;
}
.photo-list ul li a img {
  width: 100%;
}
.photo-list ul li p {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .2);
  padding: 5px 0;
}
.photo-list ul li p span {
  color: #E6E6E6;
  font-size: 16px;
}
.photoList {
  padding-bottom: 100px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.icon-meiyoutupian {
  width: 50px;
  height: 50px;
}
</style>