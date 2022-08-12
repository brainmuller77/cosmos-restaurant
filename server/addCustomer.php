<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access_Control_Allow_Credentials: true");
header("Access_Control_Allow_Methods: PUT, GET, POST, DELETE, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
if($_SERVER["REQUEST_METHOD"] == "OPTIONS") exit();

  include 'config.php';
  
  $postjson = json_decode(file_get_contents('php://input'),true);

  $cnum =  mysqli_real_escape_string($con,$postjson['cnum']);
  $cname = mysqli_real_escape_string($con,$postjson['cname']);
  $date = date("Y-m-d H:i");
  $cquery = mysqli_query($con ,"SELECT * FROM customerbase where customer_num = '$cnum'");
  $check = mysqli_num_rows($cquery);
     
  if($check>0){
    $result = json_encode(array('success'=>false, 'msg' => "User Exists"));
	echo $result;
    return;
  }else{
  $query = $con->prepare( "INSERT INTO customerbase VALUES (NULL, '$cname','$cnum','1','$date')");
  $query->execute();
  
    
  }
  if($query) $result = json_encode(array('success'=>true, 'msg' => "Successfully Done"));
		else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($con)));
	
		echo $result;

  ?>