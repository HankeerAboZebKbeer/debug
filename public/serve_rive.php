<?php
$host = "sql302.byetcluster.com";
$dbname = "if0_39446949_dbsap";
$username = "if0_39446949";
$password = "PRY6Yav2YqsO6f";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    exit("DB connection failed");
}

$id = intval($_GET['id'] ?? 0);
$result = $conn->query("SELECT rive_file FROM animations WHERE id = $id");

if ($result && $row = $result->fetch_assoc()) {
    header("Content-Type: application/octet-stream");
    echo $row['rive_file'];
} else {
    http_response_code(404);
    echo "File not found";
}

$conn->close();
