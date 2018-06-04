const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

//return all the recipes in database
router.get('/', (req, res, next) => {
    Recipe.find()
        .exec()
        .then(recipes => {
            res.status(200).json({
                count: recipes.length,
                all_recipes: recipes
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

//this api takes values and craete new recipe
router.post('/', (req, res, next) => {

    if (req.body.difficulty <= 0 || req.body.difficulty > 3) {
        res.status(400).json({
            message: 'difficulty must be between 1 and 3'
        })
    }
    else {
        const recipe = new Recipe({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            prep_time: req.body.prep_time,
            difficulty: req.body.difficulty,
            vegetarian: req.body.vegetarian
        })
        recipe.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'recipe created successfull',
                    recipe: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
    }
})

//get id and return one recipe

router.get('/:id', (req, res, next) => {
    Recipe.findOne({ _id: req.params.id })
        .exec()
        .then(foundRecipe => {
            res.status(200).json({
                message: 'found recipe',
                recipe: foundRecipe
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

//this api takes recipe id and parameters to update and updateds that recipe
// get and array or objects like this: [ {"propName":"name", "value":"updated name" }]
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Recipe.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(updatedRecipe => {
            res.status(200).json({
                message: "Recipe updated",
                // recipe: updatedRecipe
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})


//this api takes recipe id as a parameter and deletes it
router.delete('/:id', (req, res, next) => {
    Recipe.findByIdAndRemove(req.params.id)
        .exec()
        .then(deletedRecipe => {
            res.status(200).json({
                message: 'recipe deleted',
                recipe: deletedRecipe
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

//this api takes name as a parameter and returns results containing parameter character
router.get('/name/:name', (req, res, next) => {
    const name = req.params.name;
    console.log(name);
    Recipe.find({ 'name': { '$regex': name } })
        .exec()
        .then(recipes => {
            if (recipes[0]) {
                res.status(200).json({
                    recipes: recipes
                })
            }
            else {
                res.status(200).json({
                    message: 'no result found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


//this api will take recipe id and rating value, to add rating of that recipe

router.post('/:id/rating', (req, res, next) => {
    const value = req.body.value;
    if(value<1 || value > 5){
        res.status(400).json({
            message:'rating must be between 1 and 5'
        })
    }
    else{ 
    Recipe.findOne({ _id: req.params.id })
        .exec()
        .then(foundRecipe => {
            foundRecipe.ratings.push(value);
            foundRecipe.save();

            res.status(200).json({
                message: 'rated recipe',
                recipe: foundRecipe
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
})

module.exports = router;