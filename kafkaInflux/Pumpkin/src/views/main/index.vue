<template>

  <div class="main-wrapper" >
    <!--布局-->
    <el-container style="height: 100%">
      <!--左导航-->
        <el-aside width="0px" >

      </el-aside>
      <!--right direct-->
      <el-container >
        <!--head-->
        <el-header height="50px" style="text-align: left;background-color: wheat" >
          <el-row>
            <el-col :span="4">
            <el-popover
                    placement="bottom"
                    width="50"
                    height="50"
                    trigger="click"
                    style="box-shadow: 0 2px 12px 0 rgba(1, 0, 0, 0.1) "
            >
                  <a href="/" @click="signout" >sign out</a>

              <a slot="reference" style="margin: 10px;height: 40px;width: 100px; color: black;line-height: normal" >
                 Welcome! {{user.nickName}}
              </a>
            </el-popover>
            </el-col>
          </el-row>

        </el-header>
        <el-main>
          <div class="main-box">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import main from './index'
  export default main;
</script>

<style scoped lang="scss">
.main-wrapper {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;


  .aside-logo-wrapper {
    text-align: center;
    background-color: #B3C0D1;
    height: 60px;
    line-height: 60px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }

    span {
      font-weight: 700;
      color: #fff;
      font-family: "华文行楷";
    }


  }


}

.el-scrollbar {
  height: calc(100% - 60px);
}

.el-main {
  background-color: #E9EEF3;
  color: #606266;
  padding: 6px 0 0 6px;

  .main-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 0px 0px 15px;
    box-sizing: border-box;
  }


}



</style>