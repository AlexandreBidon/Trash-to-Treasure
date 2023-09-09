import MoneyManager from "./services/MoneyManager.js";
import { fitToContainer } from "./services/canvasUtils.js";
import LootBoxMain from "./components/LootBox/LootBoxMain.js";
import CraftingMain from "./components/Crafting/crafting.js";
import UpgradeManager from "./services/UpgradeManager.js";
import Inventory from "./components/Crafting/components/Inventory.js";
import { loadImages } from "./services/imgLoader.js";
import CraftCompletionManager from "./services/CraftCompletionManager.js";


let GameMoneyManager = new MoneyManager(2000)


let inventory = []
let selected = []

let craft_manager = new CraftCompletionManager()
let upgrade_main = new UpgradeManager(GameMoneyManager)
let inventory_main = new Inventory(inventory, selected)
let loot_box = new LootBoxMain(GameMoneyManager, inventory_main, upgrade_main)
let crafting_main = new CraftingMain(GameMoneyManager, inventory_main, upgrade_main, craft_manager)



window.addEventListener('load', function() {
    // On charge les images
    var imgLoader = loadImages([
        "./img/trashcan/1.png",
        "./img/trashcan/2.png",
        "./img/trashcan/3.png",
        "./img/trashcan/4.png",
        "./img/trashcan/5.png",
        "./img/trash/bone.png",
        "./img/trash/can.png",
        "./img/trash/gold-nugget.png",
        "./img/trash/paper.png",
        "./img/trash/bulb.png",
        "./img/trash/stick.png",
        "./img/trash/fish-bone.png",
        "./img/trash/rotten-apple.png",
        "./img/trash/bottle.png",
        "./img/trash/ship-helm.png",
        "./img/craft/blank-canvas.png",
        "./img/craft/fish-monster.png",
        "./img/craft/gold-trashpile.png",
        "./img/craft/trash-can.png",
        "./img/craft/trashpile.png",
        "./img/craft/can-statue.png",
        "./img/craft/stick-in-pot.png"
    ])

    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const startMenu = document.getElementById('start_menu');
    startMenu.style.display = 'flex';

    let loot_canvas = document.getElementById("trash-loot-canvas")
    let loot_ctx = loot_canvas.getContext("2d");
    loot_box.add_context(loot_ctx)
    loot_ctx.canvas.addEventListener('mousedown', function(e) {
        loot_box.checkMouseDown(e)
    })

    let craft_canvas = document.getElementById("craft-canvas")
    let craft_ctx = craft_canvas.getContext("2d");
    crafting_main.add_context(craft_ctx)
    craft_ctx.canvas.addEventListener('mousedown', function(e) {
        crafting_main.checkMouseDown(e)
    })

    craft_manager.renderMainMenu()
})

function updateTrashLoot() {
    let loot_canvas = document.getElementById("trash-loot-canvas")
    fitToContainer(loot_canvas)
    
    loot_box.animate()

}

function updateCrafting() {
    let craft_canvas = document.getElementById("craft-canvas")
    fitToContainer(craft_canvas)

    crafting_main.animate()
    inventory_main.update()
    Array.from(document.getElementsByClassName("item")).forEach( function(element, index) {
        element.addEventListener('mousedown', selectNewItem)
      })
}

function selectNewItem(event) {
    if (inventory_main.currentlySelected.length < 5 && !crafting_main.circle.crafting) {
        let resultItem = inventory_main.addSelected(event.currentTarget.ItemId)
        crafting_main.addNewItem(resultItem)
    }
}

function updateUpgrade() {
    upgrade_main.update()

    Array.from(document.getElementsByClassName("upgrade-item")).forEach( function(element, index) {
        element.addEventListener('mousedown', buyUpgrade)
      })
}

function buyUpgrade(event) {
    upgrade_main.buyUpgrade(event.currentTarget.ItemId)
}


(function update() {
    //main_theme.play();
    GameMoneyManager.updateMoney()

    if ( document.getElementById("trash_loot").style.display == "flex" ) {
        updateTrashLoot()
    }
    if ( document.getElementById("art_craft").style.display == "flex" ) {
        updateCrafting()
    }
    if (document.getElementById("upgrade_gallery").style.display == "flex" ) {
        updateUpgrade()
    }

    requestAnimationFrame(update);
} ())