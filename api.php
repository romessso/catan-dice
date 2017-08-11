<?php
header("Content-Type: text/javascript; charset=utf-8");

$num1 = $_POST['num1'];
$num2 = $_POST['num2'];
$fname = $_POST['fname'];

touch("result/".$fname.".txt");
chmod("result/".$fname.".txt", 0777);

$fp = fopen("result/".$fname.".txt", "a");
fwrite($fp, "{$num1}\t{$num2}\n");
fclose($fp);

$res = array();
$fp = fopen("result/".$fname.".txt", "r");
while ($line = fgets($fp)) {
	$sum = intval(explode("\t", $line)[0]) + intval(explode("\n", explode("\t", $line)[1])[0]);
	array_push($res, $sum);
}
fclose($fp);

$data = array_count_values($res);
echo json_encode($data);
