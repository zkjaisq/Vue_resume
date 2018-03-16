Vue.component('sider',{
    props:['objectId'],
    template:`
     <aside>
        <ul>
            <div class="wrapper">
                <li>
                    <button @click="$emit('clicksave')">保存</button>
                </li>
                <li>
                    <button @click="$emit('print')">打印</button>
                </li>
                <li>
                    <button>换肤</button>
                </li>
                <li>
                    <button @click="$emit('share')">分享</button>
                </li>
            </div>
            <li>
                <button @click="$emit('logout')" v-show="objectId">登出</button>
            </li>
        </ul>
    </aside>
    `
})