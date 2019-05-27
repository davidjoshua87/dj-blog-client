import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

const $axios = axios.create({
    baseURL: 'https://new-dj-blog.herokuapp.com/'
})

export default new Vuex.Store({
    state: {
        user: {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            username: localStorage.getItem('username')
        },
        articles: [],
        article: null
    },
    mutations: {
        getArticles: function (state, payload) {
            state.articles = payload.map(val => val)
        },
        clearUser: function (state) {
            state.user.id = ''
            state.user.name = ''
            state.user.email = ''
            state.user.username = ''
        },
        updateUser: function (state) {
            state.user.id = localStorage.getItem('id')
            state.user.name = localStorage.getItem('name')
            state.user.email = localStorage.getItem('email')
            state.user.username = localStorage.getItem('username')
        }
    },
    actions: {
        emitLogin: function (context, payload) {
            $axios({
                method: 'post',
                url: '/users/signin',
                data: {
                    username: payload.email,
                    email: payload.email,
                    password: payload.password
                }
            }).then(response => {

                if (response.data.message !== 'Sign in succesful') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('id', response.data.data.id)
                        localStorage.setItem('name', response.data.data.name)
                        localStorage.setItem('username', response.data.data.username)
                        localStorage.setItem('email', response.data.data.email)
                        context.commit('updateUser')
                    })
                }
            })
        },
        emitSignup: function (context, payload) {
            $axios({
                method: 'post',
                url: '/users/signup',
                data: {
                    username: payload.username,
                    email: payload.email,
                    password: payload.password,
                    name: payload.name
                }
            }).then(response => {

                if (response.data.message !== 'User succesfully created') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('id', response.data.id)
                        localStorage.setItem('name', response.data.name)
                        localStorage.setItem('username', response.data.username)
                        localStorage.setItem('email', response.data.email)
                        context.commit('updateUser')
                    })
                }
            })
        },
        getSearch: function (context, payload) {
            $axios({
                method: 'get',
                url: `/articles/search?title=${payload}`
            }).then(response => {
                console.log('success get data')
                context.commit('getArticles', response.data.data)
            })
        },
        getArticles: function (context) {
            $axios({
                method: 'get',
                url: '/articles'
            }).then(response => {
                console.log('success get data')
                context.commit('getArticles', response.data.data)
            })
        },
        emitPost: function (context, payload) {
            $axios({
                method: 'post',
                url: '/articles',
                data: {
                    title: payload.title,
                    author: context.state.user.id,
                    content: payload.content
                }
            }).then(response => {
                if (response.data.message !== 'Successfully add new article') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        context.dispatch('getArticles')
                    })
                }
            })
        },
        emitEdit: function (context, payload) {
            $axios({
                method: 'put',
                url: '/articles/edit/' + payload.id,
                data: {
                    title: payload.title,
                    content: payload.content
                }
            }).then(response => {
                if (response.data.message !== 'Articles fields have been updated') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        context.dispatch('getArticles')
                    })
                }
            })
        },
        deleteArticle: function (context, payload) {
            $axios({
                method: 'delete',
                url: '/articles/' + payload.id
            }).then(response => {
                if (response.data.message !== 'Successfully deleted articles') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        context.dispatch('getArticles')
                    })
                }
            })
        },
        addComment: function (context, payload) {
            $axios({
                method: 'put',
                url: '/articles/' + payload.id,
                data: {
                    comment: payload.comment,
                    author: payload.author
                }
            }).then(response => {
                if (response.data.message !== 'Add comment to article success') {
                    swal.fire({
                        type: 'warning',
                        text: response.data.message
                    })
                } else {
                    swal.fire({
                        type: 'success',
                        text: response.data.message
                    }).then((next) => {
                        window.location.href = ('/')
                        context.dispatch('getArticles')
                    })
                }
            })
        },
        clearUser: function (context) {
            context.commit('clearUser')
        }
    }
})
