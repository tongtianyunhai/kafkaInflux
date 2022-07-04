<template>
    <el-container  >
    <el-header align="center" style="line-height: 1.7;margin: 10px;background-color: white">
        <el-row>
            <el-col :span="22" align="right">
                <el-dropdown  trigger="click" @command="chooseSystem">
                    <el-button type="primary" >
                        Methods<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="b">view</el-dropdown-item>
                        <el-dropdown-item command="a">edit</el-dropdown-item>
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
        <el-main style="width: 80%;align-self: center">
            <el-row>
                <el-card style="background-color: blanchedalmond" v-if="isShowEdit">
                    <div  slot="header" align="left">
                        <span>edit taskType</span>
                    </div>
                    <div>
                        <el-row :gutter="10">
                            <el-select v-model="taskTypeId" placeholder="please select">
                                <el-option
                                        v-for="item in taskTypes"
                                        :key="item.tid"
                                        :label="item.taskType"
                                        :value="item.tid">
                                </el-option>
                            </el-select>
                        </el-row>
                        <el-row>
                            &nbsp;
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="5">
                                <el-input v-model="newTaskType" placeholder="Input taskName" ></el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="success" @click="addTaskType">
                                    add
                                </el-button>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="danger" @click="deleteTaskType">
                                    delete
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-row>
            <el-row>
                &nbsp;
            </el-row>
            <el-row>
                <el-card class="box-card" shadow="always" style="background-color: blanchedalmond">
                    <div  slot="header" align="left">
                        <!--<el-dropdown  trigger="click" @command="chooseMethods">-->
                        <!--<el-button type="primary" >-->
                            <!--Methods<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                        <!--</el-button>-->
                        <!--<el-dropdown-menu slot="dropdown" >-->
                            <!--<el-dropdown-item command="a">manually</el-dropdown-item>-->
                            <!--<el-dropdown-item command="b">timer</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->
                        <!--</el-dropdown>-->
                        <!--<br/>-->
                        <!--<br/>-->
                        <!--<el-card v-if="isShow2" style="background-color: beige">-->
                        <!--<el-row>-->
                        <!--</el-row>-->
                        <!--<el-row :gutter="10">-->
                            <!--<el-col :span="3">-->
                                <!--<el-select v-model="value7" placeholder="type"  v-if="isShow2" >-->
                                    <!--<el-option-->
                                            <!--v-for="item in taskTypes"-->
                                            <!--:key="item.tid"-->
                                            <!--:label="item.taskType"-->
                                            <!--:value="item.taskType">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-col>-->
                            <!--<el-col :span="8">-->
                                <!--<el-input v-model="DirVo.dir" placeholder="please Input directory path" v-if="isShow2"></el-input>-->
                            <!--</el-col>-->
                            <!--<el-col :span="1">-->
                                <!--<el-button type="primary" @click="changeColor" v-if="isShow2">start</el-button>-->
                            <!--</el-col>-->
                            <!--<el-col :span="1">-->
                                <!--<el-button type="warning" @click="clear" v-if="isShow2">reset</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--</el-card>-->
                        <el-row>
                            <el-card  style="background-color: beige">
                            <el-form ref="form" :model="form" label-width="10%"  >
                                <el-form-item label="chooseType">
                                        <el-select v-model="value8" placeholder="type"   style="width: 20%">
                                            <el-option
                                                    v-for="item in taskTypes"
                                                    :key="item.tid"
                                                    :label="item.taskType"
                                                    :value="item.taskType">
                                            </el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item label="input directory path">
                                        <el-input v-model="ScheduleTaskVo.dir" placeholder="Input directory path" style="width: 20%" ></el-input>
                                </el-form-item>
                                <el-form-item label="choose execute periode">
                                        <el-date-picker
                                                v-model="value9"
                                                type="daterange"
                                                range-separator="To"
                                                start-placeholder="Start date"
                                                end-placeholder="End date">
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
                                    <el-input-number v-model="ScheduleTaskVo.executeInterval" style="width: 20%"  @change="handleChangeNumber" :min="1" :max="10"></el-input-number>
                                </el-form-item>
                                <el-form-item label="">
                                        <el-button type="primary" @click="scheduleTaskStart"  >submit</el-button>
                                        <el-button type="warning" @click="clearScheduleTask"  >reset</el-button>
                                </el-form-item>
                            </el-form>
                            </el-card>
                        </el-row>
                    </div>
                    <!--<div >-->
                        <!--<el-row>-->
                    <!--<el-descriptions title="Progress details" :column="1" border >-->
                        <!--<el-descriptions-item label="source:" >{{tableData3[0].source+": "+tableData3[0].sourceType}}</el-descriptions-item>-->
                        <!--<el-descriptions-item label="destination:" >{{tableData3[0].destination+": "+tableData3[0].destinationType}}</el-descriptions-item>-->
                    <!--</el-descriptions>-->
                        <!--</el-row>-->
                        <!--<br/>-->
                    <!--<el-row>-->
                    <!--<el-col :span="5">-->
                        <!--<el-progress type="dashboard" :percentage="percentage" :color="colors"  ></el-progress>-->
                    <!--</el-col>-->
                    <!--<el-col :span="8">-->
                        <!--<el-descriptions   :column="2" border :size="mini" >-->
                            <!--<el-descriptions-item label="totalFiles:" >{{this.processResult.total}}</el-descriptions-item>-->
                            <!--<el-descriptions-item label="successFiles:">{{this.processResult.success}}</el-descriptions-item>-->
                            <!--<el-descriptions-item label="failureFiles:">{{this.processResult.failure}}</el-descriptions-item>-->
                            <!--<el-descriptions-item label="totalTime:">{{this.processResult.totalTime}}</el-descriptions-item>-->
                        <!--</el-descriptions>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--</div>-->
                </el-card>
                </el-row>
                <el-row>
                    &nbsp;
                </el-row>
                <el-row>
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
                            <el-row :gutter="30">
                                <el-col :span="3">
                                    <el-select v-model="tmpTaskType" placeholder="type" >
                                        <el-option
                                                v-for="item in taskTypes"
                                                :key="item.tid"
                                                :label="item.taskType"
                                                :value="item.taskType">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <el-date-picker
                                            v-model="value6"
                                            type="daterange"
                                            range-separator="To"
                                            start-placeholder="Start date"
                                            end-placeholder="End date"
                                            :clearable="false">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="1">
                                <el-button type="success" @click="checkAllScheduleTask">search</el-button>
                                </el-col>
                                <el-col :span="1">
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
            </el-row>
        </el-main>
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