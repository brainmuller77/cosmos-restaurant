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
  $month = date("M Y",strtotime($date));
  $device = $postjson['userid'];
  $bask = $postjson['items'];
  $tablenum = $postjson['tablenum'];
  $total = $postjson['total'];

  $id = substr((rand()),0,6);
  $id2 = substr((rand()),0,4);
  $transid = $id + $id2;
  $countOfData = count($bask);
  for ($i = 0; $i < $countOfData; $i++){
    $item_name = $bask[$i]['foodname'];
    $qty = $bask[$i]['quantity'];
    $price = $bask[$i]['price'];
    $picture = $bask[$i]['image'];
  $query = $con->prepare( "INSERT INTO orders VALUES (NULL, '$item_name',
  '$qty','$price','$total','$transid', '$tablenum','$date','$time','ordered','$month','$device','$picture')");
	$query->execute();
  }
    if($query){
      
$query = mysqli_query($con,"SELECT * FROM orders where status = 'ordered' ORDER BY id desc limit 1");
$check = mysqli_num_rows($query);
     
if($check>0){
    while($data = mysqli_fetch_array($query))
    $datauser[] = array(
      'id' => $data['id'],
      'itemname' => $data['itemname'],
      'quantity' => $data['quantity'],
      'price' => $data['price'],
      'costs' => $data['costs'],
      'transid' => $data['transid'],
      'tablenum' => $data['tablenum'],
      'device' => $data['device_id'],
      'date' => $data['date'],
      'time' => $data['time'],
      'status' => $data['status'],
      'month' => $data['month'],
      'image' => $data['image']
    );
}else{
  $datauser = [];
}

    $result = json_encode(array('success'=>true, 'msg' => "Successfully Ordered", 'results'=>$datauser));
    }else {
      $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($con)));
    }
		echo $result;

   /*  if($postjson['points']=="yes"){

    } */


  ?>