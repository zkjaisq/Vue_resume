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


            shareLink:'',
            mode:'edite'//'preview'
        },
        //在methods的同级写一个watch，用来监听data的属性的变化，当检查到变化的时候执行一个函数的操作。
        watch:{
            'currentUser.objectId':function (newValue,oldValue) {
                if(newValue){
                    console.log(newValue);
                    console.log(this.currentUser);
                    this.findResume(this.currentUser).then((resume)=>{
                        console.log(resume);
                        this.resume=resume
                    })
                }
            }
        },
        //计算属性,是一个属性
        computed:{
            displayResume(){
                console.log(this.resume)
                console.log(this.mode);
                let a =   this.mode === 'preview' ? this.previewResume : this.resume
                console.log(a)
                return a

            }
        },
        methods: {
            onLogin(user){
                console.log(user);
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                console.log(this.currentUser)
                this.loginVisible = false
                let currentUser = AV.User.current()
            },
            onsingUp(user){
                console.log(user);
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                console.log(1111);
                this.singupVisible = false
                console.log(444444);

                console.log(this.currentUser);
                let currentUser = AV.User.current()
                this.saveResume()
                this.findResume(this.currentUser).then((resume)=>{
                    console.log(resume);
                    this.resume=resume
                })

            },
            singup(){
                this.loginVisible = false
                this.singupVisible = true
            },
            closer(){
                this.singupVisible = false
            },
            login(){
                console.log(2);
                this.singupVisible =false
                this.loginVisible = true

            },

            onClicksave(){
                let  currentUser = AV.User.current();
                console.log(currentUser);
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


            onLogout(){
                AV.User.logOut();
                // 现在的 currentUser 是 null 了
                let currentUser = AV.User.current();
                alert('注销成功')
            },
            findResume(user){
                var query = new AV.Query('User');
                return query.get(user.objectId).then( (user)=> {
                    console.log(user);
                    let resume = user.toJSON().resume
                    console.log(resume);
                    return resume
                }, function (error) {
                    console.log(error);
                    // 异常处理
                });
            },
            //添加新的技能，因为数据是一个数组，所以添加一个新的实例就是像数组中push一个对象。

            onPrint(){
                window.print()
            },
            onShare(){
                this.shareVisible = true
            },


        },

    })

// 获取当前用户
    let currentUser = AV.User.current()
    if (currentUser) {
        app.currentUser = currentUser.toJSON()
        console.log(app.currentUser);
        app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        console.log(app.shareLink);
        app.findResume(app.currentUser).then(resume => {
            app.resume = resume
        })
    }else{

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
            app.previewResume = resume
            console.log(app.previewResume)
        })
    }

}