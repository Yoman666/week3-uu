import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let productModal = '';
let delProductModal='';
createApp({
    data() {
        return {
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"yoyo123456",
            products:[],
            temproduct:{
                imagesUrl:[],
            },
            isNew: false,
        }
    },
    mounted() {
        //modal init 綁定
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });

        //取token確認 這段需再複習記不住
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkin();
    },
    methods: {
        checkin(){
            const api = `${this.apiUrl}/api/user/check`;
            axios.post(api).then(()=>{
                //跨區要加this
                this.showProducts();

            }).catch((err)=>{
                window.location='index.html';
            })
        },
        //取出商品資料放置在自訂的陣列中
        //要怎麼知道取出的位置?console.log(response);
        // console.log(this.products);

        showProducts(){
            const api = `${this.apiUrl}/api/${this.path}/admin/products/all`
            axios.get(api).then((response)=>{
                
                this.products = response.data.products;
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },
        
        updateProduct(){
            let api = `${this.apiUrl}/api/${this.path}/admin/product`;
            let http ='post';

            if(!this.isNew){
                api = `${this.apiUrl}/api/${this.path}/admin/product/${this.temproduct.id}`;
                http = 'put';
            }

            
            axios[http](api,{data: this.temproduct}).then((response)=>{
                alert('update sucess');
                productModal.hide();
                this.showProducts();
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },
        
        delProduct (){
            const api = `${this.apiUrl}/api/${this.path}/admin/product/${this.temproduct.id}`;

            axios.delete(api).then((reapose)=>{
                alert('delet success');
                delProductModal.hide();
                this.showProducts();
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        },

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
                this.temproduct = {...item};
                delProductModal.show();
            }
        },
        // showModal(isNew, item) {
        //     if (isNew === 'new') {
        //       this.temproduct = {
        //         imagesUrl: [],
        //       };
        //       this.isNew = true;
        //       productModal.show();
        //     } else if (isNew === 'edit') {
        //       this.temproduct = { ...item };
        //       this.isNew = false;
        //       productModal.show();
        //     } else if (isNew === 'delete') {
        //       this.temproduct = { ...item };
        //       delProduct.show()
        //     }
        //   },

        creatImg(){
            this.temproduct.imagesUrl = [];
            this.temproduct.imagesUrl.push('');
        }
    },
}).mount("#app");