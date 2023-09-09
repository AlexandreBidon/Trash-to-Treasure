import Item from "./Item.js"
import Result from "./Result.js"
import selectCraftResult from "../../../services/selectCraftResult.js"

export default class Circle {

    constructor(InventoryManager, MoneyManager, UpgradeManager, CraftManager) {
        this.MoneyManager = MoneyManager
        this.inventory = InventoryManager
        this.UpgradeManager = UpgradeManager
        this.CraftManager = CraftManager
        this.dx_center = 0.5
        this.dy_center = 0.4


        this.defaultRadius = 0.3
        this.currentRadius = this.defaultRadius

        this.itemList = [
        ]

        this.angle = 0
        this.baseSpeed = 0.005
        this.maxSpeed = 0.2
        this.currentSpeed = this.baseSpeed

        this.crafting = false
        this.selling = false
        this.result = new Result(0.5, 0.4, this)

        this.sell_audio = new Audio('./sounds/sell.mp3');
    }

    add_context(context) {
        this.context = context
    }

    animate() {
        if (!this.selling) {
            this.preCraft()
            this.angle += this.currentSpeed
    
            var add_angle = 2 * Math.PI / this.itemList.length
            this.itemList.forEach((element, index) => element.animate(this.context, this.angle + index * add_angle))
        } else {
            this.result.animate(this.context)
        }
    }

    checkMouseDown(x, y) {
        if (!this.crafting) {
            for (let i = 0; i < this.itemList.length; i++) {
                this.itemList[i].updateMousePosition(x, y, this.context)
                if (this.itemList[i].isClicked()) {
                    this.itemList.splice(i, 1);
                    this.inventory.removeSelected(i)
                }
            }
        }
        if (this.selling) {
            this.result.isClicked(x, y, this.context)
        }
    }

    updateMousePosition(x, y) {
        this.itemList.forEach((element) => element.updateMousePosition(x, y, this.context))

        if (this.selling) {
            this.result.isHovered(x, y, this.context)
        }
    }

    craft() {
        console.log("crafting")
        this.crafting = true
        let craftResult = selectCraftResult(this.inventory.currentlySelected)
        this.CraftManager.discover(craftResult.position)
        this.result.reset(craftResult.img, craftResult.name, Math.floor(craftResult.price * this.UpgradeManager.CraftSellMultiplier))
    }

    sell(price) {
        // Sell the thing you just crafted
        console.log("selling")
        this.itemList = []
        this.MoneyManager.addMoney(price)
        this.sell_audio.play()
        this.selling = false
        this.crafting = false
    }

    preCraft() {
        if (this.crafting) {
            this.currentRadius = Math.max( this.currentRadius - 0.005, 0)
            this.currentSpeed = Math.min( this.currentSpeed + 0.1, this.maxSpeed)
            if (this.currentRadius == 0) {
                this.selling = true
            }
        } else {
            this.currentRadius = this.defaultRadius;
            this.currentSpeed = this.baseSpeed;
        }
        this.itemList.forEach((element) => element.updateRadius(this.currentRadius))
    }

    addNewItem(newItem) {
        this.itemList.push( new Item(this.dx_center, this.dy_center, this.currentRadius, newItem.img))
    }
}