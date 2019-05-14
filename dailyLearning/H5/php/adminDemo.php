<?php
	$u = '';
	$p = '';
	$e = '';
	if(isset($_GET['user_name'])){
		$u = $_GET['user_name'];
		echo "admin-name:$u<br>";
	}

	if(isset($_GET['password'])){
		$p = $_GET['password'];
		echo "admin-password:$p<br>";
	}

	if(isset($_GET['email'])){
		$e = $_GET['email'];
		echo "admin-email:$e<br>";
	}
?>