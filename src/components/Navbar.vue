<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <router-link class="navbar-brand" :to="{path: '/'}">Dj-Blog</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link btn" :to="{path: '/'}">Home <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <li class="nav-item" @click="showModalAdd = true" v-if='user.id !== "" && user.id !== null'
                        id="show-modal" data-toggle="modal" data-target="#modalAdd">
                        <a class="nav-link btn">Add Article</a>
                    </li>
                    <li class="nav-item" v-if='user.id !== "" && user.id !== null'>
                        <router-link class="nav-link btn" :to="{path: '/profile'}">Welcome: {{user.username}}
                        </router-link>
                    </li>
                    <li class="nav-item" v-if='user.id === "" || user.id === null'>
                        <router-link class="nav-link btn" :to="{path: '/masuk'}">Sign In</router-link>
                    </li>
                    <li class="nav-item" @click='logout' v-if='user.id !== "" && user.id !== null'>
                        <router-link class="nav-link btn" :to="{path: '/'}">Logout</router-link>
                    </li>
                    <li class="nav-item" v-if='user.id === "" || user.id === null'>
                        <router-link class="nav-link btn" :to="{path: '/daftar'}">Sign Up</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div v-if="showModalAdd" class="modal fade" id="modalAdd" tabindex="-1" role="dialog"
            aria-labelledby="modalAddLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAddLabel">Add Article</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                Title:
                                <input class="form-control" name="title" type="text" v-model="title">
                            </div>
                            <div class="form-group">
                                Content:
                                <editor api-key="e35okpdgs5wel4anlmpc3mambugjgzs7bye50qeitpamkhgj" class="form-control"
                                    v-model="content"></editor>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success btn-block" @click="addPost">Add Article</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2'
    import Editor from '@tinymce/tinymce-vue';
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                showModalAdd: false,
                title: '',
                content: ''
            }
        },
        components: {
            'editor': Editor
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        methods: {
            addPost() {
                let newPost = {
                    title: this.title,
                    content: this.content
                }
                if (this.title === '') {
                    swal.fire({
                        type: 'error',
                        text: 'Title must be filled!'
                    })
                } else if (this.content === '') {
                    swal.fire('Content must be filled!', {
                        icon: 'warning'
                    })
                } else {
                    this.$store.dispatch('emitPost', newPost)
                    this.$router.push({
                        path: '/'
                    })
                    this.title = ''
                    this.content = ''
                }
            },
            logout() {
                swal.fire({
                    title: 'Alert',
                    text: 'Do you really want to log out?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Logout!'
                }).then((result) => {
                    if (result.value) {
                        swal.fire({
                            type: 'success',
                            text: 'You have successfully logged out!'
                        }).then((next) => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('id')
                            localStorage.removeItem('username')
                            localStorage.removeItem('email')
                            localStorage.removeItem('name')
                            this.$store.dispatch('clearUser')
                            this.$router.push('/')
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>
    #mainNav {
        position: absolute;
        border-bottom: 1px solid #e9ecef;
        background-color: rgba(255, 255, 255, 0);
    }

    #mainNav .navbar-brand {
        font-weight: 800;
        color: #343a40;
    }

    #mainNav .navbar-toggler {
        font-size: 12px;
        font-weight: 800;
        padding: 13px;
        text-transform: uppercase;
        color: #343a40;
    }

    #mainNav .navbar-nav>li.nav-item>a {
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
</style>
