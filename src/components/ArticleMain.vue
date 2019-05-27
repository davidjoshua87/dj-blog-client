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
                         <div v-if="articleComment.length > 0">
                             <hr>
                             <h4 class="modal-title" >Comment</h4>
                             <hr>
                             <div class="scrolling-wrapper">
                                 <div class="comment-user card" v-for="(list,i) in articleComment" :key="i">
                                     <br />
                                     <p><span v-html="list.comment"></span></p>
                                     <p> by: {{ list.author }}</p>
                                     <br />
                                 </div>
                             </div>
                             <hr>
                         </div>
                     </div>
                     <div class="offset-md-3 col-md-8">
                         <div v-if="showModalEdit" class="modal fade" id="modalEdit" tabindex="-1" role="dialog"
                             aria-labelledby="modalEditLabel" aria-hidden="true">
                             <div class="modal-dialog" role="document">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <h5 class="modal-title" id="modalEditLabel">Edit Article</h5>
                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">&times;</span>
                                         </button>
                                     </div>
                                     <div class="modal-body">
                                         <form>
                                             <div class="form-group">
                                                 Title:
                                                 <input class="form-control" name="title" type="text"
                                                     v-model="titleArticle">
                                             </div>
                                             <div class="form-group">
                                                 Content:
                                                 <editor api-key="e35okpdgs5wel4anlmpc3mambugjgzs7bye50qeitpamkhgj"
                                                     class="form-control" v-model="contentArticle"></editor>
                                             </div>
                                         </form>
                                     </div>
                                     <div class="modal-footer">
                                         <button type="button" class="btn btn-secondary"
                                             data-dismiss="modal">Close</button>
                                         <button type="button" class="btn btn-success btn-block" @click="edit">Edit
                                             Article</button>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         <div v-if="showModalComment" class="modal fade" id="modalComment" tabindex="-1" role="dialog"
                             aria-labelledby="modalCommentLabel" aria-hidden="true">
                             <div class="modal-dialog" role="document">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <h5 class="modal-title" id="modalCommentLabel">Comment Article</h5>
                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">&times;</span>
                                         </button>
                                     </div>
                                     <div class="modal-body">
                                         <form>
                                             <div class="form-group">
                                                 Comment:
                                                 <editor api-key="e35okpdgs5wel4anlmpc3mambugjgzs7bye50qeitpamkhgj"
                                                     class="form-control" v-model="newComment"></editor>
                                             </div>
                                         </form>
                                     </div>
                                     <div class="modal-footer">
                                         <button type="button" class="btn btn-secondary"
                                             data-dismiss="modal">Close</button>
                                         <button class="btn btn-success" @click="comment">Submit</button>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         <div class="three-inline-buttons col">
                             <a id="show-modal" @click="showModalEdit = true" v-if="articleAutId === user.id"
                                 type="button" class="btn col-sm-12 col-md-4 col-lg-4 col-xl-4" data-toggle="modal"
                                 data-target="#modalEdit">Edit
                                 Post</a>
                             <a id="show-modal" @click="showModalComment = true" v-if="user.id !== null" type="button"
                                 class="btn col-sm-12 col-md-4 col-lg-4 col-xl-4" data-toggle="modal"
                                 data-target="#modalComment">Comment</a>
                             <a v-if="articleAutId === user.id" @click="deleted" type="button"
                                 class="btn col-sm-12 col-md-4 col-lg-4 col-xl-4">Delete Post</a><br />
                         </div>
                     </div>
                 </div>
             </div>
         </article>
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
                 showModalComment: false,
                 showModalEdit: false,
                 article: null,
                 titleArticle: '',
                 contentArticle: '',
                 descriptionBy: '',
                 articleAutId: '',
                 articleComment: '',
                 newComment: '',
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
             fetchArticlesData() {
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
             stringDate(date) {
                 return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
             },

             comment() {
                 let id = this.id;
                 let comment = this.newComment;
                 let author = this.user.username
                 let dataComment = {
                     id: id,
                     comment: comment,
                     author: author
                 }
                 if (this.newComment === '') {
                     swal.fire({
                         type: 'error',
                         text: 'comment must be filled!'
                     })
                 } else {
                     this.$store.dispatch('addComment', dataComment)
                     this.newComment = ''
                 }
             },

             edit() {
                 let payload = {
                     id: this.id,
                     title: this.titleArticle,
                     content: this.contentArticle
                 }
                 this.$store.dispatch('emitEdit', payload)
             },
             deleted() {
                 swal.fire({
                     title: 'Are you sure?',
                     text: "You won to delete this!",
                     type: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                     confirmButtonText: 'Yes, delete it!'
                 }).then((result) => {
                     if (result.value) {
                         let payload = {
                             id: this.id,
                         }
                         this.$store.dispatch('deleteArticle', payload);
                     }
                 })
             },
         },
         created() {
             this.fetchArticlesData()
         },
         watch: {
             id() {
                 this.fetchArticlesData()
             }
         }
     }
 </script>

 <style scoped>
     .three-inline-buttons .btn {
         text-decoration: none;
         text-align: center;
         margin: auto;
         padding: 0px 25px;
     }

     .three-inline-buttons .btn:hover {
         color: black;
         font-weight: 500;
     }

     .three-inline-buttons {
         display: table;
         margin-bottom: 50px;
         margin-top: 20px;

     }

     p {
         text-align: justify;
         margin: 0 auto;
         padding: 0px;
         font-size: 15px;
     }

     .scrolling-wrapper {
         overflow: auto;
         height: 225px;
     }

     .card {
         background-color: transparent;
     }

     .card p {
         margin: 0;
         margin-left: 15px;
     }

     .modal-wrapper {
         display: table-cell;
         vertical-align: middle;
     }
 </style>
