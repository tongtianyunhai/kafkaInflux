<template>
    <el-container  >
    <el-header align="center" style="line-height: 1.7;margin: 10px;background-color: white">
        <el-row>
                <el-col :span="4" align="left">
                    <el-button type="text" @click="dialogVisible = true"><el-tag type="success" effect="dark">single server setting</el-tag></el-button>
                </el-col>
        <el-col :span="4" align="left">
            <el-button type="text" @click="dialogVisible2 = true"><el-tag type="success" effect="dark">multiple server setting</el-tag></el-button>
        </el-col>
            <el-col :span="16" align="right">
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
            <el-row>
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
            <el-row>
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
                        <el-row>
                            <el-col :span="3">
                                <el-select v-model="value7" placeholder="type"  v-if="isShow2">
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
                        <el-row>
                            <el-col :span="3">
                                <el-select v-model="value8" placeholder="type"  v-if="isShow3">
                                    <el-option
                                            v-for="item in options5"
                                            :key="item.value8"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="DirVo.dir" placeholder="please Input directory path" v-if="isShow3"></el-input>
                            </el-col>
                            <el-col :span="7">
                                <el-date-picker
                                        v-model="autoDate"
                                        type="datetime"
                                        placeholder="Select date and time" v-if="isShow3">
                                </el-date-picker>
                            </el-col>
                            <!--not finish yet-->
                            <el-col :span="3">
                                <el-button type="primary" @click="changeColor2" v-if="isShow3">start</el-button>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="warning" @click="clear2" v-if="isShow3">reset</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div >
                        <el-row>
                    <el-descriptions title="Progress details" :column="1" border label-style="background: wheat;word-break:keep-all" content-style="background: wheat;word-break: break-all">
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
                        <el-descriptions   :column="2" border :size="mini" label-style="background: #E1F3D8" content-style="background: #E1F3D8">
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

                <el-col :span="11">
                    <el-card class="box-card" shadow="always" style="background-color: blanchedalmond">
                        <div  slot="header" align="left">
                            <el-row >
                                <el-col :span="7">
                            <span>TimerTask</span>
                                </el-col>
                            </el-row>
                            <br/>
                            <el-row :gutter="20">
                                <el-col :span="6">
                            <el-input v-model="inputTimerTask" placeholder="please Input timeTask" style="width: 200px"></el-input>
                                </el-col>
                                <el-col :span="11">
                                    <el-date-picker
                                            v-model="value6"
                                            type="daterange"
                                            range-separator="To"
                                            start-placeholder="Start date"
                                            end-placeholder="End date">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="3">
                                <el-button type="success">search</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div >
                            <el-row>
                                <el-table
                                        :data="tableData4"
                                        style="width: 100%;background-color: blanchedalmond">
                                    <el-table-column
                                            prop="title"
                                            label="title"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="sort"
                                            label="type"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="startTime"
                                            label="startTime"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="deadline"
                                            label="expiretime">
                                    </el-table-column>
                                </el-table>
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
      <el-form ref="form" :model="form" label-width="80px" align="left">
                <p style="text-align: center; margin: 0 0 20px">please choose source and destination servers</p>
    <div style="text-align: center">
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
       <el-button class="transfer-footer" slot="left-footer" size="small" type="success">set as source service</el-button>

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
    import show from './index'

    export default show;
</script>

<style  src="./index.scss" lang="scss" scoped>

</style>