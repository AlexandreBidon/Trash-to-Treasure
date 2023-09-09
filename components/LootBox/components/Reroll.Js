

export default class Reroll{
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
        this.price = 50
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
        ctx.font = this.scale * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";

        
        ctx.fillText("Reroll - " + this.price + "$", ctx.canvas.width * this.dx, ctx.canvas.height * this.dy);

        var textMetrics = ctx.measureText("Reroll - " + this.price + "$")
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

    ResetAll() {
        this.TrashList.forEach(element => { element.reset() })
    }

    isClicked(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy - this.textHeight/2 &&
            mouseY <= ctx.canvas.height * this.dy + this.textHeight/2 &&
            this.canBePurchased()) {
            this.ResetAll()
            this.GameMoneyManager.withdrawMoney(this.price)
        }
    }
}