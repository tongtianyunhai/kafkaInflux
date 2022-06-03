import {router} from '@/router/index'
import instance from "../../utils/request";
import {searchCustomer} from '@/api/main'

let main = {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            user:{
                uid:'',
                nickName:'',
                url:'img_2021_12_04173717446.jpg',
            },
            startRouter: true,//开启路由标识， ，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
            currentIndexLight: '',//当前激活菜单的 index  高亮显示
            arrIndex: [],

            //manager
            menuList:[
                {
                    path: '/show',
                    name: 'Main',
                    children:[],
                },
                // {
                //     path: 'aa',
                //     name: 'Manager',
                //     children:[
                //         {
                //             path: '/manager',
                //             name: 'ManagerInfo',
                //             children:[],
                //         },
                //     ],
                // },
                // {
                //     path: 'bb',
                //     name: 'Merchandise',
                //     children:[
                //         {
                //             path: '/mdetail',
                //             name: 'Mdetail',
                //             children:[],
                //         },
                //         {
                //             path: '/brand',
                //             name: 'Brand',
                //             children:[],
                //         },
                //     ],
                // },
                // {
                //     path: 'cc',
                //     name: 'Shopping',
                //     children:[
                //         {
                //             path: '/shoppingInfo',
                //             name: 'ShoppingInfo',
                //             children:[],
                //         },
                //         {
                //             path: '/merchandisePage',
                //             name: 'MerchandisePage',
                //             children:[],
                //         },
                //         {
                //             path: '/shoppingCart',
                //             name: 'ShoppingCart',
                //             children:[],
                //         },
                //     ],
                // },
                // {
                //     path: 'dd',
                //     name: 'Order',
                //     children:[
                //         {
                //             path: '/order',
                //             name: 'OrderInfo',
                //             children:[],
                //         },
                //     ],
                // },
                // {
                //     path: 'ee',
                //     name: 'Rank',
                //     children:[
                //         {
                //             path: '/rank',
                //             name: 'RankInfo',
                //             children:[],
                //         },
                //     ],
                // },
                {
                    path: 'ff',
                    name: 'SearchReddit',
                    children:[
                        {
                            path: '/searchReddit',
                            name: 'SearchReddit',
                            children:[],
                        },
                    ],
                },

            ],

            //customer
            menuList2:[
                {
                    path: '/show',
                    name: 'Main',
                    children:[],
                },


                {
                    path: 'cc',
                    name: 'Shopping',
                    children:[
                        {
                            path: '/shoppingInfo',
                            name: 'ShoppingInfo',
                            children:[],
                        },
                        {
                            path: '/shoppingCart',
                            name: 'ShoppingCart',
                            children:[],
                        },
                    ],
                },
                {
                    path: 'dd',
                    name: 'Order',
                    children:[
                        {
                            path: '/order',
                            name: 'OrderInfo',
                            children:[],
                        },
                    ],
                },
                {
                    path: 'ee',
                    name: 'SearchReddit',
                    children:[
                        {
                            path: '/searchReddit',
                            name: 'SearchReddit',
                            children:[],
                        },
                    ],
                },
            ],

            //judge
            menuList3:[],
        };
    },

    methods:{
        userShow(){
            searchCustomer(localStorage.getItem("uid")).then(response => {
                    this.tableData = response;
                    console.log("789"+this.tableData[0].url);
                    this.user.url=this.tableData[0].url;
                });
            //     this.tableData = response;
            //     this.user.url=this.tableData.url;
            //     console.log("avatar"+this.user.url);

            this.user.nickName=localStorage.getItem("nickName");
        },
        signout(){
            localStorage.clear();
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        selectMenu(key, keyPath) {
            this.currentIndexLight = key;
            console.log(key, keyPath)
        },
        showMenu(){
            console.log("user"+localStorage.getItem("user"))
            if(localStorage.getItem("user")==1){
                this.menuList3=this.menuList2;
            }
            if(localStorage.getItem("user")==0){
                this.menuList3=this.menuList;
            }
        },
    },
    created(){
        this.userShow();
        this. showMenu();
    }
};

export default main;