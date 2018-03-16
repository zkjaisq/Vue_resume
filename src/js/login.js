{
    Vue.component('login',{
        data(){
            return {
                login:{
                    email:'',
                    passwor:'',

                },
            }
        },
        methods:{
            onLogin(){
                console.log(this.login);
                AV.User.logIn(this.login.email, this.login.password).then( (user)=> {
                    alert('登录成功')
                    user = user.toJSON()
                    this.$emit('login',user)
                }, function (error) {
                    if(error.code === 211){
                        alert('用户不存在')
                    }else if(error.code === 210){
                        alert('密码错误')
                    }
                });
            },
            onclickSingup(){
                this.$emit('gotosingup')
            }
        },
        template:`
     <div class="login" v-cloak>
        <form  @submit.prevent="onLogin">
            <h2>登录</h2>
            <div class="row">
                <label>
                    <span>用户名</span>
                    <input type="text" placeholder="请输入用户名" v-model="login.email">
                </label>
            </div>
            <div class="row">
                <label>
                    <span>密码</span>
                    <input type="password" placeholder="请输入密码" v-model="login.password">
                </label>
            </div>
            <button type="submit">提交</button>
            <button @click.prevent="$emit('close')">关闭</button>
            <a href="" @click.prevent="loginVisible = false" @click="onclickSingup">注册</a>
        </form>
    </div>
    `,
    })
}