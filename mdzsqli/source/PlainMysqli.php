<?php

declare(strict_types=1);

namespace Mdz;

class PlainMysqli
{
    public const VERSION = '1.0.0-a.1';

    protected $mysqli;

    public function __construct(
        string $host,
        string $username,
        string $password,
        string $database,
        string $charset = 'utf8mb4',
        int $port = 3306,
        string $socket = null
    ) {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $this->mysqli = new \mysqli($host, $username, $password, $database, $port, $socket);
        $this->mysqli->set_charset($charset);
    }

    public function connection()
    {
        return $this->mysqli;
    }
}
