let terrainIndex;
let currentTerrain;

//scaleable terrain object to group tiles into collision areas
class TerrainObject {
	constructor(terrainType) {
		this.terrainType = terrainType;
		this.tileArray = [];
		terrainList.push(this);
		currentTerrain = terrainList[terrainIndex];
		terrainIndex++;
	}

	// ADDS OBJECTS TO ARRAY / INITIALIZES THE TILES
	add(tObj) {
		if (tObj.initType == "Horizontal Crates") {
			for (let i = 0; i < tObj.repeated; i++) {
				this.tileArray.push(new BaseTile(tObj.xTile + i, tObj.yTile, tObj.fillColour, tObj.baseType));
				terrainBounding[tObj.yTile][tObj.xTile + i] = "Platform";
			}
		} else if (tObj.initType == "Vertical Crates") {
			for (let i = 0; i < tObj.repeated; i++) {
				this.tileArray.push(new BaseTile(tObj.xTile, tObj.yTile + i, tObj.fillColour, tObj.baseType));
				terrainBounding[tObj.yTile + i][tObj.xTile] = "Platform";
			}
		} else if (tObj.initType == "Horizontal Spikes") {
			for (let i = 0; i < tObj.repeated; i++) {
				this.tileArray.push(new BaseTile(tObj.xTile + i, tObj.yTile, tObj.fillColour, tObj.baseType));
				this.tileArray[this.tileArray.length - 1].secondaryColour = tObj.secondaryColour;
				terrainBounding[tObj.yTile][tObj.xTile + i] = "Spike";
			}
		} else {
			throw new Error(tObj.initType + " is not a valid terrain initializer name");
		}
	}

    //draws the baseTiles
	draw() {
		for (let tileIndex = 0; tileIndex < this.tileArray.length; tileIndex++) {
			let cTile = this.tileArray[tileIndex]; // tile object

			if (cTile.tileType == "Crate") { // draw platform
				fill(cTile.fillColour);
				strokeWeight(1.5);
				stroke(0, 0, 0);
				rect(cTile.x, cTile.y, 20, 20, 4);

				line(cTile.x + 2, cTile.y + 2, cTile.x + 18, cTile.y + 18);
				line(cTile.x + 18, cTile.y + 2, cTile.x + 2, cTile.y + 18);
				terrainBounding[cTile.yTile][cTile.xTile] = "Platform";

			} else if (cTile.tileType == "Spike") { // draw spike
				drawGradient(cTile.x, cTile.y, cTile.fillColour, cTile.secondaryColour, "triangle");
				terrainBounding[cTile.yTile][cTile.xTile] = "Spike";

			} else if (cTile.tileType == "Circle") { // draw circle
				this.repeated.w = this.repeatedAmount;
				this.repeated.h = 1;

				let pos;
				for (let i = 0; i < this.repeated.w; i++) {
					pos = this.x + 20 * this.repeated.w;
					fill(this.fillColour);
					stroke(0, 0, 0);
					strokeWeight(0.8);
					ellipse(pos + 10, this.y + 10, 20);
				}
			} else if (this.tileType == "Cloud") { // draw cloud
				this.repeated.w = this.repeatedAmount;
				this.repeated.h = 1;

				fill(this.fillColour);
				stroke(0, 0, 0);
				strokeWeight(0.5);

				rect(this.x, this.y, 20 * this.repeated.w, 20, 15);

			} else if (this.tileType == "Ladder") { // draw ladder
				this.repeated.w = 1;
				this.repeated.h = this.repeatedAmount;

				stroke(this.fillColour);
				strokeWeight(4);
				line(this.x + 2, this.y + 2, this.x + 2, this.y + 20 * this.repeated.h - 2);
				line(this.x + 18, this.y + 2, this.x + 18, this.y + 20 * this.repeated.h - 2);

				strokeWeight(2);
				for (let i = 0; i < this.repeated.h * 2; i++) {
					line(this.x + 2, this.y + 10 * i + 5, this.x + 18, this.y + 10 * i + 5);
				}
			} else {
				throw new Error(cTile.tileType + ' is not a valid terrain type');
			}
		}
	}
}

//basic tile
class BaseTile {
	constructor(x, y, fillColour, tileType) {
		this.xTile = x;
		this.yTile = y;
		this.x = x * 20;
		this.y = y * 20;
		this.fillColour = fillColour;
		this.secondaryColour = color(0, 0, 0);
		this.tileType = tileType;
	}
}

//class that repeats the certain tile
class InitializationTiles extends BaseTile {
	constructor(x, y, repeated, fillColour, initializationType, basicType) {
		// call base tile constructor
		super(x, y, fillColour, basicType);

		this.repeated = repeated;
		this.initType = initializationType;
		this.baseType = basicType;
	}
}