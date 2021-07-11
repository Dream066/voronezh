/* modules */

class Accordion {
    static active = null
    static inited = []

    static clear = () => {
        Accordion.inited.forEach(instance => {
            instance.destroy()
        })

        Accordion.active = null
        Accordion.inited = []
    }

    constructor(control, content) {
        this.isOpened = false

        this.$refs = {
            control,
            content
        }

        this.$refs.control.addEventListener('click', this.onClick)
        this.$refs.content.addEventListener('transitionend', this.onAnimationEnd)
        Accordion.inited.push(this)
    }

    onClick = () => {
        !this.isOpened ? this.open() : this.close()
    }

    onAnimationEnd = (e) => {
        if (e.target !== this.$refs.content) return
        if (e.propertyName !== 'height') return
        if (!this.isOpened) return

        e.target.style.height = 'auto'
    }

    open = () => {
        if (this.isOpened) return
        // if (Accordion.active) Accordion.active.close()
        this.isOpened = true
        Accordion.active = this
        this.$refs.control.classList.add('active')
        this.$refs.content.classList.add('active')
        this.$refs.content.style.height = `${this.$refs.content.scrollHeight}px`
    }

    close = () => {
        if (!this.isOpened) return
        this.isOpened = false
        this.$refs.content.style.height = `${this.$refs.content.scrollHeight}px`
        getComputedStyle(this.$refs.content).height
        this.$refs.content.style.height = '0px'
        this.$refs.control.classList.remove('active')
        this.$refs.content.classList.remove('active')
    }

    destroy = () => {
        this.$refs.control.removeEventListener('click', this.onClick)
        this.$refs.content.removeEventListener('transitionend', this.onAnimationEnd)
        this.$refs.content.removeAttribute('style')
        this.$refs.control.classList.remove('active')
        this.$refs.content.classList.remove('active')
    }
}
// const items = [...document.querySelectorAll('.js-catalog-accordion')].map(item => ({
//     container: item,
//     control: item.querySelector('.js-catalog-control'),
//     content: item.querySelector('.js-catalog-body'),
// }))

// items.forEach(item => {
//     new Accordion(item.control, item.content)
//     item.container.appendChild(item.content)
// })
class Tab {
    static active = null
    static inited = []
    static clear = () => {
        Tab.inited.forEach(instance => {
            instance.destroy()
        })

        Tab.active = null
        Tab.inited = []
    }

    constructor(control, content) {
        this.isOpened = false
        this.$refs = {
            control,
            content
        }

        this.$refs.control.addEventListener('mouseover', this.open)
        Tab.inited.push(this)
    }

    open = () => {
        if (this.isOpened) return
        if (Tab.active) Tab.active.close()
        this.isOpened = true
        Tab.active = this
        this.$refs.control.classList.add('active')
        this.$refs.content.classList.add('active')
    }

    close = () => {
        if (!this.isOpened) return
        this.isOpened = false
        this.$refs.control.classList.remove('active')
        this.$refs.content.classList.remove('active')
    }

    destroy = () => {
        this.$refs.control.removeEventListener('mouseover', this.open)
        this.$refs.control.classList.remove('active')
        this.$refs.content.classList.remove('active')
    }
}

// const items = [...document.querySelectorAll('.js-services-item')].map(item => ({
//     container: item,
//     control: item.querySelector('.js-services-control'),
//     content: item.querySelector('.js-services-content'),
// }))


// items.forEach(item => {
//     new Tab(item.control, item.content)
//     tabs.appendChild(item.content)
// })

// if (Tab.inited[0]) Tab.inited[0].open()

/* my scripts */