export default class Player {
    rightKey = false;
    leftKey = false;
    shootKey = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        console.log(this.x);
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = 'resources/player.png';

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        if (this.shootKey) {
            this.bulletController.shoot(this.x + this.width/2, this.y, 4, 10);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls() {
        // left
        if (this.x < 0) {
            this.x = 0;
        }

        // right
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    move() {
        if (this.rightKey) {
            this.x += this.velocity;
        } else if (this.leftKey) {
            this.x -= this.velocity;
        }
    }

    keydown = event => {
        if (event.code == 'ArrowRight') {
            this.rightKey = true;
        }

        if (event.code == 'ArrowLeft') {
            this.leftKey = true;
        }

        if (event.code == 'Space') {
            this.shootKey = true;
        }
    }

    keyup = event => {
        if (event.code == 'ArrowRight') {
            this.rightKey = false;
        }

        if (event.code == 'ArrowLeft') {
            this.leftKey = false;
        }

        if (event.code == 'Space') {
            this.shootKey = false;
        }
    }
}