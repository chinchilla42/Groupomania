/* import encryption package bcrypt to hash passwords*/
const bcrypt = require('bcrypt');

/* import json web token to handle tokens*/
const jwt = require('jsonwebtoken');

/* Import user model*/
const User = require('../models/User');

/* Create a new user */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
        .catch(error =>res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/* Connect existing user*/
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect'})
            }
            res.status(200).json({
                userId: user._id,
                admin: user.admin,
                token: jwt.sign({
                    userId: user._id,
                    admin: user.admin,
                },
                process.env.JWT_KEY,
                { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur 1' }));
    }) 
    .catch(error => res.status(500).json({ error: 'erreur 2' }));
};

/* Get one user */
exports.findUser = (req, res, next) => 
{
    User.findOne({ _id: req.params.id})
        .then((user) => { res.status(200).json(user);
         })
        .catch((error) => { res.status(404).json({ message :'test' });});
};
