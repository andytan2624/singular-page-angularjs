'use strict';

angular.module('app')
    .controller('RecipesController', ["$scope", "$location", "dataService", function($scope, $location, dataService) {

        var vm = this;

        // Get categories
        dataService.getCategories(function(response) {
            var categories = response.data;
            vm.categories = categories;
            vm.myCategory = 0;
        });

        // Function to redirect to a particular link
        vm.go = function ( path ) {
            $location.path( path );
        };

        // Get all recipes
        dataService.getAllRecipes(function(response){
            var recipes = response.data;
            vm.recipes = recipes;
        })

        // Delete a recipe
        vm.deleteRecipe = function(recipeID, $index) {
            dataService.deleteRecipe(recipeID, function(response) {
                vm.recipes.splice($index, 1);
            });
        };

        // When a category changes, update the recipes to show that belong to the category
        vm.categoryChanged = function(item) {
            if (item == null) {
                // Get all recipes if item is null
                dataService.getAllRecipes(function(response){
                    var recipes = response.data;
                    vm.recipes = recipes;
                });
            } else {
                dataService.getCategoryRecipes(item.name, function(response) {
                    var recipes = response.data;
                    vm.recipes = recipes;
                });
            }
        };

    }])
    .controller('RecipeDetailController', function($scope, dataService, $route) {

        var vm = this;

        vm.errorMessages = [];

        /**
         * Based on the current path of the page, set the pageStatus to add or edit
         * Which will be used to determine properties below
         * @type {string}
         */
        vm.pageStatus = $route.current.originalPath == '/add' ? 'add' : 'edit';

        // Function to redirect to a particular link
        vm.go = function ( path ) {
            $location.path( path );
        };

        // Get categories
        dataService.getCategories(function(response) {
            var categories = response.data;
            vm.categories = categories;
        });

        // Get food items
        dataService.getFooditems(function(response) {
            vm.foodItems = response.data;
        });

        /**
         * If the pageStatus is edit, then get the recipe from the database
         */
        if (vm.pageStatus == 'edit') {
            var recipeID = $route.current.params.id;
            dataService.getRecipe(recipeID, function(response) {
                vm.recipe = response.data;
            });

        }
        // Otherwise if we're adding a new recipe, then set recipe to be an object with necessary products
        else {
            vm.recipe = {
                'ingredients': [],
                'steps': []
            };
        }

        // Delete an ingrediant from a recipe
        vm.deleteIngrediant = function($index) {
            vm.recipe.ingredients.splice($index, 1);
        };

        // Delete a step for a recipe
        vm.deleteStep = function($index) {
            vm.recipe.steps.splice($index, 1);
        }

        // Add a step for a recipe
        vm.addStep = function() {
            vmr.ecipe.steps.push({"description": ''});
        };

        // Add a ingrediant for a recipe
        vm.addIngrediant = function() {
            vm.recipe.ingredients.push({"foodItem": '', "condition": '', "amount" : ''});
        };

        // Update an existing recipe
        vm.saveRecipe = function() {
            if (vm.pageStatus == 'edit') {
                var recipeID = $route.current.params.id;
                dataService.updateRecipe(recipeID, vm.recipe, function(response) {

                },
                function(response) {
                    vm.errorMessages = [];
                    var fieldErrors = response.data.errors;
                    /**
                     * Go through each fieldError and go through that fieldError array to get the error messages
                     */
                    for (var fieldError in fieldErrors) {
                        // Property belongs to the object, and not just inherited
                        if (fieldErrors.hasOwnProperty(fieldError)) {
                            var errorMessages = fieldErrors[fieldError];
                            for (var i = 0; i < errorMessages.length; i++) {
                                vm.errorMessages.push(errorMessages[i].userMessage);
                            }
                        }
                    }
                });

            } else {
                dataService.addRecipe(vm.recipe, function(response) {},
                function(response) {
                    vm.errorMessages = [];
                    var fieldErrors = response.data.errors;
                    /**
                     * Go through each fieldError and go through that fieldError array to get the error messages
                     */
                    for (var fieldError in fieldErrors) {
                        // Property belongs to the object, and not just inherited
                        if (fieldErrors.hasOwnProperty(fieldError)) {
                            var errorMessages = fieldErrors[fieldError];
                            for (var i = 0; i < errorMessages.length; i++) {
                                vm.errorMessages.push(errorMessages[i].userMessage);
                            }
                        }
                    }
                });
            }
        };
    })
;