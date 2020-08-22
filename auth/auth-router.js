const router = require('express').Router();
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const secrets =  require ('../config/secrets.js');

router.get('/', (req, res) => {
    res.send('Hello from Express');
  });
  
router.post('/register', (req, res) => {
    // implement registration
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.add(user) //if succesfully added, token is generated based on that user
      .then(saved => {
        res.status(201).json({ username: saved.username });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
  
  //implement log in
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username }) //return an array that matches the username.
      .first()
      .then(user => { // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}!`, token 
        });
        } else {
          // we will return 401 if the password or username are invalid
          // we don't want to let attackers know when they have a good username
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({error});
        console.log(error);
      });
  }); 
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username 
    };

    const options = {
      expiresIn: '24h',
    };
    return jwt.sign (payload, secrets.jwtSecret, options)
  }
  module.exports = router;
  