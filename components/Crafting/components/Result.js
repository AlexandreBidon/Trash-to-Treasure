import { renderImage } from "../../../services/canvasUtils.js";

export default class Result{
    constructor(dx, dy, circle) {
        this.dx = dx;
        this.dy = dy;
        this.circle = circle;
        this.hovered = false
        this.baseScale = 0.08
        this.maxScale = 0.09
        this.textWidth = 0;
        this.textHeight = 0;
        this.shown = false
        this.name = ""
        this.price = 0
        this.image = new Image();
        this.image.src = ""
        this.imgHeight = 0
    }

    reset(imgSrc, name, price) {
        this.name = name
        this.price = price
        this.image.src = imgSrc
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
        
        let [x, y, width, height] = renderImage(ctx, this.image, this.dx, this.dy, 0, 0.6)
        this.imgHeight = height

        ctx.font = 0.05 * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";

        ctx.fillText(this.name , ctx.canvas.width * this.dx, ctx.canvas.height * this.dy + this.imgHeight/2.8);

        var textMetrics = ctx.measureText(this.name)
        this.nameTextWidth = textMetrics.width;
        this.nameTextHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;     

        ctx.font = this.scale * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";

        ctx.fillText("Sell - " + this.price + "$" , ctx.canvas.width * this.dx, ctx.canvas.height * this.dy + this.imgHeight/2 +  this.nameTextHeight);

        var textMetrics = ctx.measureText("Sell - " + this.price + "$")
        this.textWidth = textMetrics.width;
        this.textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    }

    isHovered(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy + this.imgHeight/2 +  this.nameTextHeight - this.textHeight/2 &&
            mouseY <= ctx.canvas.height * this.dy + this.imgHeight/2 +  this.nameTextHeight + this.textHeight/2) {
            this.hovered = true
        } else {
            this.hovered = false
        }
    }

    SellPrize() {
        this.circle.inventory.emptySelected()
        this.circle.sell(this.price)
    }

    isClicked(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy + this.imgHeight/2 +  this.nameTextHeight - this.textHeight/2  &&
            mouseY <= ctx.canvas.height * this.dy + this.imgHeight/2 +  this.nameTextHeight + this.textHeight/2) {
            this.SellPrize()
        }
    }
}