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
1) Download the site and edit \bitPoints.php, set $bitPoints_APIKey to your BitPoints.Club account API Key (see ACCOUNT > API Development menu item when logged into https://bitpoints.club)

2) Browse to /showProgram_id.php to see your program_id(s), edit \bitPoints.php and set $bitPoints_ProgramId to the program_id you want to use for this site 

i.e. \bitPoints.php
```
$bitPoints_APIKey = ""; //Enter your api key here, to get an api key register for a free demo account on https://bitpoints.club
$bitPoints_URL = "https://bitpoints.club/api/v1/";
$bitPoints_ProgramId = 0; //set to your program id, to find your program_id(s): browse to /showProgram_id.php after setting $bitPoints_APIKey
```