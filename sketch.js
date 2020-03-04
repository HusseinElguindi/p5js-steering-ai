function setup() {
    frameRate(60);
    createCanvas(800, 600);

    foodChance = 0.2

    stableFood = true;
    foodLevel = 50;

    food = new Food(300);
    population = new Population(100);

    population.reproduceRate = 0.1;
    population.mutationRate = 0.25;
}

function draw() {
    background(240);

    if (this.stableFood && this.food.foodPos.length < this.foodLevel) {
        for (let i = 0; i < (this.foodLevel-this.food.foodPos.length); i++) {
            this.food.foodPos.push(createVector(random(10, width-10), random(10, height-10)));
        }
    } 
    else if (!this.stableFood) {
        newFood();
    }
    
    this.food.show();

    reproduce();
    updatePop();

    stats();
}

function stats() {
    stroke(255);
    strokeWeight(2);
    fill(0);
    textSize(20);
    textAlign(LEFT, BOTTOM);
    text(`Vehicles: ${this.population.members.length}\nFood: ${this.food.foodPos.length}`, 10, -35, width, height);    

    var dict = {};
    for (let i = 0; i < population.members.length; i++) {
        let x = str(int(population.members[i].dna.maxSpeed));
        if (dict[x] === undefined) {
            dict[x] = 1;
        }
        else {
            dict[x] += 1;
        }
    }

    var statStr = "";
    for (let i = 0; i < Object.keys(dict).length; i++) {
        let x = Object.keys(dict)[i];
        statStr = statStr.concat(`${x}: ${dict[x]}\n`);
    }

    textAlign(LEFT, TOP);
    text(statStr, 10, 10, width, height);
}


function updatePop() {
    for (let i = this.population.members.length-1; i > -1; i--) {
        let vehicle = this.population.members[i];

        vehicle.eat(this.food.foodPos);
        // vehicle.seek(createVector(mouseX, mouseY));
        vehicle.update();
        vehicle.show();

        if (vehicle.health <= 0) {
            this.population.members.splice(i, 1);
            this.food.foodPos.push(createVector(vehicle.pos.x,vehicle.pos.y));
        }
    }
}

function reproduce() {
    if (random(1) < this.population.reproduceRate){
        this.population.calcFitness();
    }
}

function newFood() {
    if (random(1) < this.foodChance) {
        this.food.foodPos.push(createVector(random(10, width-10), random(10, height-10)));
    }
}

function mouseDragged() {
    this.food.foodPos.push(createVector(mouseX, mouseY));
}