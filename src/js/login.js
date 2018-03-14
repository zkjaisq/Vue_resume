Vue.component('longin',{
    template:`
     <div class="login"  v-cloak>
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
            <button @click.prevent="loginVisible = false">关闭</button>
            <a href="" @click.prevent="singupVisible=!singupVisible;loginVisible = false">注册</a>
        </form>
    </div>
    `
})