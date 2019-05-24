<template>
    <div class="sidenav col-md-2">
        <h4>List Articles</h4>
        <div class="link" v-for="(article,i) in articles" :key='i'>
            <router-link :to="{ name: 'ArticleMain', params: { id: article._id }}">
                {{article.title}}
            </router-link>
            <hr>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Sidebar',
        data() {
            return {
                articles: []
            }
        },
        created: function () {
            this.fetchArticlesData()
        },
        methods: {
            fetchArticlesData: function () {
                axios({
                    method: 'get',
                    url: 'https://new-dj-blog.herokuapp.com/articles'
                }).then(data => {
                    console.log(data)
                    this.articles = data.data.data.map(val => val)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .sidenav {
        height: 100%;
        padding-top: 20px;
        margin-right: 0;
        text-align: left;
    }

    .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 17px;
        color: #818181;
        display: block;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    @media screen and (max-height: 450px) {
        .sidenav {
            padding-top: 15px;
        }

        .sidenav a {
            font-size: 12px;
        }
    }
</style>
