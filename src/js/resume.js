Vue.component('resume',{
    //需要什么数据就从app那里传进来什么数据。
    props:['displayResume','mode','resume'],
    data(){
        return {

        }
    },
    template:`
   <div class="resume">
        <aside>
            <div class="imge"></div>
            <section class="message">
                <h3>基本信息</h3>
                <ul>
                    <li>
                        <editabel-span :disabled="mode === 'preview'" :value="displayResume.birthday"
                                       @edit="onEdit('birthday',$event)">
                        </editabel-span>
                    </li>
                    <li>
                        <editabel-span :disabled="mode === 'preview'" :value="displayResume.address"
                                       @edit="onEdit('address',$event)">
                        </editabel-span>
                    </li>
                    <li>
                        <editabel-span :disabled="mode === 'preview'" :value="displayResume.telphone"
                                       @edit="onEdit('telphone',$event)">
                        </editabel-span>
                    </li>
                    <li>
                        <editabel-span :disabled="mode === 'preview'" :value="displayResume.email"
                                       @edit="onEdit('email',$event)">
                        </editabel-span>
                    </li>
                </ul>
            </section>
        </aside>
        <main>
            <section class="produce">
                <!--editabel组件中使用v-bind传入一个value值，Vue实例中的name值-->
                <editabel-span :disabled="mode === 'preview'" :value="displayResume.name"
                               @edit="onEdit('name',$event)"></editabel-span>
                <p>
                    <editabel-span :disabled="mode === 'preview'" :value="displayResume.produce"
                                   @edit="onEdit('produce',$event)"></editabel-span>
                </p>
            </section>
            <section class="skills">
                <h3>技能</h3>
                <ul>
                    <li v-for="skill,index in displayResume.skilles">
                        <editabel-span :disabled="mode === 'preview'" :value="skill.name"
                                       @edit="onEdit('skilles['+index+'].name',$event)"></editabel-span>
                        <div>
                            <editabel-span :disabled="mode === 'preview'" :value="skill.descript"
                                           @edit="onEdit('skilles['+index+'].descript',$event)"></editabel-span>
                        </div>
                        <span v-if="index>=4&&mode==='edite'" @click="removeSkills(index)">x</span>
                    </li>
                    <li @click="addSkill" v-if="mode === 'edite'">添加</li>
                </ul>
            </section>
            <section class="project">
                <h3>项目经验</h3>
                <ul>
                    <li v-for="project,index in displayResume.projectes">
                        <div>
                            <h3>
                                <editabel-span :disabled="mode === 'preview'" :value="project.name"
                                               @edit="onEdit('projectes['+ index +'].name',$event)"></editabel-span>
                            </h3>
                            <editabel-span :disabled="mode === 'preview'" :value="project.link"
                                           @edit="onEdit('projectes['+ index +'].link',$event)"></editabel-span>
                        </div>
                        <div>
                            <editabel-span :disabled="mode === 'preview'" :value="project.descript"
                                           @edit="onEdit('projectes['+ index + '].descript',$event)"></editabel-span>
                        </div>
                        <span v-if="index >=4 && mode==='edite'" @click="removeProject(index)">x</span>
                    </li>
                    <li v-if="mode === 'edite'" @click="addProject">添加</li>
                </ul>
            </section>
        </main>
    </div>
    `,
    data(){
        return {

        }
    },
    methods:{
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

    }
})