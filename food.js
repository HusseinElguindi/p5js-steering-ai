class Food {
    foodPos = []
    scale = 0.7;

    constructor(num) {
        for (let i = 0; i < num; i++) {
            this.foodPos.push(createVector(random(10, width-10), random(10, height-10)));
        }
    }

    show() {
        this.foodPos.forEach(pos => {
            // noStroke();
            stroke(0);
            strokeWeight(1);
            fill(0, 255, 0);
            ellipse(pos.x, pos.y, 10*this.scale);
        });
    }

}