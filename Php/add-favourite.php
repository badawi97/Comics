<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Retrieve JSON data from POST request
$json = file_get_contents('php://input');
$data = json_decode($json);

$comicId = (int) $data->comicId;
$userId = (int) $data->userId;

// Replace these values with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "ComicsDb";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the comic is already added to favorites for the user
$sql_check = "SELECT * FROM favourite WHERE ComicId = '$comicId' AND UserId = '$userId'";
$result_check = $conn->query($sql_check);

if ($result_check && $result_check->num_rows > 0) {
    // Comic is already added to favorites for the user
    echo "Comic is already added to favorites.";
} else {
    // Insert data into the favorites table
    $sql = "INSERT INTO favourite (ComicId, UserId) VALUES ('$comicId', '$userId')";
    if ($conn->query($sql) === TRUE) {
        echo "Comic added to favorites successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
