<?php
$uploadDir = '../Images/Comics/';
$zipDir = '../Images/extracted/';
$zipDir = '';

// Create the upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!file_exists($zipDir)) {
    mkdir($zipDir, 0777, true);
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

// Handle zip file upload
if (!empty($_FILES['zipFile']['name'])) {
    $zipFile = $_FILES['zipFile'];
    $zipPath = $zipDir . $zipFile['name'];

    if (move_uploaded_file($zipFile['tmp_name'], $zipPath)) {
        // Extract images from the zip file
        $zip = new ZipArchive;
        if ($zip->open($zipPath) === TRUE) {
            $zip->extractTo($uploadDir);
            $zip->close();
            $output .= "Zip file extracted successfully.<br>";
        } else {
            $output .= "Failed to extract zip file.<br>";
        }

        // Delete the uploaded zip file
        unlink($zipPath);
    } else {
        $output .= "Failed to upload zip file.<br>";
    }
}

echo $output;
