//player information
class Player {
    constructor(x, y, outerColour, innerColour) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.outSize = 17;
        this.inSize = 6;
        this.outColour = outerColour;
        this.inColour = innerColour;
        // Movement variables
        this.keys = {
            right: RIGHT_ARROW,
            left: LEFT_ARROW,
            up: UP_ARROW,
            down: DOWN_ARROW
        };
        this.grounded = false;
        this.sided = false;
        this.speed = 2;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.jumpVelocity = 12;
        this.gravity = 3;
        players.push(this);
    }

    logic() {
        // Player Logic
        // Checking for pressed keys
        if (keyIsDown(this.keys.right)) {
            this.velocity.x += this.speed;
        }

        if (keyIsDown(this.keys.left)) {
            this.velocity.x -= this.speed;
        }

        this.velocity.y -= 0.9;
        
        //checks if gravity should be applying
        let hasHitGround = false;
        let hasHitSide = false;
        for (let i = 0; i < terrainList.length; i++) {
            let collision;
            // is the player going to hit the ground?
            if (this.grounded && hasHitGround == false) {
                //bottom right
                collision = this.isCollidingObj(this.x + this.outSize, this.y + this.outSize - this.velocity.y, terrainList[i]);
                if (collision.didCollide)
                    hasHitGround = true;

                // bottom left
                collision = this.isCollidingObj(this.x, this.y + this.outSize - this.velocity.y, terrainList[i]);
                if (collision.didCollide)
                    hasHitGround = true;
            }

            // is the player going to hit the edge?
            if (this.sided && this.velocity.x > 0 && hasHitSide == false) {
                //bottom right
                collision = this.isCollidingObj(this.x + this.outSize + this.velocity.x, this.y + this.outSize, terrainList[i]);
                if (collision.didCollide)
                    hasHitSide = true;

                //top right
                collision = this.isCollidingObj(this.x + this.outSize + this.velocity.x, this.y, terrainList[i]);
                if (collision.didCollide)
                    hasHitSide = true;
            }
            if (this.sided && this.velocity.x < 0 && hasHitSide == false) {
                //bottom left
                collision = this.isCollidingObj(this.x + this.velocity.x, this.y + this.outSize, terrainList[i]);
                if (collision.didCollide)
                    hasHitSide = true;
                //top left
                collision = this.isCollidingObj(this.x + this.velocity.x, this.y, terrainList[i]);
                if (collision.didCollide)
                    hasHitSide = true;
            }
            if (hasHitGround && hasHitSide)
                break;
        }

        
        if (hasHitGround)
            this.grounded = true;
        else
            this.grounded = false;

        if (hasHitSide)
            this.sided = true;
        else
            this.sided = false;

        //set velocities
        if (this.grounded)
            this.velocity.y = 0;
        else {
            this.y -= this.velocity.y;
        }

        if (this.sided)
            this.velocity.x = 0;
        else
            this.x += this.velocity.x;

        //jumping and acceleration
        if (this.grounded) {
            if (keyIsDown(this.keys.up)) {
                this.grounded = false;
                this.velocity.y += this.jumpVelocity
            }
        }

        // Checking for collision
        for (let i = 0; i < terrainList.length; i++) {
            // bottom right
            let collision = this.isCollidingObj(this.x + this.outSize, this.y + this.outSize, terrainList[i]);
            if (collision.didCollide) {
                // Uncollide
                this.handleCollision(this.x + this.outSize, this.y + this.outSize, terrainList[i]);
            }

            // bottom left    
            collision = this.isCollidingObj(this.x, this.y + this.outSize, terrainList[i]);
            if (collision.didCollide) {
                // Uncollide
                this.handleCollision(this.x, this.y + this.outSize, terrainList[i]);
            }

            // top right    
            collision = this.isCollidingObj(this.x + this.outSize, this.y, terrainList[i]);
            if (collision.didCollide) {
                // Uncollide
                this.handleCollision(this.x + this.outSize, this.y, terrainList[i]);
            }

            // top left   
            collision = this.isCollidingObj(this.x, this.y, terrainList[i]);
            if (collision.didCollide) {
                // Uncollide
                this.handleCollision(this.x, this.y, terrainList[i]);
            }
        }

        // Player Movement
        this.velocity.x *= 0.5; // limits to ~4
        //debug
        //this.velocity.x *= 0.95;
        this.velocity.y *= 0.94; // limits to -14.1

        if (abs(this.velocity.x) < 0.0001)
            this.velocity.x = 0;
        if (abs(this.velocity.y) < 0.0001)
            this.velocity.y = 0;
    }

    //collision with terrain block
    isCollidingObj(x, y, terrainItem) {
        let t;
        for (let i = 0; i < terrainItem.tileArray.length; i++) {
            t = terrainItem.tileArray[i];
            if (this.isCollidingTile(x, y, t, terrainItem.terrainType))
                return {
                    didCollide: true,
                    terrainTile: t
                };
        }
        return {
            didCollide: false,
            terrainTile: null
        };
    }

    //collision with terrain tile
    isCollidingTile(x, y, t, terrainType) {
        if (terrainType == "Platform") {
            if (x >= t.x && x <= t.x + 20 && y >= t.y && y <= t.y + 20)
                return true;
            else
                return false;
        } else if (terrainType == "Spike") {
            if (x >= t.x && x <= t.x + 20 && y >= t.y && y <= t.y + 20)
                return true;
            else
                return false;
        }
    }

    //gets rid of collision on collision
    handleCollision(x, y, tObj) {
        if (tObj.terrainType == "Platform") {
            let initialYVel = this.velocity.y;
            let initialXVel = this.velocity.x;
            let xOffset = x - this.x;
            let yOffset = y - this.y;

            let previousCollision;

            for (let i = 0; i < 101; i++) {
                let collision = this.isCollidingObj(x, y, tObj);
                if (tObj.tileArray.length == 5)
                    console.log("hitting p2");

                if (collision.didCollide) {
                    previousCollision = collision.terrainTile;
                    x -= this.velocity.x / 100;
                    y += this.velocity.y / 100;

                    this.x = x - xOffset;
                    this.y = y - yOffset;

                    if (i == 100)
                        console.log("this should not happen");
                } else {

                    // floor detection exception

                    let t = previousCollision;
                    if (yOffset > 0 && initialYVel < 0 && y < t.y && x >= t.x && x <= t.x + 20) {
                        for (let collisionOffset = 1; collisionOffset > 0; collisionOffset -= 0.01) {
                            collision = this.isCollidingObj(x + this.velocity.x * collisionOffset, y, tObj);
                            if (!collision.didCollide) {
                                this.grounded = true;
                                this.velocity.y = 0;
                                x += this.velocity.x * collisionOffset;
                                this.x = x - xOffset;
                                break;
                            }
                        }

                        // ceiling detection exception
                    } else if (yOffset == 0 && initialYVel > 0 && y > t.y + 20 && x >= t.x && x <= t.x + 20) {
                        this.velocity.y = 0;

                        // right of character wall detection exception
                    } else if (xOffset > 0 && initialXVel > 0 && y >= t.y && y <= t.y + 20 && x < t.x) {
                        this.sided = true;
                        this.velocity.x = 0;
                        y -= this.velocity.y;
                        this.y = y - yOffset;

                        // left of character wall detection exception
                    } else if (xOffset == 0 && initialXVel < 0 && y >= t.y && y <= t.y + 20 && x > t.x + 20) {
                        this.sided = true;
                        this.velocity.x = 0;
                        y -= this.velocity.y;
                        this.y = y - yOffset;
                    }
                    break;
                }
            }
        } else if (tObj.terrainType == "Spike") {
            this.resetPlayer();
        }
    }

    draw() {
        // OUTER PLAYER
        //noStroke();

        stroke(0);
        strokeWeight(0.05);
        fill(this.outColour);
        rect(this.x, this.y, this.outSize, this.outSize);

        // INNER PLAYER
        fill(this.inColour);
        rect(this.x + (this.outSize - this.inSize) / 2, this.y + (this.outSize - this.inSize) / 2, this.inSize, this.inSize);
    }

    resetPlayer() {
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}
