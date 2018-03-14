{
    let app = new Vue({
        el: '#app',
        data: {
            loginVisible:false,
            editingName: false,
            singupVisible:false,
            shareVisible:false,
            previewResume:{

            },
            currentUser:{
                objectId:undefined,
                email:undefined
            },
            previewUser:{
               objectId:undefined
            },
            resume: {
                name: '',
                birthday: '',
                address: '',
                telphone: '',
                email: '',
                produce: '',
                skilles:[
                    {name:'请填写技能名称',descript:'请填写技能描述'},
                    {name:'请填写技能名称',descript:'请填写技能描述'},
                    {name:'请填写技能名称',descript:"请填写技能描述"},
                    {name:'请填写技能名称',descript:'请填写技能描述'}],
                projectes:[
                    {name:'请填写项目名称',link:'请填写连接',descript:'项目描述'},
                    {name:'请填写项目名称',link:'请填写链接',descript:'项目描述'},
                    {name:'请填写项目名称',link:'请填写链接',descript:'项目描述'},
                    {name:'请填写项目名称',link:'请填写链接',descript:'项目描述'}
                ]
            },
            login:{
                email:'',
                passwor:'',

            },
            singUp:{
                email:'',
                password:'',
                configPassword:''
            },
            shareLink:'',
            mode:'edite'//'preview'
        },
        //在methods的同级写一个watch，用来监听data的属性的变化，当检查到变化的时候执行一个函数的操作。
        watch:{
            'currentUser.objectId':function (newValue,oldValue) {
                console.log(newValue);
                if(newValue){
                    console.log(newValue);
                    this.findResume(this.currentUser)
                }
            }
        },
        //计算属性,是一个属性
        computed:{
            displayResume(){
               return  this.mode === 'preview' ? this.previewResume : this.resume
            }
        },
        methods: {
            onEdit(key, value) {
                console.log(key);
                //这是打出的结果key = skills[0].name
                let regex = /\[(\d+)\]/g///g表示的是全局替换
                //将key替换一下
                key = key.replace(regex,(match,number)=>{
                    return '.' + number
                })
                console.log(key)//skills.0.name
                let keys = key.split('.')
                let result = this.resume
                for(let i =0;i <keys.length;i++){
                    if(i === keys.length - 1){
                        result[keys[i]] = value//话内存图可以直到最后一次的是一个常量的
                        console.log(this.resume);
                    }else{
                        //i = 0 result = resume.skilles
                        // i = 1 result = resume.skilles[0]
                        // i = 2 result = resume.skilles[0].name
                        result = result[keys[i]]
                        console.log(result)
                    }
                }
            },
            onClicksave(){
                let  currentUser = AV.User.current();
                if (!currentUser) {
                    this.loginVisible = true
                }
                else {
                    this.saveResume()
                    //currentUser 为空时，可打开用户注册界面…
                }
            },
            saveResume(){
                let {objectId} = AV.User.current().toJSON()
                console.log(AV.User.current().toJSON());
                // 第一个参数是 className，第二个参数是 objectId
                var todo = AV.Object.createWithoutData('User',objectId);
                // 修改属性
                todo.set('resume', this.resume);
                // 保存到云端
                todo.save();
                alert('保存成功')
            },
            onLogin(){
                console.log(this.login);
                AV.User.logIn(this.login.email, this.login.password).then( (user)=> {
                    alert('登录成功')
                    this.loginVisible = false
                    user = user.toJSON()
                    console.log(user);
                    this.currentUser.objectId = user.objectId
                    this.currentUser.email = user.email
                    this.findResume(this.currentUser.objectId)
                }, function (error) {
                    if(error.code === 211){
                        alert('用户不存在')
                    }else if(error.code === 210){
                        alert('密码错误')
                    }
                });
            },
            onsingUp(e){
                // 新建 AVUser 对象实例
                let user = new AV.User();
                // 设置用户名
                user.setUsername(this.singUp.email);
                // 设置密码
                user.setPassword(this.singUp.password);
                // 设置邮箱
                user.setEmail(this.singUp.email);
                user.signUp().then( (user)=> {
                    alert('注册成功')
                this.singupVisible = false
                    user = user.toJSON()
                    this.currentUser.objectId = user.objectId
                    this.currentUser.email = user.email
                }, function (error) {
                    alert(error.rawMessage)

                });
            },
            onLogout(){
                AV.User.logOut();
                // 现在的 currentUser 是 null 了
                let currentUser = AV.User.current();
                alert('注销成功')
                console.log(currentUser);
            },
            findResume(user){
                var query = new AV.Query('User');
                return query.get(user.objectId).then( (user)=> {
                    let resume = user.toJSON().resume
                  return resume
                }, function (error) {
                    // 异常处理
                });
            },
            //添加新的技能，因为数据是一个数组，所以添加一个新的实例就是像数组中push一个对象。
            addSkill(){
                this.resume.skilles.push({name:'请填写对象',descript:'请填写技能描述'})
            },
            removeSkills(index){
                this.resume.skilles.splice(index,1)
            },
            addProject(){
                this.resume.projectes.push({name:'请填写项目名称',link:'请填写连接',descript:'项目描述'})
            },
            removeProject(index){
                this.resume.projectes.splice(index,1)
            },
            onPrint(){
                window.print()
            }

        },

    })

// 获取当前用户
    let currentUser = AV.User.current()
    if (currentUser) {
        app.currentUser = currentUser.toJSON()
        app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        app.findResume(app.currentUser).then(resume => {
            app.resume = resume
        })
    }


// 获取预览用户的 id
    let search = location.search
    let regex = /user_id=([^&]+)/
    let matches = search.match(regex)
    let userId
    if (matches) {
        userId = matches[1]
        app.mode = 'preview'
        console.log('preview' + userId )
        app.findResume({objectId: userId}).then(resume => {
            console.log(resume)
            app.previewResume = resume
            console.log(app.previewResume)
        })
    }

}