var AWS = require('aws-sdk');
var uuid = require('uuid');
AWS.config.update({ region: 'us-east-1' });


module.exports.handler = (event, context, callback) => {
    // TODO implement
    var dynamodb = new AWS.DynamoDB();
    
    var teamID = uuid.v1();
    var teamName = JSON.parse(event.body).teamname;

    var params = {
        TableName: 'TeamList',
        Item: {
            'ID': { S: teamID },
            'Name': { S: teamName }
        }
    };

    //Create response
    var response = {
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": false
    }

    // Call DynamoDB to add the item to the table
    dynamodb.putItem(params, function(err, data) {
        //Callback
        if (err) {
            response.statusCode = 500;
            response.body = JSON.stringify(err);
            callback(null, response);
        } else {
            response.statusCode = 200;
            response.body = JSON.stringify({"teamid":teamID});
            callback(null, response);
        }
    });
};