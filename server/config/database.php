<?php 
    class Database {
        public $db;
        public function getConnection(){
            $this->db = null;
            try{
                $this->db = new PDO('sqlite:'.__DIR__.'../../books.db');
            }catch(SQLiteException $exception){
                http_response_code(500);
                echo "Error when connecting to database: " . $exception->getMessage();
            }
            return $this->db;
        }
    }  
?>