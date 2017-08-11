var NOMAL = 0;
var BANZOKU = 1;
var DICENUM = 3;

$(document).ready(function(){
	$("#fname").val(getDate());
});

var ws = new WebSocket("ws://192.168.11.6:5000");
ws.onopen = function() {
	console.log("Initialize Success");
}

ws.onmessage = function(message)
{
	record = JSON.parse(message.data);
	//alert(record["room"]+":"+$("#fname").val()+"_"+$("#battle").val());
	if(record["room"] == $("#fname").val()+"_"+$("#battle").val()) {
    	$('#detail').html(message.data);
		drawStats(record["total"]);
    	$('#dice1').html(record["dice1"]);
		$('#dice2').html(record["dice2"]);
		$('#dice3').html(colorDice(record["banzoku"]));
	}
}

function getDate(){
  var dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth()+1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  var result = y + "" + m + "" + d;
  return result;
}


function sendData(num, fname) {
	ws.send(JSON.stringify({
		num1: num[0],
		num2: num[1],
		num3: num[2],
		fname: fname
    }));
}

function getDiceNum(dice) {
	return dice.nextInt(1, 7);
}

//function add(num1, num2) {
//	record[num1 + num2]++;
//}

//function remove(num1, num2) {
//	record[num1 + num2]--;
//}

function drawStats(record) {
	var pval = "";
	for (var i = 2; i < 13; i++) {
		var sharp = "";
		for (var s = 0; s < record[String(i)]; s++) {
			sharp += "■";
		}
		if (i < 10) {
    		pval += String(i) + "&nbsp;&nbsp;&nbsp;" + String(("00"+record[String(i)]).slice(-2)) + "\t" + sharp + "<br>";
		} else {
    		pval += String(i) + "&nbsp;" + String(("00"+record[String(i)]).slice(-2)) + "\t" + sharp + "<br>";

		}
	}
    $('#stats').html(pval);
	calcTotalNum(record);
}

function calcTotalNum(record) {
	var total = 0;
	for(key in record) {
		if (Number(key) == -2) {
			continue;
		}
		total += record[Number(key)];
	}
    $('#total').html(total);
}

function main() {
	var dice = new MersenneTwister()
	var fname = $('#fname').val();
	var battle = $('#battle').val();
	var diceNum = new Array();
	for (var i = 0; i < DICENUM; i++) {
		diceNum.push(getDiceNum(dice));
	}
	playSound(diceNum[2]);
	sendData(diceNum, fname+"_"+battle);
}
function road() {
	sendData([-1,-1,-1], fname+"_"+battle);
}

function playSound(num) {
	if (num%2 == 0) {
		var banzoku = Math.floor(Math.random()*10000);
		if (banzoku%3 == 0) {
			$("#romen")[0].play();
		} else if (banzoku%3 == 1) {
			$("#naoya")[0].play();
		} else if (banzoku%3 == 2) {
			$("#hiroshi")[0].play();
		}
	}
}

function colorDice(num) {
	if (num%2 == 0) {
		return "蛮族";
	} else if (num == 1) {
		return "黄";
	} else if (num == 3) {
		return "緑";
	} else if (num == 5) {
		return "青";
	}
}
