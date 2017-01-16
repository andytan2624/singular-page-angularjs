'use strict';

angular.module('app')
    .service('dataService', function($http) {
        var baseUrl = 'http://localhost:5000';

        // Get all the recipes
        this.getAllRecipes = function(callback) {
            $http.get(baseUrl + '/api/recipes')
                .then(callback)
        };

        // Get all the recipes for a category
        this.getCategoryRecipes = function(category, callback) {
            $http.get(baseUrl + '/api/recipes?category=' + category)
                .then(callback)
        };

        // Get a particular recipe ID
        this.getRecipe = function(recipeID, callback) {
            $http.get(baseUrl + '/api/recipes/' + recipeID)
                .then(callback)
        };

        // Update a particular recipe ID
        this.updateRecipe = function(recipeID, data, callback, errorCallback) {
            $http.put(baseUrl + '/api/recipes/' + recipeID, data)
                .then(callback)
                .catch(errorCallback);
        };

        // Add a new reciple
        this.addRecipe = function(data, callback, errorCallback) {
            $http.post(baseUrl + '/api/recipes', data)
                .then(callback)
                .catch(errorCallback)
        };

        // Delete a recipe ID
        this.deleteRecipe = function(recipeID, callback) {
            $http.delete(baseUrl + '/api/recipes/' + recipeID)
                .then(callback)
        };

        // Get all the categories
        this.getCategories = function(callback) {
            $http.get(baseUrl + '/api/categories')
                .then(callback)
        };

        // Get all the food items
        this.getFooditems = function(callback) {
            $http.get(baseUrl + '/api/fooditems')
                .then(callback)
        };

    })
;