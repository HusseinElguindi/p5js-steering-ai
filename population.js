class Population {
    members = []
    reproduceRate = 0;
    mutationRate = 0;

    constructor(size) {
        for (let i = 0; i < size; i++) {
            this.members.push(new Vehicle());
        }
    }

    calcFitness() {
        var scores = [];
    
        for (let i = 0; i < this.members.length; i++) {
            scores.push(this.members[i].calcFitness());
        }

        scores.sort((a,b)=>b-a);
        
        // randomness
        var rand = random(1);
        if (rand <= 0.4) {
            this.reproduce(this.members[0].dna);
            // print("0.4");
        }
        else if (rand <= 0.7) {
            this.reproduce(this.members[1].dna);
            // print("0.7");
        }
        else if (rand <= 0.9) {
            this.reproduce(this.members[2].dna);
            // print("0.9");
        }
        else if (rand <= 1) {
            this.reproduce(this.members[int(random(this.members.length))].dna);
            // print("1");
        }
    }

    reproduce(dna) {
        var v = new Vehicle();
        
        // pass on genes (DNA)
        if (random(1) > this.mutationRate) {
            v.dna = dna;
            v.maxHealth = v.dna.maxSpeed;
            v.maxForce = (v.dna.maxSpeed/10)-0.25;
        }

        // print(`${v.dna.maxSpeed} - ${dna.maxSpeed}`);
        this.members.push(v);
    }
}
