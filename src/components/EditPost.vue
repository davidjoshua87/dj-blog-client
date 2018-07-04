<template>
<div class="container">
  <navbar></navbar>
  <div class="row vertical-offset-100">
    <div class="col-md-4 offset-md-4 my-auto">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Edit Article</h3><br>
        </div>
        <div class="panel-body">
          <div class="form-group">
            Title:
            <input class="form-control" placeholder="title" name="title" type="text" v-model="editArticle.title">
          </div>
          <div class="form-group">
            Content:
            <textarea class="form-control" placeholder="content" v-model="editArticle.content"></textarea>
          </div>
          <input class="btn btn-lg btn-success btn-block" type="submit" value="Submit" @click="emitEdit">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'EditPost',
  components: {
    Navbar
  },
  data () {
    return {
      editArticle: {
        title: '',
        content: ''
      },
      article: null,
      titleArticle: '',
      descriptionBy: '',
      contentText: '',
      articleAutId: ''
    }
  },
  methods: {
    emitEdit: function () {
      this.$store.dispatch('emitEdit', this.editArticle)
      this.editArticle.title = ''
      this.editArticle.content = ''
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
