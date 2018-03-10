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
            }
        },
        methods: {
            onEdit(key, value) {
                this.resume[key] = value
            },
            onClicksave(){
                /*console.log(this.resume);
                // 声明类型
                let User = AV.Object.extend('User');
                // 新建对象
                let user = new User();
                // 设置名称
                user.set('resume',this.resume);
                // 设置优先级
                user.set('priority',1);
                user.save().then(function (todo) {
                    console.log('objectId is ' + todo.id);
                }, function (error) {
                    console.error(error);
                });*/
                let  currentUser = AV.User.current();
                console.log(currentUser)
                if (!currentUser) {
                    this.loginVisible =true
                }
                else {
                    this.saveResume()
                    //currentUser 为空时，可打开用户注册界面…
                }
            },
            saveResume(){

            },

        },

    })
}