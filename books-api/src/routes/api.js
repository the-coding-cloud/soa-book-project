const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const error = 'Internal server error';

router.route('/getBooks').get((req,res)=>{
    console.log('----------Request received for path / GET');
    const username = req.query.username;
    console.log(`query username:  ${username}`);

    fs.readFile(path.resolve(__dirname, 'books.json'), 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(`Error opening books.json:  ${err}`);
            res.json(error);

        } else {

            let data;
            try {
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(`Error parsing JSON:  ${err}`);
                res.json({error});
            }

            let books = [];
            data.forEach( (entry) => {
                if(username === entry.username){
                    books.push({
                        "content": entry.content
                    });
                }
            });

            console.log(`${books.length} books found`);
            res.json(books);
        }
    });
});

router.route('/').post( (req, res) => {
    console.log('---------------Request received for path / POST');
    const {username, content} = req.body;
    console.log(`body username: ${username}`);
    console.log(`body content: ${content}`);
    let data;

    try {
        console.log("Reading from file");
        const jsonString = fs.readFileSync(path.resolve(__dirname, 'books.json'));
        data = JSON.parse(jsonString);
        console.log(data);
    } catch (err) {
        console.log(`Error parsing JSON:  ${err}`);
        res.json({error});
    }

    data.push({
        "username": username,
        "content": content
    });

    console.log(data);

    try {
        console.log("Writing to file");
        fs.writeFile(path.resolve(__dirname, 'books.json'), JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
        });
        res.json({
            "username": username,
            "content": content
        });
    } catch (err) {
        console.log(`Error writing JSON:  ${err}`);
        res.json({error});
    }
});


module.exports = router;
