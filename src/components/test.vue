<div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">Dj-Blog</router-link>
        </div>
        <!-- <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> -->
          <!-- <ul class="navbar-nav ml-auto"> -->
            <router-link :to="{path: '/'}">
              <li class="nav-item">
                <a class="nav-link btn">Home</a>
              </li>
            </router-link>

            <div-link v-if='user.id !== "" && user.id !== null'>
              <li class="nav-item">
                <a id="show-modal" @click="showModalAdd = true" class="nav-link btn" data-toggle="modal" data-target="#modalAdd">Add Post</a>
              </li>
            </div-link>

            <router-link :to="{path: '/profile'}" v-if='user.id !== "" && user.id !== null'>
              <li class="nav-item">
                <a class="nav-link btn">Welcome: {{user.username}}</a>
              </li>
            </router-link>

            <router-link :to="{path: '/'}" v-if='user.id !== "" && user.id !== null'>
              <li @click='emitLogout' class="nav-item">
                <a class="nav-link btn">Logout</a>
              </li>
            </router-link>

            <router-link :to="{path: '/masuk'}" v-if='user.id === "" || user.id === null'>
              <li class="nav-item">
                <a class="nav-link btn">Login</a>
              </li>
            </router-link>

            <router-link :to="{path: '/daftar'}" v-if='user.id === "" || user.id === null'>
              <li class="nav-item">
                <a class="nav-link btn">Sign Up</a>
              </li>
            </router-link>
          <!-- </ul> -->
        <!-- </div> -->
      </div>
    </nav>