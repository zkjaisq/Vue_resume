{
    Vue.component('editabel-span', {
        //从外部出入一个值，进行渲染，一定要是用props
        props: ['value','disabled'],
        //将value的值传进去，并且绑定input事件，
        //当disabled不存在的时候才会展示edit按钮才会是编辑状态。当是预览状态的时候就不是显示edite按钮的。
        template: `
<div>
        <span v-show="!editing" contenteditable="true">{{value}}</span>
        <input v-show="editing" type="text" :value="value" @input="triggerEdit">
        <button v-if="!disabled" @click="editing=!editing">edite</button>
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
