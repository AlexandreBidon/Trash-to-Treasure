

export default class Create{
    constructor(dx, dy, circle) {
        this.dx = dx;
        this.dy = dy;
        this.circle = circle;
        this.hovered = false
        this.baseScale = 0.08
        this.maxScale = 0.09
        this.textWidth = 0;
        this.textHeight = 0;
    }

    updateScale() {
        if (this.hovered) {
            this.scale = this.maxScale;
        } else {
            this.scale = this.baseScale;
        }
    }

    animate(ctx) {
        if (!this.circle.crafting) {
            this.updateScale()

            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.font = this.scale * Math.min ( window.innerHeight, window.innerWidth ) + "px Pretty Pastel";
    
            ctx.fillText("Create", ctx.canvas.width * this.dx, ctx.canvas.height * this.dy);
    
            var textMetrics = ctx.measureText("Create")
            this.textWidth = textMetrics.width;
            this.textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        }
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

    craftArt() {
        this.circle.craft()
    }

    isClicked(mouseX, mouseY, ctx) {
        if(
            mouseX >= ctx.canvas.width * this.dx - this.textWidth/2 && 
            mouseX <= ctx.canvas.width * this.dx + this.textWidth/2 &&
            mouseY >= ctx.canvas.height * this.dy - this.textHeight/2 &&
            mouseY <= ctx.canvas.height * this.dy + this.textHeight/2 &&
            !this.circle.crafting) {
            this.craftArt()
        }
    }
}