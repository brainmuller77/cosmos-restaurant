<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE");
header("Access-Control-Max-Age:86400");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");

 include 'config.php';
//$con = mysqli_connect("localhost", "root", "", "social");
  $postjson = json_decode(file_get_contents('php://input'),true);
                 
    // File path config 
    if(empty($_FILES)){
      $filein = false;
    }
    if($_FILES){
      $filein = true;
    }
    
   if($filein==true){
          // your file is not empty
      
      $date_added = date("Y-m-d H:i:s");
      $price =  mysqli_real_escape_string($con,$_POST['price']);
      
      $foodname = mysqli_real_escape_string($con,$_POST['foodname']);
     // $description = mysqli_real_escape_string($con,$_POST['description']);    
      $category = mysqli_real_escape_string($con,$_POST['category']);
     
 $newFilePath = "";
 $fileName = basename($_FILES["file"]["name"]);
 
 //Get the temp file path
 $tmpFilePath = $_FILES['file']['tmp_name'];
 $mime = $_FILES['file']['type'];
// $mime = mime_content_type($mime);
if(strstr($mime, "video/")){
   // this code for video
   $file = $_FILES['thumbnail']['name'];
   $tmpPath = $_FILES['thumbnail']['tmp_name'];
   $FilePath = "assets/images/posts/thumbnails/" . uniqid() . basename($file);
   move_uploaded_file($tmpPath, $FilePath);
   $thumbnail = $FilePath;
   //$query =  $query = mysqli_query($con,"INSERT INTO cuposts VALUES(NULL, '$body', '$FilePath'");
}else{
 $thumbnail = "not set";
}


 //Make sure we have a file path
 if ($tmpFilePath != ""){
   //Setup our new file path
   $newFilePath = "assets/images/menu/" . uniqid() . $fileName;
  
   //Upload the file into the temp dir
   move_uploaded_file($tmpFilePath, $newFilePath);
 
   /* $trimFilePath = substr($newFilePath,7);
   move_uploaded_file($tmpFilePath, $trimFilePath);
   */
 }
 
 }/* else{
  $date_added = date("Y-m-d H:i:s");
      $price =  mysqli_real_escape_string($con,$_POST['price']);
      //get username
      $foodname = mysqli_real_escape_string($con,$_POST['foodname']);
      $description = mysqli_real_escape_string($con,$_POST['description']);    
      $category = mysqli_real_escape_string($con,$_POST['category']);
} */

    $query = $con->prepare("INSERT INTO menu VALUES(NULL, '$foodname', '$category', '$price', 
    '$newFilePath','$date_added','active')");
   $query->execute();
  
    if($query) $result = json_encode(array('success'=>true, 'msg' => "Successfully Added"));
		else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($con)));
	
		echo $result;	
?>