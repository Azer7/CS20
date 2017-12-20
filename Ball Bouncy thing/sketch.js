let rectangles = [];

function setup() {
    createCanvas(1080, 720);

    for (let i = 0; i < 5; i++) {
        rectangles.push(new Rectangle(random(0, width - 200), random(0, height - 200), 200, 200, 1, 100));
    }
}

function draw() {
    background("grey");
    for (let i = 0; i < rectangles.length; i++) {
        rectangles[i].update();
        rectangles[i].draw();
    }
}
