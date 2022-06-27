<template>
    <el-container  >
    <el-header align="center" style="line-height: 1.7;margin: 10px;background-color: white">
        <el-row>
                <el-col :span="4" align="left">
                    <el-button type="text" @click="dialogVisible = true" v-if="isShowFresher"><el-tag type="success" effect="dark">single server setting</el-tag></el-button>
                </el-col>
        <el-col :span="4" align="left">
            <el-button type="text" @click="dialogVisible2 = true"><el-tag type="success" effect="dark">multiple server setting</el-tag></el-button>
        </el-col>
            <el-col :span="18" align="right">
                <el-dropdown  trigger="click" @command="chooseSystem">
                    <el-button type="primary" >
                        System<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="b">expert</el-dropdown-item>
                        <el-dropdown-item command="a">novice</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="1" align="right">
                <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                    instruction
                </el-button>
            </el-col>
            <el-drawer
                    title="Introduce"
                    :visible.sync="drawer"
                    :direction="direction"
                    :before-close="handleClose5"
                    align="left">
                <span>This is the manual of InfluxDB system</span><br/>
                <span>Type:</span><br/>
                <span>1.pittsburgh: csvToInfluxDBProducer and pittsburgh: csvToInfluxDBConsumer</span><br/>
                <span>2.la: csvToInfluxDBProducer and la: csvToInfluxDBConsumer</span><br/>
                <span>3.pittsburgh: csvToInfluxDBProducer and la: csvToInfluxDBConsumer</span><br/>
                <span>4.la: csvToInfluxDBProducer and pittsburgh: csvToInfluxDBConsumer</span><br/>
            </el-drawer>
        </el-row>
        </el-header>
        <el-main>
            <el-row v-if="isShowFresher">
                <el-col :span="8">
            <el-card class="box-card" shadow="always" style="background-color: #409EFF">
                <div  slot="header" align="left">
                <el-cascader
                        v-model="value"
                        :options="options"
                        @change="handleChange1"
                        style="width: 200px"></el-cascader>
                </div>
                <el-descriptions title="Producer details"  :column="1" border>
                    <el-descriptions-item label="address:" >{{tableData[0].address}}</el-descriptions-item>
                    <el-descriptions-item label="type:">{{tableData[0].type}}</el-descriptions-item>
                    <el-descriptions-item label="status:">{{tableData[0].status}}</el-descriptions-item>
                </el-descriptions>
            </el-card>
                </el-col>
            </el-row>
            <br/>
            <el-row  v-if="isShowFresher">
                <el-col :span="8">
                    <el-card class="box-card" shadow="always" style="background-color: #85ce61">
                        <div  slot="header" align="left">
                            <el-cascader
                                    v-model="value4"
                                    :options="options2"
                                    @change="handleChange2"
                                    style="width: 200px"></el-cascader>
                        </div>
                        <el-descriptions title="Consumer details"   :column="1" border>
                            <el-descriptions-item label="address:">{{tableData2[0].address}}</el-descriptions-item>
                            <el-descriptions-item label="type:">{{tableData2[0].type}}</el-descriptions-item>
                            <el-descriptions-item label="threads:">{{tableData2[0].threads}}</el-descriptions-item>
                            <el-descriptions-item label="sleepTime:">{{tableData2[0].sleepTime}}</el-descriptions-item>
                            <el-descriptions-item label="status:">{{tableData2[0].status}}</el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </el-col>
            </el-row>
            <el-row v-if="isShowExport" :gutter="40">
                <el-col :span="24">
                <el-card style="background-color: #a4e9ff">
                    <div slot="header" align="left">
                        <el-row  :gutter="10">
                            <el-col :span="2">
                                <el-cascader
                                        v-model="tmpServerLocation"
                                        :options="serverLocation"
                                         ></el-cascader>
                            </el-col>
                            <el-col :span="2">
                                <el-cascader
                                        v-model="tmpServerType"
                                        :options="serverType"
                                         ></el-cascader>
                            </el-col>
                            <el-col :span="2">
                                <el-cascader
                                        v-model="tmpServerStatus"
                                        :options="serverStatus"
                                ></el-cascader>
                            </el-col>
                            <el-button type="success" @click="searchServer()">
                             search
                            </el-button>
                            <el-button type="danger" @click="clearSearchServer()">
                                reset
                            </el-button>
                        </el-row>
                    </div >
                    <div >
                    <el-col :span="24">
                <el-table
                        :data="serverDataTmp"
                        style="width: 100%;margin-bottom: 20px"  border v-loading="loading">
                    <el-table-column
                            prop="server"
                            label="serverName" v-if="isShowServer"  width="200" fixed="left">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="type" v-if="isShowServer"  width="200"fixed="left">
                    </el-table-column>
                    <el-table-column
                            prop="location"
                            label="location" v-if="isShowServer"  width="200"fixed="left">
                    </el-table-column>
                    <el-table-column
                            prop="thread"
                            label="Thread" v-if="isShowServer2"  width="200"fixed="left">
                    </el-table-column>
                    <el-table-column
                            prop="sleepTime"
                            label="sleepTime" v-if="isShowServer2"  width="200"fixed="left">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="status" v-if="isShowServer"  width="200"fixed="left">
                    </el-table-column>
                    <el-table-column label="operation"  prop="isShowServer3">
                        <template slot-scope="scope">
                        <el-row :gutter="70">
                            <el-col :span="2">
                        <el-button size="mini" type="success">start</el-button>
                            </el-col>
                            <el-col :span="2">
                            <el-button size="mini" type="danger">stop</el-button>
                            </el-col>
                            <el-col :span="3">
                            <el-button size="mini" type="primary">restart</el-button>
                            </el-col>
                            <el-col :span="3">
                            <el-button size="mini" type="warning" v-if="scope.row.isShowServer3" >setting</el-button>
                            </el-col>
                        </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                </el-col>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </el-main>

        <el-dialog
                title="Single Server Setting"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
      <el-form ref="form" :model="form" label-width="80px" align="left">
               <el-form-item label="Service">
                   <el-cascader
                           v-model="form.service"
                           :options="options3"
                           @change="handleChange3"
                           style="width: 300px"></el-cascader>
               </el-form-item>
               <el-form-item label="Status">
                   <el-switch
                           v-model="status"
                           active-text="start"
                           inactive-text="stop"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                   </el-switch>
               </el-form-item>
             <el-form-item label="Threads" v-if="isShow">
             <el-select v-model="form.threads" placeholder="select threads number">
             <el-option label="1" value="1"></el-option>
             <el-option label="2" value="2"></el-option>
             <el-option label="3" value="3"></el-option>
             </el-select>
             </el-form-item>
           <el-form-item label="SleepTime" v-if="isShow">
             <el-select v-model="form.sleepTime" placeholder="select threads number">
             <el-option label="3000" value="3000"></el-option>
             <el-option label="4000" value="4000"></el-option>
             <el-option label="5000" value="5000"></el-option>
             </el-select>
             </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="onSubmit();dialogVisible=false">finish</el-button>
                   <el-button @click="dialogVisible=false">cancel</el-button>
               </el-form-item>
           </el-form>
  </span>
        </el-dialog>
        <el-dialog
                title="Multiple Server Setting"
                :visible.sync="dialogVisible2"
                width="80%"
                :before-close="handleClose2">
            <span slot="footer" class="dialog-footer">
      <el-form ref="form" :model="form" label-width="1000px" align="center">
                <p style="text-align: center; margin: 0 0 20px">please choose source and destination servers</p>
    <div class="edit_dev" >
         <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value5"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['Source', 'Destination']"
            :button-texts="['go left', 'go right']"
            filter-placeholder="please Input server name"
            :format="{
                  noChecked: '${total}',
                   hasChecked: '${checked}/${total}'
                       }"
            @change="handleChange4"
            :data="data">
      <el-button class="transfer-footer" slot="left-footer" size="small" type="primary">start</el-button>
       <el-button class="transfer-footer" slot="left-footer" size="small" type="success" @click="multipleShowValue(option)">set as source service</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small" type="primary">start</el-button>
    </el-transfer>
  </div>
               <el-form-item>
                   <el-button type="primary" @click="onSubmit();dialogVisible2=false">finish</el-button>
                   <el-button @click="dialogVisible2=false">cancel</el-button>
               </el-form-item>
           </el-form>
  </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import server from './index'

    export default server;
</script>

<style   scoped>
.edit_dev >>> .el-transfer-panel{
    width: 350px;
}
</style>