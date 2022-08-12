<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE");
header("Access-Control-Max-Age:86400");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");

 include 'config.php';
// SEND SMS
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://sms.arkesel.com/api/v2/sms/send',
    CURLOPT_HTTPHEADER => ['api-key: QU1oUHlZWlRTdURWVmNOemFZS3U'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => http_build_query([
        'sender' => 'KingsBite',
        'message' => 'Welcome to KingsBite.',
        'recipients' => ['233248616502', '233545290848']
    ]),
]);

$response = curl_exec($curl);

curl_close($curl);
if($response['message']=="success"){
    $result = json_encode(array('success'=>true, 'results'=>$response));
}else{
    $result = json_encode(array('success'=>false, 'results'=>$response));
}


    echo $result;
//echo $response;


// SCHEDULE SMS
/* $curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://sms.arkesel.com/api/v2/sms/send',
    CURLOPT_HTTPHEADER => ['api-key: cE9QRUkdjsjdfjkdsj9kdiieieififiw='],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => http_build_query([
        'sender' => 'Helloworld',
        'message' => 'Welcome to Arkesel SMS API v2. Please enjoy the experience.',
        'recipients' => ['233542336719', '233268155768'],
        'scheduled_date' => '2021-03-17 07:00 AM'
    ]),
]);

$response = curl_exec($curl);

curl_close($curl);
echo $response;

// SEND SMS WITH DELIVERY WEBHOOK
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://sms.arkesel.com/api/v2/sms/send',
    CURLOPT_HTTPHEADER => ['api-key: cE9QRUkdjsjdfjkdsj9kdiieieififiw='],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => http_build_query([
        'sender' => 'Helloworld',
        'message' => 'Welcome to Arkesel SMS API v2. Please enjoy the experience.',
        'recipients' => ['233542336719', '233268155768'],
        'callback_url' => 'https://google.com'
    ]),
]);

$response = curl_exec($curl);

curl_close($curl);
echo $response; */

?>
