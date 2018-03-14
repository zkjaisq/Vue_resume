Vue.component('share',{
    template:`
     <div class="share" >
        <div>
            <h2>请将下面的链接分享给面试官</h2>
            <textarea readonly>{{shareLink}}</textarea>
        </div>
    </div>
    `

})