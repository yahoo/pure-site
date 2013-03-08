var request = require('request'),
    config  = require('../config'),
    async   = require('async');

module.exports = {

    data: {
        lastFetched: undefined,
        results: undefined
    },

    timeThreshold: 3600000, //60 minutes in milliseconds

    //Get information for an individual Github repo and execute a callback
    getRepo: function (username, repo, callback) {
        request({
            url: 'https://api.github.com/repos/' + username + '/' + repo,
            qs: {
                client_id: config.github.clientId,
                client_secret: config.github.clientSecret
            }
        }, function (error, response, body) {
            callback(error, response, JSON.parse(body));
        });
    },

    getRepos: function (userArray, callback) {
        var parallelTasks = [],
            self = this,
            now = new Date();

        //If results exist and those results are less than 60 minutes old (this.timeThreshold)
        if (this.data.results && (now.getTime() - this.data.lastFetched) < this.timeThreshold) {
            //return with those results
            callback(null, this.data.results);
        }

        else {
            userArray.forEach(function (elem, i, arr) {
                parallelTasks.push(function (callback) {
                    self.getRepo(elem.username, elem.repo, function (error, response, body) {
                        callback(error, body);
                    });
                });
            });

            async.parallel(parallelTasks, function (error, response) {
                if (!error) {
                    self.data.results = response;
                    self.data.lastFetched = new Date().getTime();
                }
                callback(error, self.data.results);
            });
        }
    }
}
