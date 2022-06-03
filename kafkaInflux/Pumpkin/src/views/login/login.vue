
<template>
<div class="front" >

  <div class="background" >
    <el-image :src="require('../../assets/shanghai-6579053.jpg')" style="height: 100%;width: 100%">
    </el-image>
  </div>
    <!--<img src="../../assets/keli.gif" alt="">-->

    <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span>pumpkin-Reddit search system</span>
      </div>
    <el-form ref="user" :model="user">
      <el-form-item label="Account">
        <el-input v-model="puser.uid" placeholder="userName" suffix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <!--<el-button style="float: right;" @click="dialogVisible2 = true" type="text" >ForgotPassWord?</el-button>-->
        <el-input v-model="puser.passWord" placeholder="passWord" suffix-icon="el-icon-key"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button plain type="primary" @click="userlogin">sign in</el-button>
      </el-form-item>
      <el-form-item align="center">
        Don't have a account?
        <el-button type="text" @click="dialogVisible = true">sign on</el-button>
      </el-form-item>
    </el-form>
    </el-card>

  <el-dialog
          title="Create New Account"
          :visible.sync="dialogVisible"
          :append-to-body="true"
  >
    <el-form ref="form" :model="formData" label-width="240px">
      <el-form-item label="userName" size="small">
        <el-input v-model="formData.uid"  style="width: 240px;"></el-input>
      </el-form-item>

      <el-form-item label="passWord">
        <el-input v-model="formData.passWord" size="small" style="width: 240px;"></el-input>
      </el-form-item>

      <el-form-item label="nickName">
        <el-input v-model="formData.nickName" size="small" style="width: 240px;"></el-input>
      </el-form-item>

      <el-form-item label="email">
        <el-input v-model="formData.email" size="small" style="width: 240px;"></el-input>
      </el-form-item>

      <el-button type="primary" size="mini" @click="dialogVisible = false,add()">confirm</el-button>
      <el-button size="mini" @click="dialogVisible = false">cancel</el-button>
    </el-form>
  </el-dialog>

  <!--<el-dialog-->
          <!--title="Change password"-->
          <!--:visible.sync="dialogVisible2"-->
          <!--width="40%"-->
  <!--&gt;-->
    <!--<el-form ref="form" :model="formData" label-width="240px">-->
      <!--<el-form-item label="username" size="small">-->
        <!--<el-input v-model="formData2.uid"  style="width: 240px;"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="email" size="small">-->
        <!--<el-input v-model="formData2.email"  style="width: 240px;"></el-input>-->
      <!--</el-form-item>-->


      <!--<el-button type="primary" size="mini" @click="dialogVisible2 = false,resetpassword()" >Send checkCode</el-button>-->
      <!--<el-button size="mini" @click="dialogVisible2 = false">cancel</el-button>-->
    <!--</el-form>-->
  <!--</el-dialog>-->
  </div>

</template>

<script>

  import login from './index'

export default login
</script>

<style  scoped>
  .el-card {
    margin-top: 200px;
    margin-left: 550px;
    border-radius: 6px;
    width: 320px;
  }

  .el-input {
    width: 270px;
  }

  .el-form {
    margin: 0px auto;
    margin-top: 5px;
  }

  .box
  {width:100%; height:100%; margin:0 auto; border:1px solid #666;
    background:url(../../assets/keli.gif)no-repeat 10px center}


  .background {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }
  .front{
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }

</style>