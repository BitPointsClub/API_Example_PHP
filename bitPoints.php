<?php   
/* Do not allow public access to this key */
$bitPoints_APIKey = ""; //Enter your api key here, to get an api key register for a free demo account on https://bitpoints.club
$bitPoints_URL = "https://bitpoints.club/api/v1/";
$bitPoints_ProgramId = 0; //set to your program id, to find your program_id(s): browse to /showProgram_id.php after setting $bitPoints_APIKey

function bitPoints_AddCustomer($email, $password) {
    //check email doesn't already exist in the db
    $objects = bitPoints_HTTP('GET', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/list/?email={"eq":"'.$email.'"}', '');    
    if(count($objects) > 0)
        throw new Exception('Account already exists, please login instead');
    else {
        //add customer (and assign it to program_id)
        $objects = bitPoints_HTTP('POST', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer', 
          '[{'.        
            '"email":"'.$email.'",'.
            '"first_name":"",'.
            '"last_name":"",'.
            '"phone":"",'.
            '"address":"",'.
            '"birthdate":"",'.
            '"password":"'.$password
        .'"}]');
        return bitPoints_RefreshCustomer($objects[0]->customer_id);
    }
}

function bitPoints_FindCustomer($email, $password) {
    //check email doesn't already exist in the db
    $objects = bitPoints_HTTP('GET', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/list/?email={"eq":"'.$email.'"}&password={"eq":"'.$password.'"}', '');
    if(count($objects) != 1)
        throw new Exception('Invalid account');
    else 
        return bitPoints_RefreshCustomer($objects[0]->customer_id);
}

function bitPoints_UpdateCustomer($customer_id, $email, $password) {
    //update customer 
    bitPoints_HTTP('PUT', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/'.$customer_id, 
        '{'.        
        '"email":"'.$email.'",'.
        '"first_name":"",'.
        '"last_name":"",'.
        '"phone":"",'.
        '"address":"",'.
        '"birthdate":"",'.
        '"password":"'.$password
    .'"}');
    return bitPoints_RefreshCustomer($objects[0]->customer_id);
}

function bitPoints_RefreshCustomer($customer_id) {
    //return program/customer object
    return bitPoints_HTTP('GET', 'customer/'.$customer_id.'/program/'.$GLOBALS['bitPoints_ProgramId'].'/', '');
}

function bitPoints_Earn($customer_id, $amount, $description) {
    //add earn transaction (and assign it to program_id)
    bitPoints_HTTP('POST', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/'.$customer_id.'/transaction', 
      '[{'.               
        '"transaction_type":"Earn",'.
        '"amount":"'.$amount.'",'.
        '"description":"'.$description
    .'"}]');
    return bitPoints_RefreshCustomer($customer_id);
}

function bitPoints_Redeem($customer_id, $amount, $description) {
    //add redeem transaction (and assign it to program_id)
    bitPoints_HTTP('POST', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/'.$customer_id.'/transaction', 
      '[{'.            
        '"transaction_type":"Redeem",'.
        '"amount":"'.$amount.'",'.
        '"description":"'.$description
    .'"}]');
    return bitPoints_RefreshCustomer($customer_id);
}

function bitPoints_Refund($customer_id, $amount, $description) {
    //add refund transaction (and assign it to program_id)
    bitPoints_HTTP('POST', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/'.$customer_id.'/transaction', 
      '[{'.
        '"transaction_type":"Refund",'.
        '"amount":"'.$amount.'",'.
        '"description":"'.$description
    .'"}]');
    return bitPoints_RefreshCustomer($customer_id);
}

function bitPoints_History($customer_id) {
    //return customer history
    return bitPoints_HTTP('GET', 'program/'.$GLOBALS['bitPoints_ProgramId'].'/customer/'.$customer_id.'/transaction/List', '');
}

function bitPoints_EchoProgramId() {
    //Find a program_id (i.e. the first program), we suggest using a variable for this instead but you can use this code to find what the program_id is
    $objects = bitPoints_HTTP('GET', 'program/List', '');
    if(count($objects) == 0) 
        echo 'No programs setup';
    else {
        echo "<table><tr><td><b>Program</b></td><td><b>program_id</b></td></tr>";
        foreach ($objects as $object) {
            echo "<tr><td>".$object->program_name."</td><td>".$object->program_id."</td></tr>";
        }
        echo "</table>";
    }
}

function bitPoints_HTTP($method, $url, $postData) {
    $curl = curl_init();
    $options = array();

    //GET/DELETE options
    if($method == "GET" || $method == "DELETE") 
        $options = array(
            CURLOPT_URL => $GLOBALS['bitPoints_URL'].$url,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => [
                'Authorization: key='.$GLOBALS['bitPoints_APIKey'],
                'Content-Type: application/json'
            ]);

    //POST/PUT options
    else 
        $options = array(
            CURLOPT_URL => $GLOBALS['bitPoints_URL'].$url,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => [
                'Authorization: key='.$GLOBALS['bitPoints_APIKey'],
                'Content-Type: application/json'
            ],
            CURLOPT_POST => TRUE,
            CURLOPT_POSTFIELDS => $postData);

    curl_setopt_array($curl, $options);

    //Send request
    $response = curl_exec($curl);

    //Check results
    $http_status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if(FALSE === $response)
    {
        $curlErr = curl_error($curl);
        $curlErrNum = curl_errno($curl);
        curl_close($curl);
        throw new Exception($curlErrNum." ".$curlErr);

    } else if($http_status_code >= 400) {
        curl_close($curl);
        $HandledError = json_decode($response);
        throw new Exception($HandledError->error);
        
    } else {         
        //Return Object
        curl_close($curl);
        return json_decode($response);
    }
}
?>