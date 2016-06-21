Example site for BitPoints.Club API integration (PHP)
================

Example site showing how to integrate a site to the BitPoints.Club platform via the BitPoints.Club API (in PHP).

Please note: This is not intended to be an example of an Ecommerce site, we are using the eShopper bootstrap template from shapebootstrap.net as a semi-functional site to base the API integration on, if you want a base Ecommerce site please visit/download the eShopper bootstrap template: https://shapebootstrap.net/item/1524993-eshopper-best-free-ecommerce-html-template 

As such most of the pages are hard coded HTML, the integration example code can be found in \bitPoints.php

Supports API Version 1.0

Prerequisites
===
A BitPoints.Club account API Key - this can be obtained by registering for a free demo account (up to 5 customers) here: https://bitpoints.club (select the Sign Up menu item). Then Setup a program

Installation
===
Download the site and edit \bitPoints.php, set $bitPoints_APIKey to your BitPoints.Club account API Key and $bitPoints_ProgramId to your program id (see below)

```
$bitPoints_APIKey = ""; //Enter your api key here, to get an api key register for a free demo account on https://bitpoints.club
$bitPoints_URL = "https://bitpoints.club/api/v1/";
$bitPoints_ProgramId = ; /*set to your program id, to find your program id do a GET request to https://bitpoints.club/api/v1/program/List i.e see bitPoints_GetProgram() below:

function bitPoints_GetProgramId() {
    //Find a program_id (i.e. the first program), we suggest using a variable for this instead but you can use this code to find what the program_id is
    $objects = bitPoints_HTTP('GET', 'program/List', '');
    if(count($objects) == 0) 
        throw new Exception('No programs setup');
    else 
        return bitPoints_RefreshCustomer($objects[0]->program_id);
}
*/
```