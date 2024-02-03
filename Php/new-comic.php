<?php
$uploadDir = '../Images/Comics/';

// Create the upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$output = '';

// Handle image uploads
if (!empty($_FILES['imageFiles']['name'][0])) {
    $imageFiles = $_FILES['imageFiles'];

    foreach ($imageFiles['name'] as $key => $name) {
        $tempFile = $imageFiles['tmp_name'][$key];
        $targetFile = $uploadDir . $name;

        if (move_uploaded_file($tempFile, $targetFile)) {
            $output .= "Image '$name' uploaded successfully.<br>";
        } else {
            $output .= "Failed to upload image '$name'.<br>";
        }
    }
}


echo $output;
