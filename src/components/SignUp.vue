<template>
    <div class="container">
        <navbar></navbar>
        <div class="row vertical-offset-100">
            <div class="col-md-4 offset-md-4 my-auto">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign Up</h3><br>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <input class="form-control" placeholder="Name" name="name" type="text" v-model="name">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="E-mail" name="email" type="text" v-model="email">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Username" name="username" type="text"
                                v-model="username">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Password" name="password" type="password"
                                v-model="password">
                        </div>
                        <input class="btn btn-lg btn-success btn-block" type="submit" value="Signup" @click="signup">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar'
    import swal from 'sweetalert2'

    export default {
        name: 'SignUp',
        components: {
            Navbar
        },
        data() {
            return {
                email: '',
                password: '',
                username: '',
                name: ''
            }
        },
        methods: {
            signup: function () {
                let email = this.email
                let password = this.password
                let username = this.username
                let name = this.name
                let signUpData = {
                    email: email,
                    password: password,
                    username: username,
                    name: name

                }
                this.$store.dispatch('emitSignup', signUpData)
                this.email = ''
                this.password = ''
                this.name = ''
                this.username = ''
            }
        }
    }
</script>

<style scoped>
    .vertical-offset-100 {
        padding-top: 100px;
    }
</style>
