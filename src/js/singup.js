{
    Vue.component('singup',{
        template:`
            <div class="sing_up" v-cloak>
        <form @submit.prevent="onsingUp">
            <h2>注册</h2>
            <div class="row"></div>
            <div class="row">
                <label>
                    <span>用户名</span>
                    <input type="text" placeholder="请输入手机号或者邮箱" v-model="singUp.email">
                </label>
            </div>
            <div class="row">
                <label>
                    <span>密码</span>
                    <input type="password" placeholder="请输入密码" v-model="singUp.password">
                </label>
            </div>
            <div class="row">
                <label>
                    <span>确认密码</span>
                    <input type="password" placeholder="请确认密码" v-model="singUp.configPassword">
                </label>
            </div>
            <button @click.prevent="singupVisible=false">关闭</button>
            <button type="submit">提交</button>
            <a href="" @click.prevent="singupVisible=false;loginVisible=true">登录</a>
        </form>
    </div>
        `
    })
}