class Food {
    foodPos = [];
    scale = 0.7;

    edgePadding = 10;

    constructor(num) {
        for (let i = 0; i < num; i++) {
            this.newFood();
            // this.foodPos.push(createVector(random(this.edgePadding, width-this.edgePadding), random(this.edgePadding, height-this.edgePadding)));
        }
    }

    newFood() {
        this.foodPos.push(createVector(random(this.edgePadding, width-this.edgePadding), random(this.edgePadding, height-this.edgePadding)));
    }

    show() {
        this.foodPos.forEach(pos => {
            stroke(0);
            strokeWeight(1);
            fill(0, 255, 0);
            ellipse(pos.x, pos.y, 10 * this.scale);
        });
    }

}