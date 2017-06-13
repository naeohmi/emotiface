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
        let shuffledEmos = this.shuffleAlgo(this.emotions);
        console.log(shuffledEmos);
    }


    addRound(req, res, next) {
        console.log('req.body:', req.body)
        // config.db.none(`INSERT INTO `)
    }

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