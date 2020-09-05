import Phaser from 'phaser';

export default class GameScreen extends Phaser.Scene {

    init() {
        this.padleRightVelocity = new Phaser.Math.Vector2(0, 0);
    }

    preload() {

    }

    create() {
        // const text = this.add.text(400, 300, 'The Game');
        // text.setOrigin(0.5, 0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        // ball
        this.ball = this.add.circle(400, 300, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);


        const vX = Phaser.Math.Between(200, 100);
        const vY = Phaser.Math.Between(200, 100);

        // ball.body.setVelocity(-200, 0);
        this.ball.body.setVelocity(vX, vY);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true, 1, 1);

        // paddleLeft
        this.paddleLeft = this.add.rectangle(30, 300, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);
        this.physics.add.collider(this.paddleLeft, this.ball);

        // paddleRight
        this.paddleRight = this.add.rectangle(750, 300, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);
        this.physics.add.collider(this.paddleRight, this.ball);


    }

    update() {
        if (this.cursors.up.isDown) {
            // console.log('up pressed');
            this.paddleLeft.y -= 5;
            this.paddleLeft.body.updateFromGameObject();
        } else if (this.cursors.down.isDown) {
            // console.log('down pressed');
            this.paddleLeft.y += 5;
            this.paddleLeft.body.updateFromGameObject();
        }


        const diff = this.ball.y - this.paddleRight.y;
        if (Math.abs(diff) < 30) {
            return;
        }

        const aiSpeed = 1;
        if (diff < 0) {
            this.padleRightVelocity.y += -aiSpeed;
            if (this.padleRightVelocity.y < -10) {
                this.padleRightVelocity.y = -10;
            }
        } else if (diff > 0) {
            this.padleRightVelocity.y += aiSpeed;
            if (this.padleRightVelocity.y > 10) {
                this.padleRightVelocity.y = 10;
            }
        }

        console.log(this.padleRightVelocity);

        this.paddleRight.y += this.padleRightVelocity.y;
        this.paddleRight.body.updateFromGameObject();
    }
}
