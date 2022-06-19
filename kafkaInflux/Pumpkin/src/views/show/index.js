import {deleteScheduleTaskByID,editScheduleTaskByID,searchAllActivedScheduleTaskByQuery,addScheduleTask,startPittCsvToInfluxDBProducerProgress,getPittCsvToInfluxDBConsumerProgress,setPittCsvToInfluxDBConsumer,stopPittCsvToInfluxDBConsumer,startPittCsvToInfluxDBConsumer,getPittCsvToInfluxDBConsumerStatus,getPittCsvToInfluxDBProducerStatus,startPittCsvToInfluxDBProducer,stopPittCsvToInfluxDBProducer,startLaCsvToInfluxDBProducer,stopLaCsvToInfluxDBProducer} from '@/api/show'
let show = {
    data() {
        const generateData = _ => {
            const data = [];
            const cities = ['La:csvToInfluxDBProducer', 'La:InfluxDBToCsvProducer', 'pittsburgh:InfluxDBToCsvProducer', 'pittsburgh:csvToInfluxDBProducer'];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                });
            });
            return data;
        };
        return {
            data: generateData(),
            value5: [],
            renderFunc(h, option) {
                return <span>{ option.key } - { option.label }</span>;
            },
            drawer: false,
            direction: 'rtl',
            value: [],
            status: true,
            value3: [],
            value4: [],
            value6: [],
            value7: [],
            value8: [],
            value9: [],
            loading: true,
            loadingScheduleTask: true,
            editStartAndExpireTime: [],
            editExecuteTime: '',
            editInterval:'',
            editPath:'',
            tmpTaskType:[],
            DirVo: {
                dir: '',
            },
            ScheduleTaskVo: {
                dir: '',
                executeInterval: '',
            },
            deleteScheduleTaskVo: {
                tid: '',
            },
            searchParams: {
                currentPage: 1,
                pageSize: 5,
                expireTime: '',
                startTime:'',
                taskType:'',
            },
            editScheduleTaskParams: {
                expireTime: '',
                startTime:'',
                tid:'',
                executeTime:'',
                executeInterval:'',
                taskPath:'',
            },
            tmpTid:'',
            total:0,
            scheduleTask:{
                startTime:'',
                expireTime:'',
                taskType:'',
                taskPath:'',
                executeTime:'',
                executeInterval: '',
                editPath:'',
            },
            progress: false,
            timer: null,
            options:[{
                    value:'pittsburgh',
                    label:'pittsburgh',
                    children: [{
                        value:'csvToInfluxDBProducer',
                        label:'csvToInfluxDBProducer'
                    },{
                        value:'InfluxDBToCsvProducer',
                        label:'InfluxDBToCsvProducer'
                    }],
                },{
                    value:'la',
                    label:'la',
                    children: [{
                        value:'csvToInfluxDBProducer',
                        label:'csvToInfluxDBProducer'
                    },{
                        value:'InfluxDBToCsvProducer',
                        label:'InfluxDBToCsvProducer'
                    }],
            }],
            options2:[{
                value:'pittsburgh',
                label:'pittsburgh',
                children: [{
                    value:'csvToInfluxDBConsumer',
                    label:'csvToInfluxDBConsumer',
                },{
                    value:'InfluxDBToCsvConsumer',
                    label:'InfluxDBToCsvConsumer'
                }],
            },{
                value:'la',
                label:'la',
                children: [{
                    value:'csvToInfluxDBConsumer',
                    label:'csvToInfluxDBConsumer'
                },{
                    value:'InfluxDBToCsvConsumer',
                    label:'InfluxDBToCsvConsumer'
                }],
            }],
            options3:[{
                value:'pittsburgh',
                label:'pittsburgh',
                children: [{
                    value:'producer',
                    label:'producer',
                    children: [{
                        value: 'csvToInfluxDBProducer',
                        label: 'csvToInfluxDBProducer',
                    },{
                        value: 'InfluxDBToCsvProducer',
                        label: 'InfluxDBToCsvProducer',
                    }]
                },{
                    value:'consumer',
                    label:'consumer',
                    children: [{
                        value: 'csvToInfluxDBConsumer',
                        label: 'csvToInfluxDBConsumer',
                    },{
                        value: 'InfluxDBToCsvConsumer',
                        label: 'InfluxDBToCsvConsumer',
                    }]
                }],
            },{
                value:'la',
                label:'la',
                children: [{
                    value:'producer2',
                    label:'producer',
                    children: [{
                        value: 'csvToInfluxDBProducer2',
                        label: 'csvToInfluxDBProducer',
                    },{
                        value: 'InfluxDBToCsvProducer2',
                        label: 'InfluxDBToCsvProducer',
                    }]
                },{
                    value:'consumer2',
                    label:'consumer',
                    children: [{
                        value: 'csvToInfluxDBConsumer2',
                        label: 'csvToInfluxDBConsumer',
                    },{
                        value: 'InfluxDBToCsvConsumer2',
                        label: 'InfluxDBToCsvConsumer',
                    }]
                }],
            }],
            options4: [{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }, {
                value: '3',
                label: '3'
            }, {
                value: '4',
                label: '4'
            }],
            options5: [{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }, {
                value: '3',
                label: '3'
            }, {
                value: '4',
                label: '4'
            }],
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,

            isShow: false,
            isShow2: false,
            isShow3: false,
            isShowFresher: false,
            isShowExport: true,
            isShowServer: true,
            isShowServer2: false,
            isShowServer3: false,
            autoDate: '',
            inputTimerTask:'',
            tableData: [{
                address: '',
                type: '',
                status: ''
            }],
            tableData2: [{
                address: '',
                type: '',
                threads: '',
                sleepTime: '',
                status: ''
            }],
            tableData3: [{
                source: '',
                destination: '',
                sourceType:'',
                destinationType:'',
            }],
            tableData4: [],
            serverDataTmp: [],
            serverData: [{
                server:'csvToInfluxDB',
                type:'producer',
                location:'pittsburgh',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: false,
            },{
                server:'csvToInfluxDB',
                type:'producer',
                location:'la',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: false,
            },{
                server:'InfluxDBToCsv',
                type:'producer',
                location:'pittsburgh',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: false,
            },{
                server:'InfluxDBToCsv',
                type:'producer',
                location:'la',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: false,
            },{
                server:'csvToInfluxDB',
                type:'consumer',
                location:'pittsburgh',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: true,
            },{
                server:'csvToInfluxDB',
                type:'consumer',
                location:'la',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: true,
            },{
                server:'InfluxDBToCsv',
                type:'consumer',
                location:'pittsburgh',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: true,
            },{
                server:'InfluxDBToCsv',
                type:'consumer',
                location:'la',
                thread:'',
                sleepTime:'',
                status:'wait...',
                isShowServer3: true,
            }],
            form: {
                threads: '',
                service: '',
                status: '',
                sleepTime: '',
            },
            percentage: 0,
            colors: [
                {color: '#f56c6c', percentage: 10},
                {color: '#f56c6c', percentage: 20},
                {color: '#e6a23c', percentage: 40},
                {color: '#5cb87a', percentage: 60},
                {color: '#1989fa', percentage: 80},
                {color: '#6f7ad3', percentage: 100}
            ],
            processResultTmp:{
              success:'',
              failure:'',
              total:'',
              totalTime:'',
              process:'',
            },
            processResult:{
                success:'',
                failure:'',
                total:'',
                totalTime:'',
                process:'',
            },
            serviceName: [{
                value: 'server',
                label: 'server',
                children:[{
                    value: 'producer',
                    label: 'producer',
                }, {
                    value: 'consumer',
                    label: 'consumer'
                }]
            }, {
                value: 'location',
                label: 'location',
                children:[{
                    value: 'pittsburgh',
                    label: 'pittsburgh'
                },{
                    value: 'la',
                    label: 'la'
                }]
            }, {
                value: 'status',
                label: 'status',
                children:[{
                    value: 'running',
                    label: 'running'
                },{
                    value: 'stop',
                    label: 'stop'
                }]
            }],
            service: '',
            // tmpServer:{
            //     server:'',
            //     type:'',
            //     location:'',
            //     thread:'',
            //     sleepTime:'',
            //     status:'',
            // }
    };
    },
    methods:{
        async handleChange1(value) {
            this.tableData[0].address=value[0];
            this.tableData[0].type=value[1];
            this.tableData[0].status="wait...";
            // pitt producer csvToInfluxDBProducer
            var tmp=false;
            if(this.tableData[0].address=="pittsburgh"&&this.tableData[0].type=="csvToInfluxDBProducer"){
                try {
                    await  getPittCsvToInfluxDBProducerStatus().then(response => {
                        console.log(response);
                        tmp=response;
                    });
                }catch (e) {

                }finally {
                    if(tmp==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
            // pitt producer InfluxDBToCsvProducer
            var tmp2=false;
            if(this.tableData[0].address=="pittsburgh"&&this.tableData[0].type=="InfluxDBToCsvProducer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp2=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp2==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
            // la producer csvToInfluxDBProducer
            var tmp3=false;
            if(this.tableData[0].address=="la"&&this.tableData[0].type=="csvToInfluxDBProducer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp3=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp3==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
            // pitt producer InfluxDBToCsvProducer
            var tmp4=false;
            if(this.tableData[0].address=="la"&&this.tableData[0].type=="InfluxDBToCsvProducer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp4=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp4==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
        },

        //consumer search
        async  handleChange2(value) {
            console.log(value);
            this.tableData2[0].address=value[0];
            this.tableData2[0].type=value[1];
            this.tableData2[0].status="wait...";
            // pitt Consumer csvToInfluxDBConsumer
            var tmp=false;
            if(this.tableData2[0].address=="pittsburgh"&&this.tableData2[0].type=="csvToInfluxDBConsumer"){
                try {
                    await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                        console.log(response);
                        this.tableData2=response;
                        this.tableData2[0].address=value[0];
                        this.tableData2[0].type=value[1];
                        this.tableData2[0].status="running";
                    });
                }catch (e) {
                    this.tableData2[0].status="stop";
                }
            }
            // pitt Consumer InfluxDBToCsvConsumer
            var tmp2=false;
            if(this.tableData2[0].address=="pittsburgh"&&this.tableData2[0].type=="InfluxDBToCsvConsumer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp2=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp2==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
            // la Consumer csvToInfluxDBConsumer
            var tmp3=false;
            if(this.tableData2[0].address=="la"&&this.tableData2[0].type=="csvToInfluxDBConsumer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp3=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp3==true){
                        this.tableData[0].status="running"
                    }else {
                        this.tableData[0].status="stop"
                    }
                }
            }
            // la Consumer InfluxDBToCsvConsumer
            var tmp4=false;
            if(this.tableData2[0].address=="la"&&this.tableData2[0].type=="InfluxDBToCsvConsumer"){
                try {
                    // await  getStatus().then(response => {
                    //     console.log(response);
                    //     tmp4=response;
                    // });
                }catch (e) {

                }finally {
                    if(tmp4==true){
                        this.tableData2[0].status="running"
                    }else {
                        this.tableData2[0].status="stop"
                    }
                }
            }
        },

        // server manager
        handleChange3(value) {

            if (value[1]==="consumer"||value[1]==="consumer2") {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        handleClose(done) {
            this.$confirm('Do you want to close it？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleClose2(done) {
            this.$confirm('Do you want to close it？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleClose3(done) {
            this.$confirm('Do you want to close it？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        async onSubmit() {

            console.log(this.form.service[0]);
            console.log(this.form.service[2]);
            console.log(this.form.sleepTime);
            console.log(this.form.threads);
            this.form.status=this.status;
            console.log(this.form.status+"status");
            // pitt csvToInfluxDBProducer
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="csvToInfluxDBProducer"&&this.form.status==true){
                await  startPittCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="csvToInfluxDBProducer"&&this.form.status==false){
                await  stopPittCsvToInfluxDBProducer();
            }

            // pitt InfluxDBToCsvProducer
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="InfluxDBToCsvProducer"&&this.form.status==true){
                // await  startPittCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="InfluxDBToCsvProducer"&&this.form.status==false){
                // await  stopPittCsvToInfluxDBProducer();
            }

            // pitt csvToInfluxDBConsumer
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="csvToInfluxDBConsumer"&&this.form.status==true){
                var tmpRes=false;
                try {
                   await startPittCsvToInfluxDBConsumer().then(response => {
                       console.log(response)
                       tmpRes=response;
                       console.log(tmpRes+"tmpRes")
                   });
                }catch (e) {

                }
                if(tmpRes==true){
                   await setTimeout(() => setPittCsvToInfluxDBConsumer(this.form), 15000)
                }

            }
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="csvToInfluxDBConsumer"&&this.form.status==false){
                await  stopPittCsvToInfluxDBConsumer();
            }

            // pitt csvToInfluxDBConsumer
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="InfluxDBToCsvConsumer"&&this.form.status==true){
                // try {
                //     await  startPittCsvToInfluxDBConsumer();
                // }catch (e) {
                //
                // }finally {
                //     await setPittCsvToInfluxDBConsumer(this.form);
                // }
            }
            if(this.form.service[0]=="pittsburgh"&&this.form.service[2]=="InfluxDBToCsvConsumer"&&this.form.status==false){
                // await  stopPittCsvToInfluxDBConsumer();
            }

            // la csvToInfluxDBProducer
            if(this.form.service[0]=="la"&&this.form.service[2]=="csvToInfluxDBProducer2"&&this.form.status==true){
                await  startLaCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="la"&&this.form.service[2]=="csvToInfluxDBProducer2"&&this.form.status==false){
                await  stopLaCsvToInfluxDBProducer();
            }
            // la InfluxDBToCsvProducer
            if(this.form.service[0]=="la"&&this.form.service[2]=="InfluxDBToCsvProducer2"&&this.form.status==true){
                // await  startPittCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="la"&&this.form.service[2]=="InfluxDBToCsvProducer2"&&this.form.status==false){
                // await  stopPittCsvToInfluxDBProducer();
            }

            // la csvToInfluxDBConsumer
            if(this.form.service[0]=="la"&&this.form.service[2]=="csvToInfluxDBConsumer2"&&this.form.status==true){
                // await  startPittCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="la"&&this.form.service[2]=="csvToInfluxDBConsumer2"&&this.form.status==false){
                // await  stopPittCsvToInfluxDBProducer();
            }

            // la InfluxDBToCsvConsumer
            if(this.form.service[0]=="la"&&this.form.service[2]=="InfluxDBToCsvConsumer2"&&this.form.status==true){
                // await  startPittCsvToInfluxDBProducer();
            }
            if(this.form.service[0]=="la"&&this.form.service[2]=="InfluxDBToCsvConsumer2"&&this.form.status==false){
                // await  stopPittCsvToInfluxDBProducer();
            }
        },
        increase() {
            this.percentage += 10;
            if (this.percentage > 100) {
                this.percentage = 100;
            }
        },
        decrease() {
            this.percentage -= 10;
            if (this.percentage < 0) {
                this.percentage = 0;
            }
        },
        async startProgress(){
            console.log(this.DirVo.dir);
           await startPittCsvToInfluxDBProducerProgress(this.DirVo).then(response => {
           });
        },
        async startProgress2(){
            console.log(this.DirVo.dir);
            await startPittCsvToInfluxDBProducerProgress(this.DirVo).then(response => {
            });
        },
        async changeColor(){
                console.log(this.value7);
                if(this.value7==1){
                    this.tableData3[0].source='pittsburgh';
                    this.tableData3[0].destination='pittsburgh';
                    this.tableData3[0].sourceType='csvToInfluxDBProducer';
                    this.tableData3[0].destinationType='csvToInfluxDBConsumer';
                }
                this.startProgress();
            if(this.percentage < 99) {
                await setTimeout(() =>this.percentage += 8, 1000);
                await setTimeout(() => this.percentage += 12, 2000);
                await setTimeout(() => this.percentage += 7, 3000);
                await setTimeout(() => this.percentage += 15, 4000);
                await setTimeout(() => this.percentage += 12, 5000);
                await setTimeout(() => this.percentage += 8, 6000);
                await setTimeout(() => this.percentage += 7, 7000);
                await setTimeout(() => this.percentage += 11, 8000);
                await setTimeout(() => this.percentage += 9, 9000);
                await setTimeout(() => this.percentage += 10, 10000);
            }
            this.checkProgress();
            if (this.percentage > 100) {
                this.percentage = 100;
            }
        },
        async scheduleTaskStart(){
         console.log(this.value9+" value9");
         console.log(this.value8+" value8");
            this.scheduleTask.startTime=this.value9[0];
            this.scheduleTask.expireTime=this.value9[1];
            this.scheduleTask.taskType=this.value8[0];
            this.scheduleTask.taskPath=this.ScheduleTaskVo.dir;
            this.scheduleTask.executeInterval=this.ScheduleTaskVo.executeInterval;
            let tmpExecuteTime=new Date(this.autoDate).toJSON();
            tmpExecuteTime=new Date(new Date(tmpExecuteTime)-4*3600*1000);
            console.log(this.autoDate+" autoDate");
            this.scheduleTask.executeTime=tmpExecuteTime;
            await addScheduleTask(this.scheduleTask).then(response => {
            });
            this.clearScheduleTask();
        },
        clear(){
            setTimeout(() =>this.percentage =0, 1000);
            this.percentage = 0;
            this.tableData3 =[{
                source: '',
                destination: '',
                sourceType:'',
                destinationType:'',
            }];
            this.value7='';
            this.DirVo.dir='';
            window.clearInterval(this.timer)
        },
        clearScheduleTask(){
            this.percentage = 0;
            this.tableData3 =[{
                source: '',
                destination: '',
                sourceType:'',
                destinationType:'',
            }];
            this.value8='';
            this.ScheduleTaskVo.dir='';
            this.autoDate='';
            this.ScheduleTaskVo.executeInterval=1;
            this.value9='';
        },
        checkProgress(){
                this.timer=window.setInterval(() => {
                    setTimeout(this.sendCheckProgress(), 0)
                }, 10000);
        },
        checkProgress2(){
            this.timer=window.setInterval(() => {
                setTimeout(this.sendCheckProgress(), 0)
            }, 10000);
        },
        sendCheckProgress(){
            if(this.processResultTmp.process==true){
                this.percentage+=1;
                window.clearInterval(this.timer);
                this.processResult=this.processResultTmp;
            }
            getPittCsvToInfluxDBConsumerProgress().then(response => {
                console.log(response);
                this.processResultTmp.process=response.process;
                this.processResultTmp.success=response.success;
                this.processResultTmp.failure=response.failure;
                this.processResultTmp.total=response.total;
                this.processResultTmp.totalTime=response.totalTime;
                // console.log(this.processResultTmp);
            })
        },
        sendCheckProgress2(){
            if(this.processResultTmp.process==true){
                this.percentage+=1;
                window.clearInterval(this.timer);
                this.processResult=this.processResultTmp;
            }
            getPittCsvToInfluxDBConsumerProgress().then(response => {
                console.log(response);
                this.processResultTmp.process=response.process;
                this.processResultTmp.success=response.success;
                this.processResultTmp.failure=response.failure;
                this.processResultTmp.total=response.total;
                this.processResultTmp.totalTime=response.totalTime;
                // console.log(this.processResultTmp);
            })
        },
        handleClick() {
            alert('button click');
        },
        chooseMethods(command){
            if(command=="a"){
                this.isShow2=true;
                this.isShow3=false;
            };
            if(command=="b"){
                this.isShow2=false;
                this.isShow3=true;
            }
        },
        handleChange4(value, direction, movedKeys) {
            console.log(value, direction, movedKeys+" 888");
        },
        multipleShowValue(val){
            console.log("val "+val);
            console.log("value5 "+this.value5);
        },
        handleClose5(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        chooseSystem(command) {
            if(command=="a"){
                this.isShowFresher=true;
                this.isShowExport=false;
            };
            if(command=="b"){
                this.isShowFresher=false;
                this.isShowExport=true;
            }
        },
        async handleChangeService(value) {
            // console.log(value[1]);
            if(value[1]=="producer"){
                this.loading=true;
                this.isShowServer=true;
                this.isShowServer2=false;
                let serverDataTmp1=JSON.parse(JSON.stringify(this.serverData));
                serverDataTmp1.splice(4,4);
                // pitt producer csvToProducer number:1  producer -serverData index: 1 2 3 4
                // 1.producer csvToInfluxDB pitt
                try {
                    await  getPittCsvToInfluxDBProducerStatus().then(response => {
                        serverDataTmp1[0]=response;
                    });
                }catch (e) {
                    serverDataTmp1[0].status="stop";
                };
                // 2.producer csvToInfluxDB la
                try {
                    // await  getPittCsvToInfluxDBProducerStatus().then(response => {
                    //     serverDataTmp1[1]=response;
                    // });
                    serverDataTmp1[1].status="stop";
                }catch (e) {
                    serverDataTmp1[1].status="stop";
                };
                // 3.producer InfluxDBToCsv pitt
                try {
                    // await  getPittCsvToInfluxDBProducerStatus().then(response => {
                    //     serverDataTmp1[0]=response;
                    // });
                    serverDataTmp1[2].status="stop";
                }catch (e) {
                    serverDataTmp1[2].status="stop";
                };
                // 4.producer InfluxDBToCsv la
                try {
                    // await  getPittCsvToInfluxDBProducerStatus().then(response => {
                    //     serverDataTmp1[3]=response;
                    // });
                    serverDataTmp1[3].status="stop";
                }catch (e) {
                    serverDataTmp1[3].status="stop";
                }
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp1));
                this.loading=false;
            };
            if(value[1]=="consumer"){
                this.isShowServer=true;
                this.isShowServer2=true;
                this.loading=true;
                let serverDataTmp2=JSON.parse(JSON.stringify(this.serverData));
                serverDataTmp2.splice(0,4);

                // pitt consumer csvToProducer number:5  consumer -serverData index: 4 5 6 7
                // consumer pitt csvToInfluxDB
                try {
                    await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                        serverDataTmp2[0]=response;
                    });
                }catch (e) {
                    serverDataTmp2[0].status="stop";
                };
                // consumer la csvToInfluxDB
                try {
                    serverDataTmp2[1].status="stop";
                }catch (e) {
                    serverDataTmp2[1].status="stop";
                };
                // consumer pitt InfluxDBToCsv
                try {
                    serverDataTmp2[2].status="stop";
                }catch (e) {
                    serverDataTmp2[2].status="stop";
                };
                // consumer la InfluxDBToCsv
                try {
                    serverDataTmp2[3].status="stop";
                }catch (e) {
                    serverDataTmp2[3].status="stop";
                }
                serverDataTmp2.forEach(function(item,index){
                    item.isShowServer3=true;
                });
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp2));
                this.loading=false;
            };
            if(value[1]=="pittsburgh"){
                this.loading=true;
                this.isShowServer=true;
                this.isShowServer2=true;
                let serverDataTmp3=JSON.parse(JSON.stringify(this.serverData));
                serverDataTmp3.splice(1,1);
                serverDataTmp3.splice(2,1);
                serverDataTmp3.splice(3,1);
                serverDataTmp3.splice(4,1);
                try {
                    await  getPittCsvToInfluxDBProducerStatus().then(response => {
                        serverDataTmp3[0]=response;
                    });
                }catch (e) {
                    serverDataTmp3[0].status="stop";
                };
                try {
                    serverDataTmp3[1].status="stop";
                }catch (e) {
                    serverDataTmp3[1].status="stop";
                };
                try {
                    await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                        serverDataTmp3[2]=response;
                        serverDataTmp3[2].isShowServer3=true;
                    });
                }catch (e) {
                    serverDataTmp3[2].status="stop";
                    serverDataTmp3[2].isShowServer3=true;
                };
                try {
                    serverDataTmp3[3].status="stop";
                    serverDataTmp3[3].isShowServer3=true;
                }catch (e) {
                    serverDataTmp3[3].status="stop";
                    serverDataTmp3[3].isShowServer3=true;
                };
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp3));
                this.loading=false;
            };
            if(value[1]=="la"){
                this.loading=true;
                this.isShowServer=true;
                this.isShowServer2=true;
                let serverDataTmp4=JSON.parse(JSON.stringify(this.serverData));
                serverDataTmp4.splice(0,1);
                serverDataTmp4.splice(1,1);
                serverDataTmp4.splice(2,1);
                serverDataTmp4.splice(3,1);
                try {
                    serverDataTmp4[0].status="stop";
                }catch (e) {
                    serverDataTmp4[0].status="stop";
                };
                try {
                    serverDataTmp4[1].status="stop";
                }catch (e) {
                    serverDataTmp4[1].status="stop";
                };
                try {
                    serverDataTmp4[2].status="stop";
                    serverDataTmp4[2].isShowServer3=true;
                }catch (e) {
                    serverDataTmp4[2].status="stop";
                    serverDataTmp4[2].isShowServer3=true;
                };
                try {
                    serverDataTmp4[3].status="stop";
                    serverDataTmp4[3].isShowServer3=true;
                }catch (e) {
                    serverDataTmp4[3].status="stop";
                    serverDataTmp4[3].isShowServer3=true;
                };
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp4));
                this.loading=false;
            };
            if(value[1]=="running"){
                this.loading=true;
                this.isShowServer=true;
                this.isShowServer2=true;
                let serverDataTmp6=JSON.parse(JSON.stringify(this.serverData));
                try {
                    await  getPittCsvToInfluxDBProducerStatus().then(response => {
                        serverDataTmp6[0]=response;
                    });
                }catch (e) {
                    serverDataTmp6[0].status="stop";
                };
                try {
                    serverDataTmp6[1].status="stop";
                }catch (e) {
                    serverDataTmp6[1].status="stop";
                };
                try {
                    serverDataTmp6[2].status="stop";
                }catch (e) {
                    serverDataTmp6[2].status="stop";
                };
                try {
                    serverDataTmp6[3].status="stop";
                }catch (e) {
                    serverDataTmp6[3].status="stop";
                };
                try {
                    await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                        serverDataTmp6[4]=response;
                    });
                }catch (e) {
                    serverDataTmp6[4].status="stop";
                };
                try {
                    serverDataTmp6[5].status="stop";
                }catch (e) {
                    serverDataTmp6[5].status="stop";
                };
                try {
                    serverDataTmp6[6].status="stop";
                }catch (e) {
                    serverDataTmp6[6].status="stop";
                };
                try {
                    serverDataTmp6[7].status="stop";

                }catch (e) {
                    serverDataTmp6[7].status="stop";
                };
                const serverDataTmp7=serverDataTmp6.filter(item => item.status=="running");
                serverDataTmp7.forEach(function(item,index){
                    if(item.type=="consumer"){
                        item.isShowServer3=true;
                    }
                });
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp7));
                this.loading=false;
            };
            if(value[1]=="stop"){
                this.loading=true;
                this.isShowServer=true;
                this.isShowServer2=true;
                let serverDataTmp8=JSON.parse(JSON.stringify(this.serverData));
                try {
                    await  getPittCsvToInfluxDBProducerStatus().then(response => {
                        serverDataTmp8[0]=response;
                    });
                }catch (e) {
                    serverDataTmp8[0].status="stop";
                };
                try {
                    serverDataTmp8[1].status="stop";
                }catch (e) {
                    serverDataTmp8[1].status="stop";
                };
                try {
                    serverDataTmp8[2].status="stop";
                }catch (e) {
                    serverDataTmp8[2].status="stop";
                };
                try {
                    serverDataTmp8[3].status="stop";
                }catch (e) {
                    serverDataTmp8[3].status="stop";
                };
                try {
                    await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                        serverDataTmp8[4]=response;
                    });
                }catch (e) {
                    serverDataTmp8[4].status="stop";
                };
                try {
                    serverDataTmp8[5].status="stop";
                }catch (e) {
                    serverDataTmp8[5].status="stop";
                };
                try {
                    serverDataTmp8[6].status="stop";
                }catch (e) {
                    serverDataTmp8[6].status="stop";
                };
                try {
                    serverDataTmp8[7].status="stop";

                }catch (e) {
                    serverDataTmp8[7].status="stop";
                };
                const serverDataTmp9=serverDataTmp8.filter(item => item.status=="stop");
                serverDataTmp9.forEach(function(item,index){
                    if(item.type=="consumer"){
                        item.isShowServer3=true;
                    }
                });
                this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp9));
                this.loading=false;
            }
        },
        async showInit(){
            this.isShowServer=true;
            this.isShowServer2=true;
            let serverDataTmp5=JSON.parse(JSON.stringify(this.serverData));
            try {
                await  getPittCsvToInfluxDBProducerStatus().then(response => {
                    serverDataTmp5[0]=response;
                });
            }catch (e) {
                serverDataTmp5[0].status="stop";
            };
            try {
                serverDataTmp5[1].status="stop";
            }catch (e) {
                serverDataTmp5[1].status="stop";
            };
            try {
                serverDataTmp5[2].status="stop";
            }catch (e) {
                serverDataTmp5[2].status="stop";
            };
            try {
                serverDataTmp5[3].status="stop";
            }catch (e) {
                serverDataTmp5[3].status="stop";
            };
            try {
                await  getPittCsvToInfluxDBConsumerStatus().then(response => {
                    serverDataTmp5[4]=response;
                    serverDataTmp5[4].isShowServer3=true;
                });
            }catch (e) {
                serverDataTmp5[4].status="stop";
                serverDataTmp5[4].isShowServer3=true;
            };
            try {
                serverDataTmp5[5].status="stop";
                serverDataTmp5[5].isShowServer3=true;
            }catch (e) {
                serverDataTmp5[5].status="stop";
                serverDataTmp5[5].isShowServer3=true;
            };
            try {
                serverDataTmp5[6].status="stop"
                serverDataTmp5[6].isShowServer3=true;
            }catch (e) {
                serverDataTmp5[6].status="stop";
                serverDataTmp5[6].isShowServer3=true;
            };
            try {
                serverDataTmp5[7].status="stop";
                serverDataTmp5[7].isShowServer3=true;
            }catch (e) {
                serverDataTmp5[7].status="stop";
                serverDataTmp5[7].isShowServer3=true;
            };
            this.serverDataTmp=JSON.parse(JSON.stringify(serverDataTmp5));
            this.loading=false;
        },
        async currentPageChange(currentPage){
            //console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            await this.checkAllScheduleTask();
        },
        async checkAllScheduleTask(){
            this.loadingScheduleTask=true;
            console.log("value6 "+this.value6[0]);
            this.searchParams.startTime=this.value6[0];
            this.searchParams.expireTime=this.value6[1];
            this.searchParams.taskType=this.tmpTaskType[0];
            searchAllActivedScheduleTaskByQuery(this.searchParams).then(response => {
                this.total = response.total;
                this.tableData4 = response.data;
            });
            this.loadingScheduleTask=false;
        },
        handleSizeChange(val) {
            this.searchParams.pageSize=val;
            console.log(this.searchParams.pageSize);
        },
        clearCheckScheduleTask() {
            this.value6="";
            this.tmpTaskType="";
        },
        async editScheduleTask(){
            this.editScheduleTaskParams.tid=this.tmpTid;
            this.editScheduleTaskParams.expireTime=this.editStartAndExpireTime[1];
            this.editScheduleTaskParams.startTime=this.editStartAndExpireTime[0];
            let tmpExecuteTime=new Date(this.editExecuteTime).toJSON();
            tmpExecuteTime=new Date(new Date(tmpExecuteTime)-4*3600*1000);
            this.editScheduleTaskParams.executeTime=tmpExecuteTime;
            this.editScheduleTaskParams.taskPath=this.editPath;
            this.editScheduleTaskParams.executeInterval=this.editInterval;
            editScheduleTaskByID(this.editScheduleTaskParams).then(response => {
            });
        },
        async deleteScheduleTask(val){
            this.deleteScheduleTaskVo.tid=val;
            deleteScheduleTaskByID(this.deleteScheduleTaskVo).then(response => {
            });
            this.checkAllScheduleTask();
        },
        tmpEditScheduleTask(val){
            this.tmpTid=val;
        },
        handleChangeNumber(value) {
            console.log(value)
        },
        handleChangeInterval(value) {
            console.log(value)
        },

    },

    beforeDestroy(){
      window.clearInterval(this.timer)
    },
    created(){
        this.checkAllScheduleTask();
        this.showInit();
    }
};

export default show;