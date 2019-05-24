 <template>
     <div class="main-page">
         <article>
             <HeaderNav class="title" :title="titleArticle" :description="descriptionBy"></HeaderNav>
             <div class="container">
                 <div class="row">
                     <sidebar></sidebar>
                     <div class="offset-md-1 col-md-8">
                         <hr>
                         <p>
                             <span v-html="contentArticle"></span>
                         </p>
                         <div>
                             <hr>
                             <h4 class="modal-title">Comment</h4>
                             <hr>
                             <div class="scrolling-wrapper ">
                                 <div class="comment-user" v-for="(comment,i) in articleComment" :key="i">
                                     <p>Comment:<span v-html="comment.comments"></span></p>
                                     <p> {{ descriptionBy }}</p>
                                     <hr>
                                 </div>
                             </div>
                             <hr>
                         </div>
                     </div>
                 </div>
             </div>
         </article>
         <div>
             <div v-if="showModalEdit">
                 <transition name="modal">
                     <div class="modal-mask">
                         <div class="modal-wrapper">
                             <div class="modal-dialog">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <button type="button" @click="showModalEdit=false">
                                             <span aria-hidden="true">&times;</span>
                                         </button>
                                         <h4 class="modal-title">Edit Article</h4>
                                     </div>
                                     <div class="modal-body">
                                         <div class="panel-body">
                                             <div class="form-group">
                                                 Title:
                                                 <input class="form-control" placeholder=title type="text"
                                                     v-model="titleArticle">
                                             </div>
                                             <div class="form-group">
                                                 Content:
                                                 <editor class="form-control" placeholder=content type="text"
                                                     v-model="contentArticle"></editor>
                                             </div>
                                             <input class="btn btn-success" type="submit" value="Submit"
                                                 @click="editArticle">
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </transition>
             </div>
             <div v-if="showModal">
                 <transition name="modal">
                     <div class="modal-mask">
                         <div class="modal-wrapper">
                             <div class="modal-dialog">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <button type="button" @click="showModal=false">
                                             <span aria-hidden="true">&times;</span>
                                         </button>
                                         <h4 class="modal-title">Comment</h4>
                                     </div>
                                     <div class="modal-body">
                                         <div class="card mb-4">
                                             <div class="card-body">
                                                 <div class="comment-user">
                                                     <div class="form-group">
                                                         Content:
                                                         <editor rows="5" cols="65" v-model="newComment"></editor>
                                                     </div>
                                                     <button class="btn btn-success" @click="addComment">Add
                                                         Comment</button>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </transition>
             </div>
             <div class="three-inline-buttons">
                 <a id="show-modal" @click="showModalEdit = true" v-if="articleAutId === user.id" type="button"
                     name="button" class="btn offset-md-3 col-md-9" data-toggle="modal" data-target="#modalEdit">Edit
                     Post</a>
                 <a id="show-modal" @click="showModal = true" type="button" name="button"
                     class="btn offset-md-6 col-md-9" data-toggle="modal" data-target="#modalEdit">Comment</a>
                 <a v-if="articleAutId === user.id" @click="deteleArticle" type="button" name="button"
                     class="btn offset-md-9 col-md-9">Delete Post</a><br />
             </div>
         </div>
     </div>
 </template>

 <script>
     import axios from 'axios'
     import moment from 'moment'
     import {
         mapState
     } from 'vuex'
     import Editor from '@tinymce/tinymce-vue';
     import Sidebar from '@/components/Sidebar'
     import HeaderNav from '@/components/HeaderNav'
     import swal from 'sweetalert2'

     export default {
         data() {
             return {
                 showModal: false,
                 showModalEdit: false,
                 article: null,
                 titleArticle: '',
                 contentArticle: '',
                 descriptionBy: '',
                 articleAutId: '',
                 articleComment: '',
                 newComment: ''
             }
         },
         props: ['id'],
         components: {
             Sidebar,
             HeaderNav,
             'editor': Editor
         },
         computed: {
             ...mapState([
                 'user'
             ])
         },
         methods: {
             fetchArticlesData: function () {
                 axios({
                     method: 'get',
                     url: `https://new-dj-blog.herokuapp.com/articles/${this.id}`
                 }).then(data => {
                     this.article = data.data.data
                     this.titleArticle = this.article.title
                     this.contentArticle = this.article.content
                     this.articleComment = this.article.comments
                     this.descriptionBy = `by ${this.article.author.name}`
                     this.articleAutId = this.article.author._id
                 }).catch(err => {
                     console.log(err)
                 })
             },
             stringDate: function (date) {
                 return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
             },
             addComment: function () {
                 axios.put(`https://new-dj-blog.herokuapp.com/articles/${this.id}`, {
                     id: this.id,
                     comments: this.newComment
                 }).then(data => {
                     console.log(data, '====addComment......')
                     this.$store.dispatch('getArticles')
                     swal(
                         'Good job!',
                         'Success add comment!',
                         'success'
                     )
                     this.$router.push('/')
                 }).catch(err => {
                     console.log(err)
                 })
             },
             editArticle: function () {
                 let payload = {
                     id: this.id,
                     title: this.titleArticle,
                     content: this.contentArticle
                 }
                 this.$store.dispatch('emitEdit', payload)
                 this.$router.push('/')
                 swal(
                     'Good job!',
                     'Success edit your article!',
                     'success'
                 )
             },
             deteleArticle: function () {
                 axios({
                     method: 'delete',
                     url: `https://new-dj-blog.herokuapp.com/articles/${this.id}`
                 }).then(data => {
                     console.log(data, '====delete.......')
                     this.$store.dispatch('getArticles')
                     swal({
                         title: 'Are you sure?',
                         text: "You won't be able to revert this!",
                         type: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Yes, delete it!'
                     }).then((result) => {
                         if (result.value) {
                             swal(
                                 'Deleted!',
                                 'Your file has been deleted.',
                                 'success'
                             )
                         }
                     })
                     this.$router.push('/')
                 }).catch(err => {
                     console.log(err)
                 })
             }
         },
         created: function () {
             this.fetchArticlesData()
         },
         watch: {
             id: function () {
                 this.fetchArticlesData()
             }
         }
     }
 </script>

 <style scoped>
     .three-inline-buttons .btn {
         text-decoration: underline;
         text-align: center;
         margin-left: 30px;
         margin-right: 15px;
         padding: 0px 35px;
     }

     .three-inline-buttons {
         display: table;
         margin-bottom: 50px;
         margin-top: 20px;
         margin-left: 350px;

     }

     @media only screen and (max-width: 960px) {
         .three-inline-buttons .button {
             width: 100%;
             margin: 20px;
             text-align: center;
         }
     }

     p {
         text-align: justify;
         margin: 0 auto;
         padding: 0px;
         font-size: 15px;
     }

     .scrolling-wrapper {
         overflow: auto;
         height: 130px;

     }

     .modal-mask {
         position: fixed;
         z-index: 9998;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: rgba(0, 0, 0, .5);
         display: table;
         transition: opacity .3s ease;
     }

     .modal-content {
         height: 150%;
         width: 150%;
         position: static;
     }

     .modal-wrapper {
         display: table-cell;
         vertical-align: middle;
     }
 </style>
