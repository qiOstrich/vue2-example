<template>
  <div id="secondcomponent">
    <h1>I am another page</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h1>
      </div>
      <ul v-for="ele in articles" class="text item" :key="ele.transaction_id">
        <li>transaction_id is {{ ele['transaction_id'] }}</li>
        <li>status is {{ ele['status'] }}</li>
        <!-- <span v-for="(value, key) in ele" :key="key">{{key}}: {{ value}};</span> -->
      </ul>
    </el-card>

    <div><a href="https://www.baidu.com" target="_self"> written by {{ author }} </a></div>
    <div><a href="https://www.baidu.com" target="blank"> written by {{ author }} </a></div>
    <div><a href="https://www.baidu.com" target="parent"> written by {{ author }} </a></div>
    <div><a href="https://www.baidu.com" target="top"> written by {{ author }} </a></div>
    <p> 感谢 <a href="https://github.com/showonne" target="blank">showonne</a>大神的技术指导</p>
  </div>
</template>

<script>
import { setTransitionHooks } from '@vue/runtime-core';

export default {
  data() {
    return {
      author: "微信公众号 jinkey-love",
      articles: [{ name: "You", title: "Your name" }],
      douban_moves_url: "https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0",
      move_url: "https://api.douban.com/v2/movie/top250?count=10",
    }
  },
  mounted: function () {
    this.$http.get("/operation-portal/neobank/masspay/transactions/", {}, {
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NjA1NDczLCJpYXQiOjE2NTU0MzI2NzMsImp0aSI6ImY5ZmE0Zjc1ZGNkMzRhMTdhYTI0MDNiMTJlZDcxODFjIiwidXNlcl9pZCI6Nn0.CCcpMULFBBQJ-ssEKF91vc8lxzykLvJ-vpyc552uDps"
      },
      emulateJSON: false
    }).then(function (response) {
      // 这里是处理正确的回调
      console.log(response.data);

      this.articles = response.data.results
      // this.articles = response.data.subjects
      // this.articles = response.data["subjects"] 也可以

    }, function (response) {
      // 这里是处理错误的回调
      console.log(response)
      console.log(this.$http.jsonp.method)
      console.log(response.data)
    });
  }
}
</script>

<style>
.text {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
/* .text > li {
  display: inline;
} */
</style>
