import Circle from "./components/Circle.js"
import Create from "./components/Create.js"

export default class CraftingMain{
    constructor(GameMoneyManager, InventoryManager, UpgradeManager, CraftManager) {
        this.MoneyManager = GameMoneyManager
        this.inventory = InventoryManager;
        this.UpgradeManager = UpgradeManager;
        this.CraftManager = CraftManager
        this.circle = new Circle(this.inventory, this.MoneyManager, this.UpgradeManager, this.CraftManager);
        this.create_button = new Create(0.5, 0.9, this.circle);
    }

    checkMouseDown(event) {
        const rect = this.context.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        this.circle.checkMouseDown(x, y)
        
        if (this.inventory.currentlySelected.length > 1) {
            this.create_button.isClicked(x,y, this.context)
        }
    }

    add_context(context) {
        this.context = context
        this.circle.add_context(this.context)
    }

    animate() {
        this.circle.animate()

        if (this.inventory.currentlySelected.length > 1) {
            this.create_button.animate(this.context)
        }
        
        onmousemove = (e) => {
            const rect = this.context.canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            this.circle.updateMousePosition(x, y)
            this.create_button.isHovered(x, y, this.context)}
    }

    addNewItem(newItem) {
        this.circle.addNewItem(newItem)
    }
}
