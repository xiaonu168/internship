<template>
  <div class="loginbox">
    <h3>请登录 <span> (用户名test密码666)</span></h3>
    <br />
    <br />
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      hide-required-asterisk
    >
      <el-form-item prop="user">
        <span slot="label">用户名：</span>
        <el-input
          placeholder="请输入用户名"
          v-model="form.user"
          clearable
          @keyup.enter.native="loginConfirm"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span slot="label">密码：</span>
        <el-input
          placeholder="请输入用密码"
          v-model="form.password"
          show-password
          clearable
          @keyup.enter.native="loginConfirm"
        >
        </el-input>
        <br />
      </el-form-item>
      <el-form-item class="userlog">
        <el-button round @click="loginConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      form: { user: "", password: "" },
      rules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      info: { username: "", passw: "" },
    };
  },
  mounted() {
    console.log("这是login!");
    axios.get("/jsonfiles/userInfo.json").then((res) => {
      this.info.username = res.data.user;
      this.info.passw = res.data.password;
      this.$nextTick(console.log(this.info.username, this.info.passw));
    });
  },
  methods: {
    loginConfirm() {
      if (
        (this.info.username == this.form.user) &
        (this.info.passw == this.form.password)
      ) {
        sessionStorage.setItem(
          "minitoken",
          this.info.username + "=" + this.info.passw
        );
        this.$router.push({ path: "/home" });
      } else {
        this.$message.error("用户名或密码输入错误！");
      }
    },
  },
};
</script>


<style scoped>
.loginbox {
  margin: 0 auto;
  padding-top: 30px;
  height: 350px;
  width: 320px;
  /* background-image: linear-gradient(rgb(6, 160, 211), rgb(1, 31, 41)); */
  background-color: rgb(1, 41, 54);
  border-radius: 10px;
  position: relative;
  top: 100px;
}
.loginbox h3 {
  color: aliceblue;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
}
h3 span {
  font-size: 14px;
  color: rgb(82, 85, 88);
}
.loginbox .el-form-item {
  margin-top: 40px;
}
.loginbox ::v-deep .el-form-item__label {
  font-size: 14px;
  color: aliceblue;
  font-weight: 700;
}
.loginbox .el-input {
  width: 160px;
}
.loginbox ::v-deep .el-button {
  height: 30px;
  line-height: 8px;
  color: aliceblue;
  border-color: transparent;
  background-color: rgb(20, 172, 231);
  margin: -10px auto;
  width: 100px;
}
</style>
