# Quantified Self Express API

Quantified Self Express API is a back end API built in Node and Express and hosted on Heroku: http://morning-beach-24613.herokuapp.com

This API is the back end for: https://mdevoe12.github.io/quantified-self/

## Getting Started



### Prerequisites

This project is built using Node JS and Express.

If you do not have Node installed on your machine, please see the following guide for details:
http://blog.teamtreehouse.com/install-node-js-npm-mac

### Installing

Clone this repo to a desired folder on your machine:
```
$: git clone git@github.com:mdevoe12/quanitified-self-express-api.git
```

CD into your directory:
```
$: cd quanitified-self-express-api
```

Install Node Package Manager

```
$: npm install
```

### Using in Development environment

Start Server

```
$: npm start
```

The following endpoints are provided for consumption:

Food Endpoints:

GET /api/v1/foods - returns a JSON of all foods

GET /api/v1/foods/:id - returns a single food item matching the given ID

POST /api/v1/foods - create a new food using the following syntax:

{ food: { name: "Name of food here", calories: "Calories here"} }

PATCH /api/v1/foods/:id - update a single food item matching the given ID, use the following syntax:

{ food: { name: "Name of food here", calories: "Calories here"} }

DELETE /api/v1/foods/:id - will delete the food with the id passed in.

Meal Endpoints:

GET /api/v1/meals - returns all meals with foods assigned to those meals.

GET /api/v1/meals/:meal_id/foods - returns the foods associated with the meal ID given.

POST /api/v1/meals/:meal_id/foods/:id - adds a new food to the specified meal.

DELETE /api/v1/meals/:meal_id/foods/:id - removes the selected food from the specified meal



## Contributing

If you would like to contribute to this project, please fork this repository, clone the forked repository and submit a pull request tagging @MikelSage or @mdevoe12.


## Authors

* **Michael Sagapolutele** - [GitHub](https://github.com/mikelsage)
* **Matt DeVoe** - [GitHub](https://github.com/mdevoe12)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
