<?php
	$a = '';
	$u = '';
	$p = '';
	$e = '';
	$img = '';
	if(isset($_GET['browser'])){
		$a = $_GET['browser'];
		echo "browserType:$a<br>";
	}

	if(isset($_GET['user_name'])){
		$u = $_GET['user_name'];
		echo "name:$u<br>";
	}

	if(isset($_GET['password'])){
		$p = $_GET['password'];
		echo "password:$p<br>";
	}

	if(isset($_GET['email'])){
		$e = $_GET['email'];
		echo "email:$e<br>";
	}

	if(isset($_GET['img'])){
		$img = $_GET['img'];
		echo "<img src=images/$img style=width:280px;height:200px;><br>";
	}
?>	