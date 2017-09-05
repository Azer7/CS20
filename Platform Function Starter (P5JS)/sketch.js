// PLATFORMER
let playerOne;
let playerTwo;
let playerThree;
let players = [];
let terrainList = [];
let terrainBounding = [];

let level = 1;

// DEBUG VARIABLES
let gridSize;

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(800, 600);
    
    gridSize = width / 40;
    frameRate(60);
	// initialize player object
    initialize();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    background(210, 255, 255);

    // UPDATE TERRAIN
	for (let i = 0; i < terrainList.length; i++) 
		terrainList[i].draw();
    
	// UPDATE PLAYERS
	for (let i = 0; i < players.length; i++) {
        players[i].logic();
        players[i].draw();   
    }

    // DEBUG GRID
	//drawGridDebug();
    //drawTerrainDebug();
}

function drawGridDebug() {
    stroke(62, 125, 55, 70);
    strokeWeight(gridSize / 20);
    //debug grid
    //horizontal lines
    for (var i = 0; i < 31; i++) {
        line(0, gridSize * i, width, gridSize * i);
        line(0, gridSize * i - 1, width, gridSize * i - 1);
    }

    //vertical lines
    for (var i = 0; i < 41; i++) {
        line(gridSize * i, 0, gridSize * i, height);
        line(gridSize * i - 1, 0, gridSize * i - 1, height);
    }
    //box dots
    for (var i = 0; i < 30; i++) {
        for (var y = 0; y < 40; y++) {
            if (i % 2 == 0) {
                if (y % 2 == 0)
                    stroke(255, 0, 100);
                else
                    stroke(0, 255, 200);
            } else {
                if (y % 2 != 0)
                    stroke(255, 0, 100);
                else
                    stroke(0, 255, 200);
            }

            point(y * gridSize, i * gridSize);
            point(y * gridSize, (i + 1) * gridSize - 1);
            point((y + 1) * gridSize - 1, i * gridSize);
            point((y + 1) * gridSize - 1, (i + 1) * gridSize - 1);
        }
    }
}

function drawTerrainDebug() { // work in progress, does not do anything
    noStroke();
    fill(255, 0, 100, 100);
    for (let i = 0; i < terrainBounding.length; i++) {
        for (let y = 0; y < terrainBounding[i].length; y++) {
            if (terrainBounding[i][y] != "None") {
                rect(y * 20, i * 20, 20, 20);
            }
        }
    }

}
