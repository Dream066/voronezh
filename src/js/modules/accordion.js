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
