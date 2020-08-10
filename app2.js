import "./app2.css";
import $ from 'jquery'

const eventBus = $({})
const localKey = "app2.index"
const m = {

    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('data-update')
        localStorage.setItem(localKey,m.data.index)
    },
    get() {
    },
}



const view = {
    el: null,
    html:(index)=>{
        return`
    <div>
        <ol class="tab-bar">
          <li class="${index===0?'selected':''}" data-index="0">1</li>
          <li class="${index===1?'selected':''}" data-index="1">2</li>
        </ol>
        <ol class="tab-content">
          <li class="${index===0?'active':''}">content1</li>
          <li class="${index===1?'active':''}">content2</li>
        </ol>
    </div>
    `},

    render: (index) => {
        if (view.el.children.length !== 0) view.el.empty()                                    //container不为空就清空再插入DOM对象
        $(view.html(index)).appendTo(view.el)
    },
    init(container) {
        view.el = $(container)//c.init(）是启动方法
        view.render(m.data.index)
        view.autoBindEvents()
        eventBus.on('data-update',()=>{
            view.render(m.data.index)
        })
    },
    event: {
        "click .tab-bar li": `x`,
        //表驱动编程
    },
    x(e){
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index:index})
    },
    autoBindEvents() {
        for (let key in view.event) {                  //表驱动编程，就是把事件做成hash表，然后遍历hash表绑定方法，这样可以稳定工作量
            const spaceIndex = key.indexOf(" ")
            const event = key.slice(0, spaceIndex)
            const ele = key.slice(spaceIndex + 1)
            view.el.on(event, ele, (e) => {
                view[view.event[key]](e)
                // c.render(m.data.n)
            })
        }
    }
}

export default view