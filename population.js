class Population {
    members = []
    mutationRate = 0.1

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

        scores.sort((a, b) => b - a);

        // randomness
        if (random(1) <= this.mutationRate) {
            this.members.push(new Vehicle);
        }
        else {
            let rand = random(1);
            let dnaInd = 0;

            if (rand <= 0.75) {
                dnaInd = 0;
            }
            else if (rand <= 0.9) {
                dnaInd = 1;
            }
            else if (rand <= 1) {
                dnaInd = 2;
            }

            dnaInd = min(dnaInd, this.members.length-1);
            this.reproduce(this.members[dnaInd].dna);
        }
    }

    reproduce(dna) {
        var v = new Vehicle();

        // pass on genes (DNA)
        v.dna = dna;
        v.maxHealth = v.dna.maxSpeed;
        v.maxForce = (v.dna.maxSpeed/10)-0.25;

        this.members.push(v);
    }
}
