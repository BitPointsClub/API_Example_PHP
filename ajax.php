<?php
require_once('bitPoints.php'); 

initSession();
try {
    header('Content-type: application/json');
    switch ($_POST['cmd']) {
        case "getCustomer":
            returnCustomer();
            break;
        case "login":
            login();
            break;
        case "logoff":
            logoff();
            break;
        case "signup":
            signup();
            break;
        case "refresh":
            refresh();
            break;
        case "redeem":
            redeem();
            break;
        case "refund":
            refund();
            break;
        case "order":
            order();
            break;
        case "history":
            history();
            break;
        case "update":
            update();
            break;
    }
} catch (Exception $err) {
	$status = array(
		'type'=>'fail',
		'message'=>$err->getMessage()
	);
    echo json_encode($status);
    die;
}

function refresh() {
    //get bitpoints program/customer info
    $object = bitPoints_RefreshCustomer((int)$_SESSION['customer_id']);
    updateCustomer($object);
}

function login() {
    //get bitpoints program/customer/list info for email/password
    $object = bitPoints_FindCustomer($_POST['email'], $_POST['password']);
    $_SESSION['email'] = $_POST['email'];
    updateCustomer($object);
}

function signup() {
    //post bitpoints customer
    $object = bitPoints_AddCustomer($_POST['email'], $_POST['password']);
    $_SESSION['email'] = $_POST['email'];
    updateCustomer($object);
}

function update() {
    //get bitpoints program/customer/list info for email/password
    $object = bitPoints_UpdateCustomer((int)$_SESSION['customer_id'], $_POST['email'], $_POST['password']);
    updateCustomer($object);
}

function order() {
    //your order store / process logic

    //post bitpoints earn transaction
    $object = bitPoints_Earn((int)$_SESSION['customer_id'], $_POST['amount']);
    updateCustomer($object);
}

function redeem() {
    //post bitpoints redeem transaction
    $object = bitPoints_Redeem((int)$_SESSION['customer_id'], $_POST['amount']);
    updateCustomer($object);
}

function refund() {
    //post bitpoints refund transaction
    $object = bitPoints_Refund((int)$_SESSION['customer_id'], $_POST['amount']);
    updateCustomer($object);
}

function history() {
    $objects = bitPoints_History((int)$_SESSION['customer_id']);
    postResponse('success', json_encode($objects));
}

function returnCustomer() {
    postResponse('success', getCustomerSession());
}

function updateCustomer($object) {
    $_SESSION['balance'] = $object->balance;
    $_SESSION['value'] = $object->value;
    $_SESSION['customer_id'] = $object->customer_id;
    returnCustomer();
}

function logoff() {
    $_SESSION['email'] = null;
    session_unset();
    session_destroy();
    returnCustomer();
}

function getCustomerSession() {
    if (isset($_SESSION['email']))
        return '{"email":"'.$_SESSION['email'].'","points_balance":"'.$_SESSION['balance'].'","points_value":"'.$_SESSION['value'].'"}';
    else
        return '{"email":"","points_balance":"0","points_value":"0"}';
}

function postResponse($status, $message) {
	$status = array(
		'type'=>$status,
		'message'=>$message
	);
    echo json_encode($status);
    die;
}

function initSession() {
    session_start();
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
        session_unset();
        session_destroy();
    }
    $_SESSION['LAST_ACTIVITY'] = time();
    if (!isset($_SESSION['CREATED'])) 
        $_SESSION['CREATED'] = time();
    else if (time() - $_SESSION['CREATED'] > 1800) {
        session_regenerate_id(true);
        $_SESSION['CREATED'] = time();
    }
}

?>