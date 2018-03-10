{
    Vue.component('editabel-span', {
        //从外部出入一个值，进行渲染，一定要是用props
        props: ['value'],
        //将value的值传进去，并且绑定input事件，当
        template: `
<div>
        <span v-show="!editing" contenteditable="true">{{value}}</span>
        <input v-show="editing" type="text" :value="value" @input="triggerEdit">
        <button @click="editing=!editing">edite</button>
</div>

    `,
        data() {
            return {
                editing: false
            }
        },
        methods: {
            triggerEdit(e) {
                this.$emit('edit', e.currentTarget.value)
            }
        }
    })
}
