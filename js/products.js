import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 1初始化modal 
let productModal = '';
let delProductModal='';
createApp({
    data() {
        return {
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"yoyo123456",
            // 放全部商品的陣列
            products:[],
            // 單一商品的放置位置
            temproduct:{
                imagesUrl:[],
            },
            // 判斷是新建的產品或是已有的產品，用來判斷要乎要哪種api
            isNew: false,
        }
    },
    mounted() {
        // 2modal init 綁定(固定格式)
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });

        //取token確認 這段需再複習記不住
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        // 需要先呼叫checkin 開始判斷
        this.checkin();
    },
    methods: {
        checkin(){
            const api = `${this.apiUrl}/api/user/check`;
            axios.post(api).then(()=>{
                //跨區要加this
                //checkin成功 > show出所有產品
                this.showProducts();
            }).catch((err)=>{
                window.location='index.html';
            })
        },
        //取出商品資料放置在自訂的陣列中
        //要怎麼知道取出的位置?console.log(response);
        // console.log(this.products); > 裡面看
        showProducts(){
            const api = `${this.apiUrl}/api/${this.path}/admin/products/all`
            axios.get(api).then((response)=>{
                this.products = response.data.products;
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },
        
        //post >新建產品所用的api方法
        //put >更新商品所用的api方法
        //這裡使用let是因為api 跟 http 在這個地方會更改
        updateProduct(){
            let api = `${this.apiUrl}/api/${this.path}/admin/product`;
            let http ='post';

            // 如果是舊的商品之行這段
            if(!this.isNew){
                api = `${this.apiUrl}/api/${this.path}/admin/product/${this.temproduct.id}`;
                http = 'put';
            }

            //這裡的{data:}是資料裡規定
            axios[http](api,{data: this.temproduct}).then((response)=>{
                alert('%%%%%%更新成功花拉拉~~~你好棒');
                // 按下確認更新成功後要把Modal關掉
                productModal.hide();
                // 更新完後需要再渲染一次showproducts
                this.showProducts();
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },
        
        delProduct (){
            const api = `${this.apiUrl}/api/${this.path}/admin/product/${this.temproduct.id}`;

            axios.delete(api).then((reapose)=>{
                // 按下確認，要把Modal關掉
                delProductModal.hide();
                // 需要再渲染一次反正每次增刪改後都要再次渲染一次資料
                this.showProducts();
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },

        // 先判斷是哪一類型的資料更動
        // new > 要將temproduct再次初始化，不然會有上一個的資料內容 > isNew狀態改成true這會影響到api的選擇 >芝麻打開Modal開始新增產品
        // edit >將前台for迴圈的item帶入，並賦予值給temproduct > isNew狀態改成false
        // del >
        showModal(isNew, item){
            if(isNew === 'new'){
                this.temproduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            } else if(isNew === 'edit'){
                this.temproduct = {...item};
                this.isNew = false;
                productModal.show();
            } else if (isNew==='del'){
                //important要加這段才可以取得產品的id 才能知道要刪除哪一個
                // this.temproduct = {...item};
                delProductModal.show();
            }
        },
        creatImg(){
            this.temproduct.imagesUrl = [];
            this.temproduct.imagesUrl.push('');
        }
    },
}).mount("#app");