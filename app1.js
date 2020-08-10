import "./app1.css";
import $ from "jquery";

const eventBus = $({})              //————eventBus  将空对象变成JQuery对象，初始化时，在该对象身上on绑定自定义事件（并在回调函数里调用渲染方法），然后在m模块数据增删改查方法中，调用eventBus.trigger('自定义方法')

const m = {
    data: {
        n: parseFloat(localStorage.getItem("n")) || 100    //localstorage只能获取字符串，刷新页面时，从localStorage里获取数据（这里的n后面的方法是在刷新页面时自动调用的，因为外面没有包函数）
    },
    create(){},
    delete(){},
    update(data){
        Object.assign(m.data,data)
        eventBus.trigger('data-update')
        localStorage.setItem("n", m.data.n.toString());
    },
    get(){},
}

const view = {
    el: null,
    html: `
      <div>
        <div class="output">
          <span id="number">{{number}}</span>
        </div>
        <div class="action">
          <button id='add1'>+1</button>
          <button id='minus1'>-1</button>
          <button id='mul2'>*2</button>
          <button id='divide2'>÷2</button>
        </div>
      </section>
`,
    init(container) {                       //c.init(）是启动方法
        view.el = $(container)
        view.render(m.data.n)
        view.autoBindEvents()
        eventBus.on('data-update',()=>{
            view.render(m.data.n)
        })
    },
    event: {
        "click #add1": `add`,
        "click #minus1": `min`,
        "click #mul2": `mul`,
        "click #divide2": `div`,
                                        //表驱动编程
    },

    render: (n) => {
        if (view.el.children.length !== 0) view.el.empty()                                    //container不为空就清空再插入DOM对象
        view.el = $(view.html.replace("{{number}}", n)).appendTo(view.el)    //将新的DOM对象放在v.el中，并插入（因为外面有层container,不怕插错地方）
        //以新换旧
    },
    add() {
        //m.update({n:m.data.n +=1})   这里就不能用表达式了
        m.update({n:m.data.n +1})
    },
    min() {
        m.update({n:m.data.n -1})
    },
    mul() {
        m.update({n:m.data.n * 2})
    },
    div() {
        m.update({n:m.data.n /2})
    },
    autoBindEvents() {
        for (let key in view.event) {                  //表驱动编程，就是把事件做成hash表，然后遍历hash表绑定方法，这样可以稳定工作量
            const spaceIndex = key.indexOf(" ")
            const event = key.slice(0, spaceIndex)
            const ele = key.slice(spaceIndex + 1)
            view.el.on(event, ele, (e) => {
                view[view.event[key]](e)
                // v.render(m.data.n)
            })
        }
    }
}
//第一次渲染
export default view      //暴露接口给外部，模块化调用的核心步骤



