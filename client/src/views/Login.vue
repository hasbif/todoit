<template>
  <div
    style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%"
  >
    <div>
      <h1 style="font-size: 40px; font-weight: bold; border-bottom: 2px solid #ff3860;">Todo It</h1>
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Login" icon="account">
          <section>
            <b-field label="Email">
              <b-input type="email" maxlength="30" v-model="loginUser.email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password" password-reveal v-model="loginUser.password"></b-input>
            </b-field>
            <b-button @click="login" type="is-danger">Login</b-button>
          </section>
        </b-tab-item>

        <b-tab-item label="Register" icon="account-details">
          <section>
            <b-field label="Email">
              <b-input type="email" maxlength="30" v-model="regUser.email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" password-reveal v-model="regUser.password"></b-input>
            </b-field>
            <b-button @click="register" type="is-danger">Register</b-button>
          </section>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import url from "../database";
export default {
  name: "Login",
  data: function() {
    return {
      loginUser: { email: null, password: null },
      regUser: { email: null, password: null, pwdConfirm: null }
    };
  },
  methods: {
    resetLogin() {
      this.loginUser.email = null;
      this.loginUser.password = null;
    },
    resetReg() {
      this.regUser.email = null;
      this.regUser.password = null;
    },
    login() {
      this.axios
        .post(url + "login", {
          email: this.loginUser.email,
          password: this.loginUser.password
        })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("email", res.data.email);
          this.$store.dispatch("getTodoList");
          this.$router.push("/list");
          this.toast("welcome", "is-danger");
        })
        .catch(err => {
          console.log(err.response);
          this.toast("invalid cridentials", "is-warning");
        });
      this.resetLogin();
    },
    register() {
      this.axios
        .post(url + "register", {
          email: this.regUser.email,
          password: this.regUser.password
        })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("email", res.data.email);
          this.$router.push("/list");
          this.toast("welcome", "is-danger");
        })
        .catch(err => {
          console.log(err.response);
          this.toast("email is taken / empty cridentials", "is-warning");
        });
      this.resetReg();
    },
    toast(msg, type) {
      this.$buefy.toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    }
  }
};
</script>