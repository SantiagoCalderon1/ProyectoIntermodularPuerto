<?php

class Connection
{
    private $connection;

    public function __construct($host, $user, $key, $db)
    {
        $this->connection = new mysqli($host, $user, $key, $db);

        if ($this->connection->connect_errno) {
            die("Fallo al conectar a MySQL: " . $this->connection->connect_error);
        }
    }

    public function closeConnection()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }

    public function dataQuery($sql)
    {
        $res = $this->connection->query($sql);
        if ($res === true) {
            return true;
        } elseif ($res) {
            return $res->fetch_all(MYSQLI_ASSOC);
        } else {
            return false;
        }
    }
}
