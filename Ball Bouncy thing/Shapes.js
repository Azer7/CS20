class Rectangle {
    constructor(x, y, width, height, speed, amount) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(speed, 0).rotateBy(random(0, Math.PI * 2));
        this.w = width;
        this.h = height;

        this.color = color(random(0, 255), random(0, 255), random(0, 255));
        this.circles = [];

        for (let i = 0; i < amount; i++)
            this.circles.push(new Circle(this.pos.x + this.w / 2, this.pos.y + this.h / 2, 1 , this.color, this));
    }

    update() {
        this.pos.add(this.vel);
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].pos.add(this.vel);
            this.circles[i].update();
        }

        if (this.pos.x < 0 || this.pos.x + this.w > width)
            this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y + this.h > height)
            this.vel.y *= -1;
    }

    draw() {
        noFill();
        strokeWeight(5);
        stroke(this.color);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].draw();
        }
    }
}

class Circle {
    constructor(x, y, speed, color, rectPointer) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(speed, 0).rotateBy(random(0, Math.PI * 2));
        this.size = random(4, 10);

        this.isInside = true;

        this.color = color;

        this.linkedRect = rectPointer;
    }

    update() {
        this.pos.add(this.vel);

        if (this.isInside) {
            if(this.pos.x < this.linkedRect.pos.x || this.pos.x > this.linkedRect.pos.x + this.linkedRect.w)
                this.vel.x *= -1;
            if(this.pos.y < this.linkedRect.pos.y || this.pos.y > this.linkedRect.pos.y + this.linkedRect.w)
                this.vel.y *= -1;
        } else {
             if(this.pos.x < 0 || this.pos.x > width || this.pos.x > this.linkedRect.pos.x || this.pos.x < this.linkedRect.pos.x + this.linkedRect.w)
                this.vel.x *= -1;
            if(this.pos.y < 0 || this.pos.y > width || this.pos.y > this.linkedRect.pos.y || this.pos.y < this.linkedRect.pos.y + this.linkedRect.w)
                this.vel.y *= -1;
        }
    }

    draw() {
        strokeWeight(.5);
        stroke(0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}
