class Vehicle {
    pos = createVector(random(10, width-10), random(10, height-10));
    acc = createVector(0, 0);
    vel = createVector(0, 0);

    maxForce = 0;

    scale = 1.5;

    health = 4;

    eaten = 0;
    fitness = 0;

    dna = {
        maxSpeed: random(3, 8)
    };

    maxHealth = this.dna.maxSpeed;

    constructor() {
        this.maxForce = (this.dna.maxSpeed/10)-0.25;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.dna.maxSpeed);

        this.pos.add(this.vel);

        this.acc.mult(0);

        this.health -= (this.dna.maxSpeed/200);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    seek(targetPos) {
        var desired = p5.Vector.sub(targetPos, this.pos);

        desired.setMag(this.dna.maxSpeed)

        var steer = desired.sub(this.vel);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    distSq2D(v1, v2) {
        return sq(v1.x - v2.x) + sq(v1.y - v2.y);
    }

    eat(list) {
        var closest = Infinity;
        var index = -1;

        for (let i = list.length-1; i > -1; i--) {
            var d = this.distSq2D(this.pos, list[i]);

            if (d < closest) {
                closest = d;
                index = i;
            }
        }

        const foodW = pow(10 * 0.7 + 1, 2)
        if (closest < foodW && this.health < this.maxHealth) {
            list.splice(index, 1);
            this.eaten += 1;
            this.health += 1;
        }
        else if (index > -1) {
            this.seek(list[index]);
        }
        else if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    show() {
        stroke(0);
        strokeWeight(1);

        var col = lerpColor(color(255, 0, 0), color(0, 0, 255), this.health);
        fill(col);

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI/2);

        const circleDiameter = 5 * this.scale;
        const circleRadius = circleDiameter / 2;
        const rectHeight = (13 * this.scale * (this.dna.maxSpeed * 2)) / 13;

        noStroke()
        ellipseMode(CENTER);
        ellipse(circleRadius, circleRadius, circleDiameter);
        rectMode(CORNERS);
        rect(0, circleRadius, circleDiameter, rectHeight);
        ellipse(circleRadius, rectHeight, circleDiameter)

        pop();
    }

    calcFitness() {
        this.fitness = int(this.eaten * this.health * 100);
        return this.fitness;
    }
}