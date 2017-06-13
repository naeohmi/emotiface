const config = require('./config.js');

class Queries {
    constructor() {
        this.emotions = [
            "angry",
            "happy",
            "sad",
            "silly",
            "surprised"
        ];
        this.shuffledEmotions = [];
        this.shuffleEmotions();
    }
    //Fisher-Yates (aka Knuth) Shuffle - shuffle algorithm to go through emotions and make sure to each emotion once, randomly
    //thanks stack overflow
    shuffleAlgo(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //shuffle emotions array so each round of play is unique order
    shuffleEmotions() {
        let emos = this.shuffleAlgo(this.emotions);
        this.shuffledEmotions.push(emos);
        console.log("zero", this.shuffledEmotions[0][0]);
        console.log("one", this.shuffledEmotions[0][1]);
    }
    addAllToDb() {
        this.addEmo0();
        this.addEmo1();
        this.addEmo2();
        this.addEmo3();
        this.addEmo4();
    }
    addEmo0(req, res, next) {
        config.db.none("INSERT INTO E0 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][0]])
            .catch(err => {
                console.log('addEmo0 error');
                return next(err);
            })
    }
    addEmo1(req, res, next) {
        config.db.none("INSERT INTO E1 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][1]])
            .catch(err => {
                console.log('addEmo1 error');
                return next(err);
            })
    }
    addEmo2(req, res, next) {
        config.db.none("INSERT INTO E2 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][2]])
            .catch(err => {
                console.log('addEmo2 error');
                return next(err);
            })
    }
    addEmo3(req, res, next) {
        config.db.none("INSERT INTO E3 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][3]])
            .catch(err => {
                console.log('addEmo3 error');
                return next(err);
            })
    }
    addEmo4(req, res, next) {
        config.db.none("INSERT INTO E4 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][4]])
            .catch(err => {
                console.log('addEmo4 error');
                return next(err);
            })
    }
    //adds up all the points and returns the sum as total score
    addPoints(req, res, next) {
        config.db.any(`SELECT (SELECT SUM(E0.pts) FROM E0) + (SELECT SUM(E1.pts) FROM E1) + (SELECT SUM(E2.pts) FROM E2) + (SELECT SUM(E3.pts) FROM E3) + (SELECT SUM(E4.pts) FROM E4);`)
            .then(sum => {
                res.send(sum);
            })
            .catch(err => {
                return next(err);
            })
    }
};

module.exports = Queries;