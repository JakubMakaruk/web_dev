import Bullet from "./bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtTime, bulletColor) {
        this.canvas = canvas;
        this.maxBulletsAtTime = maxBulletsAtTime;
        this.bulletColor = bulletColor;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height) 

        console.log(this.bullets.length);
        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex(bullet => bullet.collideWith(sprite));

        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (this.timeTillNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtTime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }

}