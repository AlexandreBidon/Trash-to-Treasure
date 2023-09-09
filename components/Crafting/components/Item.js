const rand = (m, M) => Math.random() * (M - m) + m

export default class Item {

    constructor(dx_center, dy_center, radius, imgSrc) {
        this.dx_center = dx_center;
        this.dy_center = dy_center;
        this.radius = radius;
        this.baseScale = 0.15;
        this.maxScale = 0.2
        this.scale = this.baseScale;
        this.img = new Image()
        this.img.src = imgSrc;
        this.currentAngle = 0
        this.hovered = false
        this.centerX = 0
        this.centerY = 0
    }

    updateScale() {
        if (this.hovered) {
            this.scale = Math.min(this.maxScale, this.scale + 0.01)
        } else {
            this.scale = Math.max(this.baseScale, this.scale - 0.01)
        }
    }

    animate(ctx, angle) {
        this.currentAngle = angle
        this.isHovered()
        this.updateScale()

        var canvas = ctx.canvas ;
        var hRatio = canvas.width  / this.img.width    ;
        var vRatio =  canvas.height / this.img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
    
        var centerX = this.img.width * ratio * this.scale / 2.0;
        var centerY = this.img.height * ratio * this.scale / 2.0;

        ctx.save()

        ctx.translate(  this.dx_center * canvas.width, this.dy_center * canvas.height);

        ctx.rotate( angle );

        ctx.translate( 0, this.radius * Math.min(canvas.width, canvas.height) )

        ctx.drawImage( this.img, -centerX, -centerY, this.img.width * ratio * this.scale, this.img.height * ratio * this.scale );

        ctx.restore();
    }

    isHovered() {
        if  ( 
            this.radius - this.scale / 2  <= this.mouseRadius &&
            this.mouseRadius <= this.radius + this.scale / 2 &&
            this.mouseAngle <= this.currentAngle % (2*Math.PI) + 0.32 &&
            this.mouseAngle >= this.currentAngle % (2*Math.PI) - 0.32) {
            this.hovered = true
        } else {
            this.hovered = false
        }
    }

    updateMousePosition(mouseX, mouseY, ctx) {
        var mouseXleft = mouseX - this.dx_center * ctx.canvas.width
        var mouseYleft = mouseY - this.dy_center * ctx.canvas.height
        this.mouseRadius = Math.sqrt( Math.pow(mouseXleft, 2) + Math.pow(mouseYleft, 2)) / Math.min(ctx.canvas.width, ctx.canvas.height)
        this.mouseAngle = Math.atan(mouseXleft/mouseYleft)
        if (mouseXleft <= 0 && mouseYleft >= 0) {
            this.mouseAngle = - this.mouseAngle
        }
        if (mouseXleft <= 0 && mouseYleft <= 0) {
            this.mouseAngle = Math.PI - this.mouseAngle
        }
        if (mouseXleft >= 0 && mouseYleft <= 0) {
            this.mouseAngle =  Math.PI - this.mouseAngle
        }
        if (mouseXleft >= 0 && mouseYleft >= 0) {
            this.mouseAngle = 2 * Math.PI - this.mouseAngle
        }
    }

    isClicked() {
        if  ( 
            this.radius - this.scale / 2  <= this.mouseRadius &&
            this.mouseRadius <= this.radius + this.scale / 2 &&
            this.mouseAngle <= this.currentAngle % (2*Math.PI) + 0.32 &&
            this.mouseAngle >= this.currentAngle % (2*Math.PI) - 0.32 ) {
            return true
        } else {
            return false
        } 
    }

    updateRadius( newRadius) {
        this.radius = newRadius
    }

}