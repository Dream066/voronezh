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