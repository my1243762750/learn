import Vue from 'vue'

Vue.directive('debounce', {
    bind: (el, binding, vnode, oldVnode) => {
        const {expression, modifiers, name, rawName, value} = binding
        console.log('=====bind=====', el, binding, vnode, oldVnode)
        console.log(expression, modifiers, name, rawName, value)
        // value && value()
    },
    inserted: (el, binding, vnode, oldVnode) => {
        console.log('=====inserted=====', el, binding, vnode, oldVnode)
    },
    update: (el, binding, vnode, oldVnode) => {
        console.log('=====update=====', el, binding, vnode, oldVnode)
        const value = binding.value
        value && value()
    },
    componentUpdated: (el, binding, vnode, oldVnode) => {
        console.log('=====componentUpdated=====', el, binding, vnode, oldVnode)
    },
    unbind: (el, binding, vnode, oldVnode) => {
        console.log('=====unbind=====', el, binding, vnode, oldVnode)
    }
})
