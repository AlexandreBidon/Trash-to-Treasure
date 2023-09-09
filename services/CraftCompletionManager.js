import { CraftResult } from "../data/CraftResult.js";

export default class CraftCompletionManager {
    constructor() {
        this.all_craft = CraftResult;
        this.craft_number = this.all_craft.length;
        this.craft_found_count = 0;
        this.craftbook_place = document.getElementById("craft-book-place")
    }
  
    discover(craft_position) {
      if (this.all_craft[craft_position].unlocked == false) {
        this.all_craft[craft_position].unlocked = true;
        this.craft_found_count += 1;
        console.log("discovered new craft:" + this.all_craft[craft_position].name)
      } else {
        console.log("craft already discovered")
      }
      this.renderMainMenu()
    }

    renderMainMenu() {
      const that = this;
      let craftDiv = document.createElement('div');
      craftDiv.className = 'craft-main';

      let craftCountDiv = document.createElement('div');
      craftCountDiv.className = 'craft-count';
      craftCountDiv.innerHTML = this.craft_found_count + "/" + this.craft_number

      let craftListDiv = document.createElement('div');
      craftListDiv.className = 'craft-list';
  
      for (var i = 0; i < this.craft_number; i++) {
          let itemDiv = document.createElement('div');
          itemDiv.className = "craft-item";
          itemDiv.ItemId = i;
          // itemDiv.onclick = function(e) { that.renderCraftInfo(); console.log("test")}
          let itemIcon = document.createElement('div');
          itemIcon.className = "item-icon";
          let itemIconImg = document.createElement('img');
          itemIconImg.src = this.all_craft[i].img
          if (!this.all_craft[i].unlocked) {
            itemIconImg.style.cssText = "filter: brightness(0) opacity(25%);"
          }
          itemIconImg.draggable = false
          let itemIconTxt = document.createElement('div')
          if (this.all_craft[i].unlocked) {
            itemIconTxt.innerHTML = this.all_craft[i].name
          } else {
            itemIconTxt.innerHTML = "???"
          }
          
          itemIcon.appendChild(itemIconImg)
          itemIcon.appendChild(itemIconTxt)
          itemDiv.appendChild(itemIcon);
          craftListDiv.appendChild(itemDiv);
      }
  
      craftDiv.appendChild(craftCountDiv)
      craftDiv.appendChild(craftListDiv)
      this.craftbook_place.innerHTML = '';
      this.craftbook_place.appendChild(craftDiv)
    }

    renderCraftInfo() {
      this.craftbook_place.innerHTML = 'test';
    }

  }