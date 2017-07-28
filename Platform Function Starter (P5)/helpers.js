function initialize() {
    playerOne = new Player(55, 340, color(100, 0, 200), color(0, 0, 255));
    //playerTwo = new player(600, 100, color(0, 150, 100), color(255, 0, 255));
    //playerThree = new player(200, 400, color(100, 0, 200), color(0, 0, 255));

    // INITIALIZE BOUNDING BOXES FOR TERRAIN
    for (let i = 0; i < 30; i++) {
        terrainBounding.push([]);
        for (let j = 0; j < 40; j++) {
            terrainBounding[i].push("None");
        }
    }

    levelInit();
}

//initializes terrain
function levelInit() {
    terrainIndex = 0;
    terrainList = [];

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 40; j++) {
            terrainBounding[i][j] = "None";
        }
    }

    if (level == 1) {
        // INITIALIZE TERRAIN
        new TerrainObject("Spike");
        let spikes = new InitializationTiles(0, 29, 40, color(100, 50, 50), "Horizontal Spikes", "Spike");
        spikes.secondaryColour = color(60, 135, 155);
        currentTerrain.add(spikes);

        new TerrainObject("Platform");
        // adds a new TerrainTile to the TerrainObject at index 0
        currentTerrain.add(new InitializationTiles(1, 20, 5, color(100, 50, 50), "Horizontal Crates", "Crate"));
        currentTerrain.add(new InitializationTiles(5, 21, 2, color(100, 50, 50), "Vertical Crates", "Crate"));
    
        new TerrainObject("Platform");
        currentTerrain.add(new InitializationTiles(10, 20, 5, color(100, 50, 50), "Horizontal Crates", "Crate"));
        currentTerrain.add(new InitializationTiles(15, 17, 3, color(100, 50, 50), "Vertical Crates", "Crate"));
    } else {
        throw new Error("Level" + level + " does not exist");
    }
}

function drawGradient(x, y, colourOne, colourTwo, shape) {
    if (shape == "triangle") {
        for (let i = y; i < y + 20; i++) {
            let netY = i - y;
            // gradient values
            let interp = map(i, y, y + 20, 0.1, 0.75);
            stroke(lerpColor(colourOne, colourTwo, interp));
            strokeWeight(1);

            line((x + 10) - (netY / 2) + netY, i, (x + 10) + (netY / 2) - netY, i);
        }
        stroke("black");
        strokeWeight(0.5);
        line(x + 10, y, x + 20, y + 20);
        line(x + 10, y, x, y + 20);
        line(x, y + 20, x + 20, y + 20);
    } else {
        throw new Error(shape + ' is not a valid shape');
    }
}