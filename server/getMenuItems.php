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

  $active = 'active';

  $query = mysqli_query($con ,"SELECT * FROM menu where status = '$active' ORDER BY id desc");
  $check = mysqli_num_rows($query);
     
  if($check>0){
      while($data = mysqli_fetch_array($query))
        
  $datauser[] = array(
    'id' => $data['id'],
    'foodname' => $data['foodname'],
    'category' => $data['category'],
    'price' => $data['price'],
    'costs' => 0,
    'quantity' => 0,
    'date' => $data['date_added'],
    'status' => $data['status'],
    'image' => $data['image']
  );
}else {
  $datauser = [];
}
 if($query) $result = json_encode(array('success'=>true, 'results'=>$datauser));

    else $result = json_encode(array('success'=>false));

    
 echo $result; 



?>