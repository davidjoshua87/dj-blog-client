<template>
    <div class="container">
        <Navbar></Navbar>
        <div class="row vertical-offset-100">
            <div class="col-md-4 offset-md-4 my-auto">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Login</h3><br>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <input class="form-control" placeholder="E-mail" name="email" type="text" v-model="email">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Password" name="password" type="password"
                                v-model="password">
                        </div>
                        <input class="btn btn-lg btn-success btn-block" type="submit" value="Login" @click="login">
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
        name: 'SignIn',
        components: {
            Navbar
        },
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                let email = this.email
                let password = this.password
                let loginData = {
                    email: email,
                    password: password
                }
                this.$store.dispatch('emitLogin', loginData)
                this.email = ''
                this.password = ''
            }
        }
    }
</script>

<style scoped>
    .vertical-offset-100 {
        padding-top: 100px;
    }
</style>
