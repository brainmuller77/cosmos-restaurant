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

  $ordered = 'ordered';

  $query = mysqli_query($con ,"SELECT * FROM orders where status = '$ordered' ORDER BY id asc");
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
}else {
  $datauser = [];
}
 if($query) $result = json_encode(array('success'=>true, 'results'=>$datauser));

    else $result = json_encode(array('success'=>false));

    
 echo $result; 



?>