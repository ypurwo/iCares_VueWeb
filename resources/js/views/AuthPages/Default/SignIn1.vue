<template>
  <div>
    <h1 class="mb-0">Log In</h1>
    <p>Enter your PIN and password to access admin panel.</p>
    <div class="mt-4" >
      <div class="form-group">
        <label for="exampleInputEmail1">User PIN</label>
        <input type="text" v-model="form.NoPIN" class="form-control mb-0" id="exampleInputEmail1"  placeholder="NoPIN">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <!-- <a href="#" class="float-right">Forgot password?</a> -->
        <input type="password" @keyup.enter="submit" v-model="form.password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="d-inline-block w-100">
        <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
          <input type="checkbox" class="custom-control-input" id="customCheck1">
          <label class="custom-control-label" for="customCheck1">Remember Me</label>
        </div>
        <button @click="submit" class="btn btn-primary float-right">Sign in</button>
      </div>
      <!-- <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2">Don't have an account? <a href="#">Sign up</a></span>
        <ul class="iq-social-media">
          <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
          <li><a href="#"><i class="ri-twitter-line"></i></a></li>
          <li><a href="#"><i class="ri-instagram-line"></i></a></li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import store from '../../../store'
export default {
  name: 'SignIn',
  data(){
    return{
      form:{
        NoPIN:'',
        password:''
      }
    }
  },
  methods:{
  async submit(){
  let response =await store.dispatch('auth/SignIn',this.form)
  
  this.$router.go('/');}

  }
}
</script>
