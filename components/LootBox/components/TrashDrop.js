import { renderImage } from "../../../services/canvasUtils.js";

const rand = (m, M) => Math.random() * (M - m) + m

export default class TrashDrop{
    constructor(start_dx, start_dy, imgSrc) {
        this.dx = start_dx;
        this.dy = start_dy;
        this.scale = 0.33
        this.speed = rand(0.001, 0.003);
        this.acceleration = rand(0.0002, 0.0004);
        this.angle_direction =  rand( 0, Math.PI * 2) // rand(-Math.PI/4, Math.PI/4)
        this.angle = rand(0, 3)

        this.image = new Image();
        this.image.src = imgSrc;
    }

    move(ctx) {
        this.speed += this.acceleration
        this.angle += 0.1

        var vx = this.speed * Math.cos(this.angle_direction-(Math.PI/2));
        var vy = this.speed * Math.sin(this.angle_direction-(Math.PI/2));

        this.dx += vx;
        this.dy += vy; 

        renderImage(ctx, this.image, this.dx, this.dy, this.angle, this.scale)
    }
}