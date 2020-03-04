class Vehicle {
    pos = createVector(random(10, width-10), random(10, height-10));
    acc = createVector(0, 0);
    vel = createVector(0, 0);

    // maxSpeed = random(2, 10);
    maxForce = 0;

    scale = 0.5;

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
        // if (this.maxHealth != this.dna.maxSpeed) {
        //     print("SOMETHING IS WRONG");
        //     // this.maxHealth = this.dna.maxSpeed;
        // }
        // print(`${this.maxHealth} - ${this.health} - ${this.dna.maxSpeed}`);
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

    eat(list) {
        var closest = Infinity;
        var index = -1;

        for (let i = list.length-1; i > -1; i--) {
            var d = p5.Vector.dist(this.pos, list[i]);

            if (d < closest) {
                closest = d;
                index = i;
            }
        }
        
        if (closest < 10 && this.health < this.maxHealth) {
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
        triangle(0, 0, (-15*this.scale), (40*this.scale), (15*this.scale), (40*this.scale));
        pop();
    }

    calcFitness() {
        this.fitness = int(this.eaten*this.health*100);
        return this.fitness;
    }
}