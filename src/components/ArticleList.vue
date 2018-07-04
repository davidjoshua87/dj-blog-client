<template>
<div class="main-page">
  <HeaderNav :title="title" :description="description"></HeaderNav>

  <div class="container sidenav col-md-9">
    <div class="row">
      <div class=" sidenav col-md-4">
        <h5 class="card-header">Sidebar</h5>
        <div class="card-body">
          <div class="input-group">
            <input type="text" class="form-control" v-model="search" placeholder="Search article...">
            <span class="input-group-btn">
                <button @click="onSearch" class="btn btn-secondary" type="button">Go!</button>
            </span>
          </div>
        </div>
        <div style="text-align:center;padding:1em 0;">
          <h5><span style="color:gray;">Clock Local</span><br />Jakarta, Indonesia</h5>
          <iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:120px;height:40px; " src="https://www.clocklink.com/html5embed.php?clock=004&timezone=Indonesia_Jakarta&color=gray&size=120&Title=&Message=&Target=&From=2018,1,1,0,0,0&Color=gray"></iframe>
        </div>
      </div>
      <div class="col-md-8 mx-auto">
        <div class="article" v-for="(article,i) in articles" :key='i'>
          <div class="post-preview">
            <router-link :to="{ name: 'ArticleMain', params: { id: article._id }}">
              <h2 class="post-title">
                {{article.title}}
              </h2>
            </router-link>
            <p class="post-meta">Posted by
              <a>{{article.author.name}}</a> on {{ stringDate(article.createdAt) }}
            </p>
            <p class="post-meta">Edited by 
              <a>{{article.author.name}}</a> on {{ stringDate(article.updateAt) }}
            </p>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapState } from "vuex";
import HeaderNav from "@/components/HeaderNav";
import Sidebar from "@/components/Sidebar";

export default {
  name: "ArticleList",
  components: {
    HeaderNav,
    Sidebar
  },
  data() {
    return {
      title: 'BloG"z',
      description: 'A blog"s without articles is like a body without a soul.',
      search: ''
    };
  },
  computed: {
    ...mapState(["articles"])
  },
  methods: {
    onSearch: function () {
      let search = this.search
      this.$store.dispatch('getSearch', search)
    },
    fetchArticlesData: function() {
      axios({
        method: "get",
        url: "http://localhost:3000/articles"
      })
        .then(data => {
          this.articles = data.data.data.map(val => val);
        })
        .catch(err => {
          console.log(err);
        });
    },
    stringDate: function(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>

<style scoped>
.post-preview > a {
  color: #5da6bd;
}

.post-preview > a:focus,
.post-preview > a:hover {
  text-decoration: none;
  color: #0085a1;
}

.post-preview > a > .post-title {
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.post-preview > a > .post-subtitle {
  font-weight: 300;
  margin: 0 0 10px;
}

.post-preview > .post-meta {
  font-size: 16px;
  font-style: italic;
  margin-top: 0;
  color: #868e96;
}

.post-preview > .post-meta > a {
  text-decoration: none;
  color: #fa9b4d;
}

@media only screen and (min-width: 768px) {
  .post-preview > a > .post-title {
    font-size: 36px;
  }
}
</style>
