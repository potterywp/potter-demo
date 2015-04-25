<?php

require_once "vendor/autoload.php";

use Potter\Potter;

$features = Potter::features();

# Main menu
$features->addMenu('main', __('Main Menu'));

$features->addThemeSupport('post-thumbnails');
