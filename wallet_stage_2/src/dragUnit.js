import { GetElement } from "./getElement";
import { DragElement } from "./dragElement"

let unitDragElementList = []

class DragUnit extends DragElement {

  constructor(target) {
    super(target)
    this.target = target
    this.mousemove()
    unitDragElementList.push(this) 
    this.lastNumber = 0
  }

  mousemove = () => {
    document.body.addEventListener('mousemove', (event) => {
      if (this.mouseDown) {
        const target = this.target.clientWidth + 16 + 2 
        //可以用super来改变父class中的数据吗
        const len = GetElement.getUnits().length
        const pos = this.getPosition()
        if(this.moveDistance.x > target && pos < len-1) {
          const moveNumber = Math.floor(this.moveDistance.x / target )
          if(this.lastNumber === moveNumber) {
            return
          }
          this.lastNumber = moveNumber
          if(pos + moveNumber < len) {
            GetElement.getUnits()[pos + moveNumber].style.transform = `translate(-${target}px)`
          //防止重复计算当tagter偏移的时候才计算进行移动
            const unit = unitDragElementList.find(el => el.target === GetElement.getUnits()[pos + moveNumber])
            // console.log(unit.originalMoveDistance);
            unit.originalMoveDistance.x -= target 
            // console.log(unit.originalMoveDistance);
          }
        }
        if(-this.moveDistance.x > target && pos > 0 ) {
          const moveNumber = Math.floor( -this.moveDistance.x / target )
          // console.log("movenumber" , moveNumber);
          if(pos + moveNumber >= len) {
            GetElement.getUnits()[pos - moveNumber].style.transform = `translate(${target}px)`
            const unit = unitDragElementList.find(el => el.target === GetElement.getUnits()[pos - moveNumber])
            // console.log(unit.originalMoveDistance);
            unit.originalMoveDistance.x += target 
            // console.log(unit.originalMoveDistance);
              
          }
        }
        document.onmousemove = null
      }
    })
  }

  // onmouseup = () => {
  //   document.onmousemove = null
  //   document.onmouseup = null 
  // }

  getPosition = () => {
    return GetElement.getUnits().findIndex(el => el === this.target)
  }
}

GetElement.getUnits().forEach(el => {
  new DragUnit(el)
})

export { DragUnit , unitDragElementList }