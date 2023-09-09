

export default class BuyAll{
    constructor(dx, dy, GameMoneyManager, TrashList) {
        this.dx = dx;
        this.dy = dy;
        this.GameMoneyManager = GameMoneyManager;
        this.TrashList = TrashList
        this.hovered = false
        this.baseScale = 0.08
        this.maxScale = 0.09
        this.textWidth = 0;
        this.textHeight = 0;
        this.price = 0
    }

    updateScale() {
        if (this.hovered) {
            this.scale = this.maxScale;
        } else {
            this.scale = this.baseScale;
        }
    }

    animate(ctx) {
        this.updateScale()

        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = this.scale * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";

        this.price = this.TrashList.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
        ctx.fillText("Buy all - " + this.price + "$", ctx.canvas.width * this.dx, ctx.canvas.height * this.dy);

        var textMetrics = ctx.measureText("Buy all - " + this.price + "$")
        this.textWidth = textMetrics.width;
        this.textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    }

    isHovered(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy - this.textHeight/2 &&
            mouseY <= ctx.canvas.height * this.dy + this.textHeight/2) {
            this.hovered = true
        } else {
            this.hovered = false
        }
    }

    canBePurchased() {
        if (this.GameMoneyManager.currentMoney >= this.price) {
            return true
        } else {
            return false
        }
    }

    PurchaseAll() {
        this.TrashList.forEach(element => { element.openLootBox() })
    }

    isClicked(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy - this.textHeight/2 &&
            mouseY <= ctx.canvas.height * this.dy + this.textHeight/2 &&
            this.canBePurchased()) {
            this.PurchaseAll()
        }
    }
}