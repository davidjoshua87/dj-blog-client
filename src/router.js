import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Home from './views/Home'
import SignUp from '@/components/SignUp'
import EditPost from '@/components/EditPost'
import ArticleMain from '@/components/ArticleMain'
import ArticleList from '@/components/ArticleList'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/masuk',
    name: 'SignIn',
    component: SignIn
  }, {
    path: '/daftar',
    name: 'Daftar',
    component: SignUp
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: 'article/:id',
      name: 'ArticleMain',
      props: true,
      component: ArticleMain
    }, {
      path: 'edit/:id',
      name: 'EditPost',
      component: EditPost
    }, {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    }]
  }]
})
