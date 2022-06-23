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
        <el-header height="10" style="text-align: left;background-color: white" >
          <el-menu
                   router
                  :default-active="activeIndex"
                  class="el-menu-demo" mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
            <el-row>
              <el-col :span="1">
                <el-menu-item index="2" route="/server">server</el-menu-item>
              </el-col>
              <el-col :span="1">
            <el-menu-item index="1" route="/show">scheduleTask</el-menu-item>
              </el-col>
              <el-col :span="1">
            <el-menu-item index="2" route="/history">history</el-menu-item>
              </el-col>
              <el-col :span="16">
                &nbsp
              </el-col>
              <el-col :span="2">
            <el-menu-item >
              <el-popover
                    placement="bottom"
                    width="50"
                    height="50"
                    trigger="click"
                    style="box-shadow: 0 2px 12px 0 rgba(1, 0, 0, 0.1) "
            >
              <a href="/" @click="signout" >sign out</a>
              <a slot="reference" style="margin: 10px;height: 40px;width: 100px; color: #ffbb1f;line-height: normal" >
                Welcome! {{user.nickName}}
              </a>
            </el-popover>
            </el-menu-item>
              </el-col>
            </el-row>
          </el-menu>
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