import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            user:{
                username: '',
                password: '',
            },
        };
    },
    methods:{
        login(){
            const api= `${this.apiUrl}/admin/signin`;
            axios.post(api,this.user).then((response)=>{
                //一直忘紀要取token、expired
                const{token,expired} = response.data;
                document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
                window.location='products.html'
            }).catch((arr=>{
                alert('err');
            }))
        }

    }

    
}).mount("#app");