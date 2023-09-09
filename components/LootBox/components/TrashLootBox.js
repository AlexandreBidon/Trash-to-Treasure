import { renderImage } from "../../../services/canvasUtils.js";
import TrashDrop from "./TrashDrop.js";
import { TrashLootType } from "../../../data/TrashLoot.js";

const rand = (m, M) => Math.round(Math.random() * (M - m) + m)


function selectTrashLoot(trashType, bonusDrop) {
        let TrashLootList = trashType.loot_list
        //Create a 4 element array based on probability weight
        var probability = TrashLootList.map((v, i) => Array(v.weight).fill(i)).reduce((c, v) => c.concat(v), []);

        let lootNumber = rand(trashType.min_loot, trashType.max_loot) + bonusDrop;

        let result = []

        for (let i = 0; i < lootNumber; i++) {
            result.push(TrashLootList[probability[Math.floor((Math.random() * probability.length))]])
        }
        return result
}

export default class TrashLootBox{
    constructor(dx, GameMoneyManager, dropList, InventoryManager, UpgradeManager) {
        this.angle = rand(0,1);
        this.speed = 0.01;
        this.dx = dx;
        this.dy = 0.3;
        this.baseScale = 0.6;
        this.maxScale = 0.64;
        this.scale = 0.6
        this.hovered = false;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.GameMoneyManager = GameMoneyManager;
        this.shakeDuration= 500
        this.drop_list = dropList
        this.to_drop = []
        this.shakeStartTime =-1
        this.opening = false;
        this.inventory = InventoryManager
        this.UpgradeManager = UpgradeManager
        this.trashType = 0

        this.opening_audio = new Audio('./sounds/trash_opening.mp3');
        this.opening_audio.volume = 0.2
        this.reset()
    }

    reset() {
        if (this.opening == false) {
            this.trashType = this.UpgradeManager.selectTrashType()
            this.price = Math.floor( rand(this.trashType.min_price,this.trashType.max_price) * this.UpgradeManager.TrashLootPriceMultiplier );
            this.name = this.trashType.owner[Math.floor((Math.random() * this.trashType.owner.length))] + "'s " + this.trashType.name
            this.trashcan_image = new Image();
            this.trashcan_image.src = this.trashType.img;
            this.light_image = new Image();
            this.light_image.src = this.trashType.light_img;
            this.opening = false;
            this.to_drop = []
        }
    }

    updateScale() {
        if (this.hovered) {
            this.scale = Math.min(this.maxScale, this.scale + 0.01)
        } else {
            this.scale = this.baseScale;
        }
    }

    animate(ctx) {
        this.updateScale()

        this.angle += this.speed;

        this.preShake(ctx)

        this.drawObject(ctx)


        this.postShake(ctx)

    }

    drawObject(ctx) {
        renderImage(ctx, this.light_image, this.dx, this.dy, this.angle, 0.8)
        let [x, y, width, height] = renderImage(ctx, this.trashcan_image, this.dx, this.dy, 0, this.scale)
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        ctx.font = 0.04 * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";
        ctx.fillText(this.name, ctx.canvas.width * this.dx, ctx.canvas.height * this.dy + this.height/2.1);

        ctx.font = 0.07 * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";
        ctx.fillText(this.price + "$", ctx.canvas.width * this.dx, ctx.canvas.height * this.dy + this.height/1.7);
    }

    isHovered(mouseX, mouseY) {
        if(mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
            this.hovered = true
        } else {
            this.hovered = false
        }
    }

    isClicked(mouseX, mouseY) {
        if(
            mouseX >= this.x && 
            mouseX <= this.x + this.width &&
            mouseY >= this.y && 
            mouseY <= this.y + this.height && 
            this.opening == false &&
            this.canBePurchased()) {
            this.openLootBox()
        }
    }

    canBePurchased() {
        if (this.GameMoneyManager.currentMoney >= this.price) {
            return true
        } else {
            return false
        }
    }

    openLootBox() {
        if ( this.opening == false) {
            this.GameMoneyManager.withdrawMoney(this.price)
            this.drawRandomLoot()
            this.startShake()
        }
    }

    preShake(ctx) {
        if (this.shakeStartTime ==-1) return;
        var dt = Date.now()-this.shakeStartTime;
        if (dt>this.shakeDuration) {
            this.shakeStartTime = -1; 
            return;
        }
        var easingCoef = Math.random() * dt / this.shakeDuration;
        var easing = Math.pow(easingCoef-1,3) +1;
        ctx.save();  
        var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
        var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
        ctx.translate(dx, dy);  
    }

    startShake() {
        this.opening = true
        this.opening_audio.pause()
        this.opening_audio.currentTime = 0
        this.opening_audio.play()
        this.shakeStartTime=Date.now();
    }

    postShake(ctx) {
        if (this.shakeStartTime ==-1) {
            if (this.opening) {
                this.to_drop.forEach((element) => this.drop_list.push(element))
                this.opening = false
                
                this.reset();
            }
            return};
        ctx.restore();

    }

    drawRandomLoot() {
        // Open the LootBox and return a random amount of loot (based on min and max)
        let lootResult = selectTrashLoot(this.trashType, this.UpgradeManager.TrashLootBonusDrop)
        for (const element of lootResult) {
            this.inventory.addItem(element)
            this.to_drop.push(new TrashDrop(this.dx,this.dy, element.img))
        }
    }
}
