<?php
//setting header to json
header('Content-Type: application/json');

//database
define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'programmer_query');

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT AVG(age) AS avg_age,"
        . "AVG(experience_years) AS avg_experience_years,"
        . "AVG(programming) AS avg_programming,"
        . "AVG(web_frontend) AS avg_web_frontend,"
        . "AVG(web_backend) AS avg_web_backend,"
        . "AVG(mobile_native) AS avg_mobile_native,"
        . "AVG(mobile_hybrid) AS avg_mobile_hybrid,"
        . "AVG(relational_database) AS avg_relational_database,"
        . "AVG(nosql_database) AS avg_nosql_database "
        . " FROM programmer_data");

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();

//$data = $result;
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data);
