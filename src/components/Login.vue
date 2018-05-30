<template>
  <div class="login">
    <div class="slant-overlay"></div>
    <!-- <div class="title">Digital<span class="orange">m8</span></div> -->
    <div class="title2 raleway">
      Digital<span class="orange">m8</span>
      <h4>PC building, reinvented</h4>
    </div>
    <!-- <div class="title3">Digital<span class="orange">m8</span></div> -->
    <div class="login-container">
      <h2><font-awesome-icon icon="lock" /> Login to <span class="orange">My Account</span></h2>

      <b-form @submit.prevent="onSubmit" @keyup.enter.prevent="onSubmit">
        <b-form-group 
                      label="Email"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Password"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <b-button block type="submit" variant="primary" class="login-button">Login</b-button>
      </b-form>
      <!-- <p class="subtext">New Customer? Sign up <a href="#">here</a><br> --> 
      <p class="subtext"><span class="text-secondary">We'll never share your email with anyone else</span></p>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'
import qs from 'qs'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    validateEmail(email) {
      return re.test(String(email).toLowerCase());
    },
    onSubmit() {
      axios.post('/user/login', qs.stringify(this.form))
        .then(json => {
          console.log(json.data.data.token)
          localStorage.setItem('AuthToken', JSON.stringify(json.data.data.token))
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  height: 100vh;
  background: url('../assets/back2.png');
  background-repeat: no-repeat;
  background-position: cover;
  background-position: center;

}

.slant-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: linear-gradient(70deg, #222 0%, #222 50%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.2) 100%);
  background: linear-gradient(75deg,  rgba(255, 166, 39, 0.481) 0%, rgba(0,0,0,.2) 45%,#222 45%, #222 100%);
}

.title, .title2 {
  font-weight: 200;
  font-size: 8em;
  background: transparent;
  text-align: center;
  position: absolute;
  left: 70%;
  transform: translateX(-50%);
  margin-top: 30px;
}

.title {
  transform: translateX(-50%) translateY(55%) scale(1.1, -1) perspective(250px) rotateX(-70deg);
  opacity: .2;
  animation: 1s ease-out 0s 1 fadeIn;
}

.title2 {
  animation: 1s ease-out 0s 1 slideInFromTop;
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%) translateX(-50%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: .2;
  }
}

.subtext {
  font-size: .8em;
  margin-top: 20px;
}
a {
  color: #e62c2c;
  text-decoration: underline;
}

.login-container {
  border: 1.5px solid orange;
  padding: 30px;
  border-radius: 5px;
  width: 90%;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 3px 10px 3px rgba(0,0,0,0.5);

  h2 {
    font-weight: 300;
  }
}

form {
  margin-top: 20px;
  font-weight: bold;
}

.login-button {
  background: rgb(255, 145, 0);
  border: orange;
}

@media (max-width: 1200px) {
  .slant-overlay {
    background: linear-gradient(80deg,  rgba(255, 166, 39, 0.481) 0%, rgba(0,0,0,.2) 35%,#222 35%, #222 100%);
  }

  .login-container, .title2 {
    left: 60%;
  }
}

@media (max-width: 780px) {
  .slant-overlay {
    background: #222;
  }

  .login-container, .title2 {
    left: 50%;
  }
}
</style>
