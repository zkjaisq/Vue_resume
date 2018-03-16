Vue.component('share',{
    props:['share_link'],
    template:`
     <div class="share" >
        <div>
            <h2>请将下面的链接分享给面试官</h2>
            <textarea readonly>{{share_link}}</textarea>
        </div>
    </div>
    `

})