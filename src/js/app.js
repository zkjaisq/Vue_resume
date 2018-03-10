{
    let vm = new Vue({
        el: '#app',
        data: {
            loginVisible:false,
            editingName: false,
            singupVisible:false,
            resume: {
                name: '张科家',
                birthday: '1995.10.02',
                address: '湖北随州',
                skills: '个人技能',
                telphone: '18771964684',
                email: 'charityjia@Gmail.com',
                produce: '个人介绍'
            },
            login:{
                email:'',
                passwor:'',

            },
            singUp:{
                email:'',
                password:'',
                configPassword:''
            }
        },
        methods: {
            onEdit(key, value) {
                this.resume[key] = value
            },
            onClicksave(){
                let  currentUser = AV.User.current();
                if (!currentUser) {
                    this.singupVisible = true
                }
                else {
                    this.saveResume()
                    //currentUser 为空时，可打开用户注册界面…
                }
            },
            saveResume(){
                let {id} = AV.User.current()
                // 第一个参数是 className，第二个参数是 objectId
                var todo = AV.Object.createWithoutData('User',id);
                // 修改属性
                todo.set('resume', this.resume);
                // 保存到云端
                todo.save();
            },
            onLogin(){
                console.log(this.login);
                AV.User.logIn(this.login.email, this.login.password).then(function (user) {
                    console.log(user);
                    alert('登录成功')
                    this.data.loginVisible = true
                }, function (error) {
                    console.log(error.code)
                    if(error.code === 211){
                        alert('用户不存在')
                    }else if(error.code === 210){
                        alert('密码错误')
                    }
                });
            },
            onsingUp(e){
                console.log(this.singUp);
                // 新建 AVUser 对象实例
                let user = new AV.User();
                // 设置用户名
                user.setUsername(this.singUp.email);
                console.log(this.singUp.email);
                // 设置密码
                user.setPassword(this.singUp.password);
                // 设置邮箱
                user.setEmail(this.singUp.email);
                user.signUp().then(function (user) {
                    console.log(user);
                    alert('注册成功')
                }, function (error) {
                });
            },
            onLogout(){
                AV.User.logOut();
                // 现在的 currentUser 是 null 了
                var currentUser = AV.User.current();
                console.log(currentUser);
            }

        },

    })
}