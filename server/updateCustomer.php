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

  $time = date("H:i");
  $date = date("Y-m-d H:i");
  $phonenumber = $postjson['cnum'];
  $cusorder = $postjson['cinfo'][0]['costs'];

    $query = mysqli_query($con,"UPDATE customerbase set customer_points = customer_points + '$cusorder',lastvisit =
    '$date' where id != '0' and customer_num = '$phonenumber'");
    if($query) $result = json_encode(array('success'=>true, 'msg'=>"Success"));

    else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($con)));
  
    echo $result;


  ?>