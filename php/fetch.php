<?php
	session_start();
 
	$conn = new mysqli("localhost", "root", "", "login_angular_db");
 
	$output = array();
	$sql = "SELECT * FROM members WHERE memid = '".$_SESSION['user']."'";
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}
 
	echo json_encode($output);
?>