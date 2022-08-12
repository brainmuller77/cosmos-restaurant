<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE");
header("Access-Control-Max-Age:86400");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");

 include 'config.php';
 $postjson = json_decode(file_get_contents('php://input'),true);
  $post_id = $postjson['id'];
  $tablename = $postjson['tablename'];

  $query = $con->prepare ("SELECT * FROM $tablename WHERE id='$post_id'");
  $query->execute();
  $results = $query->get_result();
  if($data =$results->fetch_assoc()) {  
    $query = $con->prepare ("UPDATE $tablename SET status = 'delivered' WHERE id='$post_id'");
    $sta   = $query->execute();
			if($sta) {
				
				$result = json_encode(array('success'=>true, 'delivered'=>"true"));
			}
			else{

			 $result = json_encode(array('success'=>false, 'deleted'=>"false"));
		}
			echo $result;

  }

?>