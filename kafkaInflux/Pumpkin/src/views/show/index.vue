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
            <el-col :span="12" align="right">
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
            <el-col :span="4" align="right">
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
                        <el-row >
                        <el-col :span="4">
                            <el-cascader
                                    v-model="service"
                                    :options="serviceName"
                                    @change="handleChangeService"></el-cascader>
                        </el-col>
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
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="11">
                <el-card class="box-card" shadow="always" style="background-color: blanchedalmond">
                    <div  slot="header" align="left">
                        <el-dropdown  trigger="click" @command="chooseMethods">
                        <el-button type="primary" >
                            Methods<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item command="a">manually</el-dropdown-item>
                            <el-dropdown-item command="b">timer</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                        <br/>
                        <br/>
                        <el-card v-if="isShow2" style="background-color: beige">
                        <el-row>
                            <el-col :span="8">
                                <el-button v-if="isShow2" style="color: red;font-size: small" size="mini" round>check types from instruction and input directory path</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <el-select v-model="value7" placeholder="type"  v-if="isShow2" >
                                    <el-option
                                            v-for="item in options4"
                                            :key="item.value7"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="DirVo.dir" placeholder="please Input directory path" v-if="isShow2"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary" @click="changeColor" v-if="isShow2">start</el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="warning" @click="clear" v-if="isShow2">reset</el-button>
                            </el-col>
                        </el-row>
                        </el-card>
                        <el-row>
                            <el-card  v-if="isShow3" style="background-color: beige">
                            <el-form ref="form" :model="form" label-width="30%"  v-if="isShow3">
                                <el-form-item label="chooseType">
                                        <el-select v-model="value8" placeholder="type"  v-if="isShow3" style="width: 20%">
                                            <el-option
                                                    v-for="item in options5"
                                                    :key="item.value8"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item label="input directory path">
                                        <el-input v-model="ScheduleTaskVo.dir" placeholder="Input directory path" style="width: 50%" v-if="isShow3"></el-input>
                                </el-form-item>
                                <el-form-item label="choose execute periode">
                                        <el-date-picker
                                                v-model="value9"
                                                type="daterange"
                                                range-separator="To"
                                                start-placeholder="Start date"
                                                end-placeholder="End date" v-if="isShow3">
                                        </el-date-picker>
                                </el-form-item>
                                <el-form-item label="choose execute time">
                                        <el-time-picker
                                                v-model="autoDate"
                                                :picker-options="{
                                                 selectableRange: '00:00:00 - 23:59:59'
                                                 }"
                                                placeholder="anytime">
                                        </el-time-picker>
                                </el-form-item>
                                <el-form-item label="executeInterval">
                                    <el-input-number v-model="ScheduleTaskVo.executeInterval" style="width: 50%" v-if="isShow3" @change="handleChangeNumber" :min="1" :max="10"></el-input-number>
                                </el-form-item>
                                <el-form-item label="">
                                        <el-button type="primary" @click="scheduleTaskStart" v-if="isShow3" >submit</el-button>
                                        <el-button type="warning" @click="clearScheduleTask" v-if="isShow3" >reset</el-button>
                                </el-form-item>
                            </el-form>
                            </el-card>
                        </el-row>
                    </div>
                    <div >
                        <el-row>
                    <el-descriptions title="Progress details" :column="1" border >
                        <el-descriptions-item label="source:" >{{tableData3[0].source+": "+tableData3[0].sourceType}}</el-descriptions-item>
                        <el-descriptions-item label="destination:" >{{tableData3[0].destination+": "+tableData3[0].destinationType}}</el-descriptions-item>
                    </el-descriptions>
                        </el-row>
                        <br/>
                    <el-row>
                    <el-col :span="5">
                        <el-progress type="dashboard" :percentage="percentage" :color="colors"  ></el-progress>
                    </el-col>
                    <el-col :span="8">
                        <el-descriptions   :column="2" border :size="mini" >
                            <el-descriptions-item label="totalFiles:" >{{this.processResult.total}}</el-descriptions-item>
                            <el-descriptions-item label="successFiles:">{{this.processResult.success}}</el-descriptions-item>
                            <el-descriptions-item label="failureFiles:">{{this.processResult.failure}}</el-descriptions-item>
                            <el-descriptions-item label="totalTime:">{{this.processResult.totalTime}}</el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                    </el-row>
                    </div>
                </el-card>
                </el-col>

                <el-col :span="13">
                    <el-card class="box-card" shadow="always" style="background-color: blanchedalmond">
                        <div  slot="header" align="left">
                            <el-row >
                                <el-col :span="7">
                            <span>ScheduleTask</span>
                                </el-col>
                            </el-row>
                            <br/>
                            <el-row>
                                <el-button style="color: red">please input names of sheduleTasks or check them by date</el-button>
                            </el-row>
                            <el-card style="background-color: beige">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <el-select v-model="tmpTaskType" placeholder="type" >
                                        <el-option
                                                v-for="item in options5"
                                                :key="item.value8"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="10">
                                    <el-date-picker
                                            v-model="value6"
                                            type="daterange"
                                            range-separator="To"
                                            start-placeholder="Start date"
                                            end-placeholder="End date"
                                            :clearable="false">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="success" @click="checkAllScheduleTask">search</el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="danger" @click="clearCheckScheduleTask">reset</el-button>
                                </el-col>
                            </el-row>
                            </el-card>
                        </div>
                        <div >
                            <el-row>
                                <el-table
                                        :data="tableData4"
                                        style="width: 100%;background-color: blanchedalmond" v-loading="loadingScheduleTask">
                                    <template slot-scope="scope">
                                    <el-table-column
                                            prop="taskPath"
                                            label="taskPath"
                                            width="220">
                                    </el-table-column>
                                    <el-table-column
                                            prop="taskType"
                                            label="taskType"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="executeTime"
                                            label="ExecuteTime"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="startTime"
                                            label="StartTime"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="expireTime"
                                            label="Expiretime"
                                            width="100">
                                    </el-table-column>
                                        <el-table-column
                                                prop="executeInterval"
                                                label="Interval(Day)"
                                                width="120">
                                        </el-table-column>
                                        <el-table-column
                                                prop="latestExecute"
                                                label="latest"
                                                width="100">
                                        </el-table-column>
                                    <el-table-column
                                            prop="operation"
                                            label="operation"
                                            width="170">
                                        <template slot-scope="scope">
                                            <!--not finish yet-->
                                            <el-row :gutter="70">
                                                <el-col :span="2">
                                                    <el-button size="mini" type="success" @click="dialogVisible3=true;tmpEditScheduleTask(scope.row.tid)">edit</el-button>
                                                </el-col>
                                                <el-col :span="2">
                                                    <el-button size="mini" type="danger"@click="deleteScheduleTask(scope.row.tid)">delete</el-button>
                                                </el-col>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                    </template>
                                </el-table>
                                    <el-pagination
                                            background
                                            :current-page="searchParams.currentPage"
                                            :page-sizes="[5, 10]"
                                            :page-size="5"
                                            layout="total, sizes,prev, pager, next, jumper"
                                            @current-change="currentPageChange"
                                            @size-change="handleSizeChange"
                                            :total="total">
                                    </el-pagination>
                            </el-row>
                            <br/>

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

        <el-dialog
                title="edit Schedule Task"
                :visible.sync="dialogVisible3"
                width="50%"
                :before-close="handleClose3">
            <el-card style="background-color: #eaffe2;">
                <div>
                    <el-form ref="form" label-width="20%">
                        <el-form-item label="choose execute period">
                    <el-date-picker
                            v-model="editStartAndExpireTime"
                            type="datetimerange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date">
                    </el-date-picker>
                        </el-form-item>
                        <el-form-item label="choose execute time">
                    <el-time-picker
                            v-model="editExecuteTime"
                            :picker-options="{
                             selectableRange: '00:00:00 - 23:59:59'
                                }"
                            placeholder="Arbitrary time">
                    </el-time-picker>
                        </el-form-item>
                        <el-form-item label="edit taskPath">
                            <el-input v-model="editPath" style="width: 20%" ></el-input>
                        </el-form-item>
                        <el-form-item label="choose execute Interval">
                            <el-input-number v-model="editInterval" @change="handleChangeInterval" :min="1" :max="10"></el-input-number>
                        </el-form-item>
                    </el-form>
                </div>
                <div align="right">
                    <el-button @click="dialogVisible3=false;editScheduleTask()" align="right" type="success">sumit</el-button>
                    <el-button @click="dialogVisible3=false" type="danger">cancel</el-button>
                </div>
            </el-card>
        </el-dialog>
    </el-container>
</template>

<script>
    import show from './index'

    export default show;
</script>

<style   scoped>
.edit_dev >>> .el-transfer-panel{
    width: 350px;
}
</style>