import {searchAllStreamingFailure,searchAllScheduleTaskByQuery,searchHistoryByQuery} from '@/api/history'
let history = {
    data() {
        return {

            date: [],
            tableData: [],
            consumerAddressOptions: [{
                value: 'pittsburgh',
                label: 'pittsburgh'
            }, {
                value: 'la',
                label: 'la'
            }],
            producerAddressOptions: [{
                value: 'pittsburgh',
                label: 'pittsburgh'
            }, {
                value: 'la',
                label: 'la'
            }],
            topicName:'',
            consumerAddress:'',
            producerAddress:'',
            dialogVisible: false,
            dialogVisible2: false,

            searchParams: {
                currentPage: 1,
                pageSize: 5,
                topicName: '',
                producerAddress:'',
                consumerAddress:'',
                startTime:'',
                endTime:'',
                historyLoading: false,
            },
            searchScheduleTaskParams: {
               tid:'',
            },
            searchStreamingFailure: {
                eid:'',
            },
            scheduleTaskData: [],
            streamingFailureData: [],

    };
    },

    methods:{
        handleSizeChange(val) {
            this.searchParams.pageSize=val;
            this.searchHistory();
        },

        async currentPageChange(currentPage){
            this.searchParams.currentPage = currentPage;
            await this.searchHistory();
        },
         searchHistory(){
            this.historyLoading=true;
            this.searchParams.startTime=this.date[0];
            this.searchParams.endTime=this.date[1];
            this.searchParams.topicName=this.topicName;
            this.searchParams.producerAddress=this.producerAddress;
            this.searchParams.consumerAddress=this.consumerAddress;
             searchHistoryByQuery(this.searchParams).then(response => {
                this.total = response.total;
                this.tableData = response.data;
            });
            this.historyLoading=false;
        },
        clearSearch(){
            this.date="";
            this.topicName="";
            this.producerAddress="";
            this.consumerAddress="";
        },
        async checkAllScheduleTask(val){
            this.searchScheduleTaskParams.tid=val;
            searchAllScheduleTaskByQuery(this.searchScheduleTaskParams).then(response => {
                this.total = response.total;
                this.scheduleTaskData = response.data;
            });
        },
        async checkAllStreamingFailure(val){
            this.searchStreamingFailure.eid=val;
            searchAllStreamingFailure(this.searchStreamingFailure).then(response => {
                this.total = response.total;
                this.streamingFailureData = response;
            });
        },
        handleClose(done) {
            this.$confirm('close？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    },

    beforeDestroy(){

    },
    created(){
        this.searchHistory();
    }
};

export default history;