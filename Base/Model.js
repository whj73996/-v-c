class Model {
    constructor(options) {
        // this.data = options.data
        ['data','create','update','delete','get'].forEach((key)=>{
            this[key] = options[key]  //稳定的简单
        })
    }
    create(){
        console&&console.error&&console.error("你还没有实现create")
    }
    delete(){
        console&&console.error&&console.error("你还没有实现create")
    }
    update(){
        console&&console.error&&console.error("你还没有实现create")
    }
    get(){
        console&&console.error&&console.error("你还没有实现create")
    }
}

export default Model