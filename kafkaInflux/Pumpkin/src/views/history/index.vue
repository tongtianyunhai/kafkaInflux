<template>
    <el-container>
        <el-main>
    <el-card style="background-color: wheat">
        <div slot="header">
            <el-row :gutter="2">
                <el-col :span="3">
                    <el-input placeholder="Please input topicName " v-model="topicName"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-select v-model="consumerAddress" placeholder="Select">
                        <el-option
                                v-for="item in consumerAddressOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-select v-model="producerAddress" placeholder="Select">
                        <el-option
                                v-for="item in producerAddressOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
            <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    :default-time="['12:00:00']"
                   >
            </el-date-picker>
                </el-col>
                <el-col :span="1">
                <el-button type="success" @click="searchHistory()">search</el-button>
                </el-col>
                <el-col :span="1">
                <el-button type="warning" @click="clearSearch()">reset</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%"  v-loading="historyLoading">
            <el-table-column
                    prop="topicName"
                    label="topicName"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="usedTime"
                    label="usedTime"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="success"
                    label="success"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="failure"
                    label="failure"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="amount"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="startTime"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="endTime"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="threadNumber"
                    label="threads"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="sleepTime"
                    label="sleepTime"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="producerAddress"
                    label="producerAddress"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="consumergroupNumber"
                    label="consumergroup"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="scheduleTask"
                    label="scheduleTask"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="scheduleTask"
                    label="checkscheduleTask"
                    width="150">
                <template slot-scope="scope">
                <el-button  type="success" @click="dialogVisible = true;checkAllScheduleTask(scope.row.scheduleTask)">check</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="eid"
                    label="checkStreamingFailure"
                    width="160">
                <template slot-scope="scope">
                    <el-button  type="primary" @click="dialogVisible2 = true;checkAllStreamingFailure(scope.row.eid)">check</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
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

        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="80%"
                :before-close="handleClose">
            <el-card style="background-color: #66b1ff">
                <div slot="header">
                    <span>check taskSchedule</span>
                </div>
                <el-table :data="scheduleTaskData" >
                    <el-table-column width="300" property="taskPath" label="taskPath"></el-table-column>
                    <el-table-column width="120" property="executeTime" label="executeTime"></el-table-column>
                    <el-table-column width="120" property="startTime" label="startTime"></el-table-column>
                    <el-table-column width="120" property="expireTime" label="expireTime"></el-table-column>
                    <el-table-column width="120" property="taskType" label="taskType"></el-table-column>
                    <el-table-column width="120" property="executeInterval" label="Interval(Day)"></el-table-column>
                    <el-table-column width="120" property="latestExecute" label="latestExecute"></el-table-column>
                </el-table>
            </el-card>
            <el-button  type="success" @click="dialogVisible = false;searchHistory()" align="right">close</el-button>
        </el-dialog>
        <el-dialog
                title=""
                :visible.sync="dialogVisible2"
                width="80%"
                :before-close="handleClose">
            <el-card style="background-color: #c4e1ff">
                <div slot="header">
                    <span>check streamingFailureDetail</span>
                </div>
                <el-table :data="streamingFailureData" >
                    <el-table-column width="300" property="fid" label="fid"></el-table-column>
                    <el-table-column width="300" property="endTime" label="endTime"></el-table-column>
                    <el-table-column width="300" property="totalData" label="totalData"></el-table-column>
                    <el-table-column width="300" property="detail" label="detail"></el-table-column>
                </el-table>
            </el-card>
            <el-button  type="success" @click="dialogVisible2 = false;searchHistory()" align="right">close</el-button>
        </el-dialog>
    </el-card>
        </el-main>
    </el-container>

</template>

<script>
    import history from './index'

    export default history;
</script>

<style   scoped>
.edit_dev >>> .el-transfer-panel{
    width: 350px;
}
</style>