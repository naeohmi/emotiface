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
    //add all the emotions to the database after shuffling them each time
    addAllToDb(req, res, next) {
        this.shuffleEmotions();
        this.addEmo0(req, res, next);
        this.addEmo1(req, res, next);
        this.addEmo2(req, res, next);
        this.addEmo3(req, res, next);
        this.addEmo4(req, res, next)

    }
    selectRound() {
        config.db.any(`SELECT * FROM E0;`);
    }

    //get the current emotion in play
    getCurrentEmotion(req, res, next) {
        let id = parseInt(req.params.id);
        let table = `E${id}`;
        config.db.one(`SELECT emoName FROM ${id} WHERE emoName `)
    }
    //add the first shuffled emotion to the database
    addEmo0(req, res, next) {
        config.db.none("INSERT INTO E0 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][0]])
            .catch(err => {
                console.log('addEmo0 error');
            })
    }
    //add the second shuffled emotion to the database
    addEmo1(req, res, next) {
        config.db.none("INSERT INTO E1 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][1]])
            .catch(err => {
                console.log('addEmo1 error');
            })
    }
    //add the third shuffled emotion to the database
    addEmo2(req, res, next) {
        config.db.none("INSERT INTO E2 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][2]])
            .catch(err => {
                console.log('addEmo2 error');
            })
    }
    //add the fourth shuffled emotion to the database
    addEmo3(req, res, next) {
        config.db.none("INSERT INTO E3 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][3]])
            .catch(err => {
                console.log('addEmo3 error');
            })
    }
    //add the fifth shuffled emotion to the database
    addEmo4(req, res, next) {
        config.db.none("INSERT INTO E4 (emoName)" + "VALUES($1);", [this.shuffledEmotions[0][4]])
            .catch(err => {
                console.log('addEmo4 error');
            })
    }
    addtoRound() {
        config.db.none("INSERT INTO round()")
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