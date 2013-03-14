var config  = require('../../config'),
    github  = require('../githubApi'),
    inProgress = false;

module.exports = function (req, res, next) {

    //If an API call is in progress, render the last collected data.
    if (inProgress) {
        res.render('extras', {
            results: github.data.results
        });
    }

    //If an API call isn't in progress, set the inProgress flag to true and make the call to getRepos()
    else {
        inProgress = true;
        github.getRepos(config.extras.modules, function (error, results) {
            inProgress = false;
            if (!error) {
                res.render('extras', {
                    results: results
                });
            }
            else {
                console.log(error);
                //We can probably serve the older results if we get an error for the newer results.
                res.render('extras', {
                    results: github.data.results
                });
            }
        });
    }
};
