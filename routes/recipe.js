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
  
    if ( req.body.difficulty <=0 || req.body.difficulty > 3) {
        res.status(500).json({
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


//this api takes recipe id as a parameter and deltes it
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


module.exports = router;