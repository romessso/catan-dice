var ws = require("websocket.io")
, server = ws.listen(5000);
var fs = require('fs');
var readline = require("readline");

server.on("connection", function (client) {
    client.on('message', function(request) {
		var info = JSON.parse(request);

		var filename = "result/"+info["fname"]+".txt";
		var writeLine = info["num1"] + "\t" + info["num2"] + "\t" + info["num3"] + "\t" + (Number(info["num1"])+Number(info["num2"])) + "\n";
		fs.appendFile(filename, writeLine, function (err) {
    		if (err) {
				throw err;
			} else {
				var stream = fs.createReadStream(filename, "utf8");
				var reader = readline.createInterface({ input: stream });
				var record = {
					"room": info["fname"],
					"dice1": 0,
					"dice2": 0,
					"banzoku": 0,
					"total": {
				    	"2": 0, "3": 0, "4": 0, "5": 0,
						"6": 0, "7": 0, "8": 0, "9": 0,
						"10": 0, "11": 0, "12": 0}
				    }
				reader.on("line", function(data) {
					var dice1 = data.split("\t")[0];
					var dice2 = data.split("\t")[1];
					var banzoku = data.split("\t")[2];
					var sum = data.split("\t")[3].split("\n")[0];
					record["dice1"] = dice1;
					record["dice2"] = dice2;
					record["banzoku"] = banzoku;
					record["total"][sum]++;
				});
				reader.on("close", function() {
					console.log(record);
					server.clients.forEach(function(client) {
						if (client != null) {
							client.send(JSON.stringify(record));
						}
					});
				});
			}
  		});

    });
 
    client.on('disconnect', function(){
        console.log('connection disconnect');
    });
 
    client.on('close', function(){
        console.log('connection close');
    });
 
    client.on('error', function(err){
        console.log(err);
        console.log(err.stack);
    });
});

function check(filePath) {
  var isExist = false;
  try {
    fs.statSync(filePath);
    return true;
  } catch(err) {
    return false;
  }
  return isExist;
}
