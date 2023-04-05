<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Headers: origin, content-type, accept');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
  
    try {
        include_once '../../config/database.php';

        $database = new Database();
        $db = $database->getConnection();
        $db->query('CREATE TABLE IF NOT EXISTS books (title text not null, author text, timestamp text not null default current_timestamp)');
        $method = $_SERVER['REQUEST_METHOD'];
        switch($method) {
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                if (!isset($data['title']) || strlen($data['title']) == 0) {
                    http_response_code(400);
                    throw new exception('title is required');
                }
                $title = $data['title'];
                $author = NULL;
                if (isset($data['author']) && strlen($data['author']) > 0) {
                    $author = $data['author'];
                }
                $timestamp = date('Y-m-d\TH:i:sp');
                $sth = $db->prepare('INSERT INTO books (title, author, timestamp) VALUES (?, ?, ?)');
                $sth->execute([$title, $author, $timestamp]);
                echo json_encode(array(
                    'id' => $db->lastInsertId(),
                    'timestamp' => $timestamp
                ));
                break;
            case 'GET':
                $booksPerPage = 20;
                $page = isset($_GET['page']) ? $_GET['page'] : 1;
                $startLimit = ($page - 1) * $booksPerPage;
                $sth = $db->prepare('SELECT rowid AS id, title as name, author, timestamp FROM books ORDER BY rowid DESC LIMIT ?, ?');
                $sth->execute([$startLimit, $booksPerPage]);
                $result = $sth->fetchAll();
                echo json_encode($result);
                break;
            case 'DELETE':
                if (!isset($_GET['id']) || strlen($_GET['id']) == 0) {
                    http_response_code(400);
                    throw new exception('id is required');
                }
                $sth = $db->prepare('DELETE FROM books WHERE rowid = ?');
                $sth->execute([$_GET['id']]);
                break;
        }
    } catch (Exception $e) {
        if (http_response_code() == 200)
            http_response_code(500);
        echo $e->getMessage();
    }
?>