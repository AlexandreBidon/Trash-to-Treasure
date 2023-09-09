

export default class Inventory {

    constructor( inventory, selected) {
        this.inventoryList = inventory


        this.currentlySelected = selected

        this.currentLength = -1
        this.inventory_place = document.getElementById("inventory-place")
    }

    update() {
        if ( this.currentLength != this.inventoryList.length) {
            this.render()
            this.currentLength = this.inventoryList.length
        }
    }

    render() {
        let inventoryDiv = document.createElement('div');
        inventoryDiv.className = 'inventory';
    
        for (var i = 0; i < this.inventoryList.length; i++) {
            let itemDiv = document.createElement('div');
            itemDiv.className = "item";
            itemDiv.ItemId = i;
            let itemIcon = document.createElement('div');
            itemIcon.className = "item-icon";
            let itemNumber = document.createElement('div');
            itemNumber.className = "item-number";
            let itemIconImg = document.createElement('img');
            itemIconImg.src = this.inventoryList[i].img
            itemIconImg.draggable = false
            let itemIconTxt = document.createElement('div');
            itemIconTxt.innerHTML = this.inventoryList[i].name
            itemNumber.innerHTML = this.inventoryList[i].quantity

            itemIcon.appendChild(itemIconImg)
            itemIcon.appendChild(itemIconTxt)
            itemIcon.appendChild(itemNumber)
            itemDiv.appendChild(itemIcon);
            inventoryDiv.appendChild(itemDiv);
        }
    

        this.inventory_place.innerHTML = '';
        this.inventory_place.appendChild(inventoryDiv)
    }

    addItem(newItem) {
        for (let i=0; i < this.inventoryList.length; i++) {
            if ( this.inventoryList[i].name == newItem.name) {
                this.inventoryList[i].quantity += 1;
                this.render()
                return
            }
        }
        newItem.quantity = 1;
        this.inventoryList.push(newItem)
        this.render()
    }

    emptySelected() {
        this.currentlySelected = []
    }

    addSelected(index) {
        let selectedItem = {...this.inventoryList[index]}
        delete selectedItem['quantity']
        this.currentlySelected.push(selectedItem)
        
        if (this.inventoryList[index].quantity > 1) {
            this.inventoryList[index].quantity -= 1
        } else {
            this.inventoryList.splice(index, 1)
        }
        this.render()
        return(selectedItem)
    }

    removeSelected(index) {
        this.addItem(this.currentlySelected[index])
        this.currentlySelected.splice(index, 1)
        this.render()
    }
}