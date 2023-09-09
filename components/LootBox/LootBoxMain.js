import { renderImage } from "../../services/canvasUtils.js";
import TrashLootBox from "./components/TrashLootBox.js";
import BuyAll from "./components/BuyAll.js";
import Reroll from "./components/Reroll.Js";

export default class LootBoxMain{
    constructor(GameMoneyManager, InventoryManager, UpgradeManager) {
        this.GameMoneyManager = GameMoneyManager
        this.inventory = InventoryManager
        this.UpgradeManager = UpgradeManager
        this.dropList = []
        this.trash_list = [ 
            new TrashLootBox(0.2, GameMoneyManager, this.dropList, this.inventory, this.UpgradeManager),
            new TrashLootBox(0.5, GameMoneyManager, this.dropList, this.inventory, this.UpgradeManager),
            new TrashLootBox(0.8, GameMoneyManager, this.dropList, this.inventory, this.UpgradeManager)]

        this.buy_all = new BuyAll(0.3, 0.85, this.GameMoneyManager, this.trash_list)
        this.reroll = new Reroll(0.7, 0.85, this.GameMoneyManager, this.trash_list)
    }

    checkMouseDown(event) {
        const rect = this.context.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        for (const element of this.trash_list) {
            element.isClicked(x, y)
        }

        this.buy_all.isClicked(x, y, this.context)
        this.reroll.isClicked(x, y, this.context)
    }

    add_context(context) {
        this.context = context
        
    }

    animate() {

        this.trash_list.forEach((element) => element.animate(this.context))

        onmousemove = (e) => {
            const rect = this.context.canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            this.trash_list.forEach((element) => element.isHovered(x, y))
            this.buy_all.isHovered(x, y, this.context)
            this.reroll.isHovered(x, y, this.context)}

        this.dropList.forEach((element) => element.move(this.context))

        for (let i = 0; i < this.dropList.length; i++) {
            if ( Math.abs(this.dropList[i].dx) > 1 || Math.abs(this.dropList[i].dy) > 1 ) {
                this.dropList.splice(i, 1);
            }
        }

        this.buy_all.animate(this.context)
        this.reroll.animate(this.context)
    }
}
