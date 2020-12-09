<template>
  <div class="photo-bottom">
    <ul>
      <li class="photo-comment">
        <div>
          <span>提交评论</span>
          <span><a>返回</a></span>
        </div>
      </li>
      <li class="txt-comment">
        <textarea v-model="content" cols="50" rows="10"></textarea>
      </li>
      <li>
        <mt-button type="primary" size="large" @click="createComment"
          >评论</mt-button
        >
      </li>
      <li class="photo-comment">
        <div>
          <span>评论列表</span>
          <span>{{ comments.length }}条评论</span>
        </div>
      </li>
    </ul>
    <ul class="comment-list">
      <li v-for="(comment, index) in comments" :key="index">
        {{ comment.username }}: {{ comment.content }}
        {{ comment.createdAt | relativeTime }}
      </li>
    </ul>
    <mt-button type="danger" size="large" @click="loadMore(page)"
      >加载更多</mt-button
    >
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["cid"],
  data() {
    return {
      comments: [],
      page: 1,
      content: ""
    };
  },
  created() {
    // /photos/detail?id=37&page=2
    this.page = this.$route.query.page || 1;
    //第一次加载
    this.loadMore();
  },
  methods: {
    //加载更多评论
    loadMore(page) {
      this.$axios
        .get(`/api/comments?page=${this.page}&entityId=${this.cid}`)
        .then(res => {
          let data = res.data;
          if (data.length === 0) {
            this.$toast("没有数据了");
          }
          if (page) {
            //表示加载更多
            this.comments = this.comments.concat(data);
          } else {
            //表示第一次加载
            this.comments = data;
          }
          this.page++;
          console.log(this.page);
        })
        .catch(err => {
          console.log("获取评论数据失败", err);
        });
    },
    //创建评论
    createComment() {
      let data = {
        content: this.content,
        entityId: this.cid
      };
      this.$axios
        .post(`api/comments`, data)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.teml {
  padding-bottom: 100px;
}

.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
  float: right;
}

.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  line-height: 30px;
  margin-bottom: 5px;
}

.txt-comment {
  padding: 5 5;
}

.txt-comment textarea {
  margin-bottom: 5px;
}
.comment-list {
  height: 100%;
  position: relative;
}
.comment-list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
textarea {
  width: 100%;
}
</style>
