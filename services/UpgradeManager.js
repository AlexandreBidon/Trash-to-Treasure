import { TrashLootType } from "../data/TrashLoot.js";



export default class UpgradeManager {
    constructor(GameMoneyManager) {
      this.CraftSellMultiplier = 1;
      this.TrashLootPriceMultiplier = 1;
      this.TrashLootBonusDrop = 0;
      this.GameMoneyManager = GameMoneyManager
      this.upgradeList = [
        {
            "type": "craft-sell",
            "title": "A fishy desk",
            "description": "Your art is now selling for a 10% higher price.",
            "price": 2500,
            "amount": 0.1,
            "element_id": "upgrade-desk",
            "activated": false
        },
        {
            "type": "craft-sell",
            "title": "A strange painting",
            "description": "Your art is now selling for a 10% higher price.",
            "price": 2500,
            "amount": 0.1,
            "element_id": "3d-painting",
            "activated": false
        },
        {
            "type": "trash-price",
            "title": "New carpet",
            "description": "You can now buy thrashcan at a 10% discount.",
            "price": 2500,
            "amount": 0.1,
            "element_id": "upgrade-carpet",
            "activated": false
        },
        {
            "type": "trash-price",
            "title": "A New Mona Lisa",
            "description": "You can now buy thrashcan at a 10% discount.",
            "price": 2500,
            "amount": 0.1,
            "element_id": "modern-painting",
            "activated": false
        },
        {
            "type": "trash-drop",
            "title": "Light up the bins",
            "description": "Trashcan now drop one more item.",
            "price": 2500,
            "amount": 1,
            "element_id": "upgrade-light",
            "activated": false
        },
        {
            "type": "trash-drop",
            "title": "Tree shade",
            "description": "Trashcan now drop one more item.",
            "price": 2500,
            "amount": 1,
            "element_id": "upgrade-tree",
            "activated": false
        },
        {
            "type": "new-trash",
            "title": "Pirates are coming!",
            "description": "A new type of trashcan is available to buy.",
            "price": 3000,
            "trash_can_type": 4,
            "element_id": "upgrade-pirate-painting",
            "activated": false
        },
        {
            "type": "new-trash",
            "title": "Shiny trashcan",
            "description": "A new type of trashcan is available to buy.",
            "price": 3000,
            "trash_can_type": 2,
            "element_id": "upgrade-trash",
            "activated": false
        }
      ]
      this.upgrade_place = document.getElementById("upgrade-place")
      this.up = 0
      this.buy_sound = new Audio('./sounds/buy.mp3');
      this.buy_sound.volume = 0.15;
      this.available_trash_can = [ 0, 1, 3]
    }
  
    get allUpgrade() {
      return this.upgradeList;
    }
  
    buyUpgrade(index) {
        if ( this.upgradeList[index].activated == false && this.GameMoneyManager.currentMoney >= this.upgradeList[index].price) {
            this.upgradeList[index].activated = true
            this.GameMoneyManager.withdrawMoney(this.upgradeList[index].price)
            this.unlockVisualUpgrade(this.upgradeList[index].element_id)
            this.buy_sound.pause()
            this.buy_sound.currentTime = 0
            this.buy_sound.play();
            switch (this.upgradeList[index].type) {
                case 'craft-sell':
                    this.CraftSellMultiplier += this.upgradeList[index].amount;
                    break;
                case 'trash-price':
                    this.TrashLootPriceMultiplier -= this.upgradeList[index].amount;
                    break;
                case 'trash-drop':
                    this.TrashLootBonusDrop += this.upgradeList[index].amount;
                    break;
                case 'new-trash':
                    this.available_trash_can.push(this.upgradeList[index].trash_can_type)
                    break;
                default:
                    console.log(`Upgrade type not found`);
            }
        }
        this.render(3)
    }

    unlockVisualUpgrade(upgradeID) {
        if (upgradeID != "") {
            document.getElementById(upgradeID).style.display = "block";
        }
    }

    render(numberRender = 1) {
        let upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade-menu';
    
        for (var i = 0; i < this.upgradeList.length; i++) {
            let itemDiv = document.createElement('div');
            itemDiv.className = "upgrade-item";
            itemDiv.ItemId = i;

            let itemTitle = document.createElement('div');
            itemTitle.className = "upgrade-title";
            itemTitle.innerHTML = this.upgradeList[i].title

            let itemDescription = document.createElement('div');
            itemDescription.className = "upgrade-description";
            itemDescription.innerHTML = this.upgradeList[i].description

            let itemPrice = document.createElement('div');
            itemPrice.className = "upgrade-price";
            if (this.upgradeList[i].activated) {
                itemPrice.innerHTML = "SOLD"
            } else {
                itemPrice.innerHTML = this.upgradeList[i].price + " $"
            }
            

            itemDiv.appendChild(itemTitle);
            itemDiv.appendChild(itemDescription);
            itemDiv.appendChild(itemPrice);
            upgradeDiv.appendChild(itemDiv);
        }
    

        this.upgrade_place.innerHTML = '';
        this.upgrade_place.appendChild(upgradeDiv)

        if (numberRender > 0) {
            this.render(numberRender - 1)
        }
    }

    update() {
        if ( this.up < 2) {
            this.render()
            this.up += 1
        }
    }

    selectTrashType() {
        //Create a 4 element array based on probability weight
        var available_lootbox = this.available_trash_can.map(x=>TrashLootType[x])

        var probability = available_lootbox.map((v, i) => Array(v.weight).fill(i)).reduce((c, v) => c.concat(v), []);
    
        //Random select from probability array
        var pos = probability[Math.floor((Math.random() * probability.length))];

        return available_lootbox[pos]
    }
    
  }