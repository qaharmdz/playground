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

    /**
     * Run query `as is`.
     * **Important**: use escape(), never trus user input.
     *
     * @link https://www.php.net/manual/en/class.mysqli-result.php
     *
     * @return \mysqli_result|bool
     */
    public function raw(string $query)
    {
        return $this->mysqli->query($query);
    }

    public function escape($value)
    {
        return $this->mysqli->real_escape_string($value);
    }

    /**
     * Execute prepared statement query.
     *
     * @param  string $query
     * @param  array  $params
     * @param  string $types  s,i,d,b
     *
     * @link https://www.php.net/manual/en/class.mysqli-stmt.php
     *
     * @return \mysqli_result|\mysqli_stmt|bool
     */
    public function query(string $query, array $params = [], string $types = '')
    {
        if (!$types) {
            $types = str_repeat('s', count($params));
        }

        $statement = $this->mysqli->prepare($query);
        $statement->bind_param($types, ...$params);
        $statement->execute();

        return $statement;
    }

    /**
     * Select query helper
     *
     * @param  string $query
     * @param  array  $params
     * @param  string $types  s,i,d,b
     *
     * @return \stdClass    num_rows, rows, row
     */
    public function select(string $query, array $params = [], string $types = ''): \stdClass
    {
        $statement = $stmt_result = $this->query($query, $params, $types);

        if ($statement instanceof \mysqli_stmt) {
            $stmt_result = $statement->get_result();
        }

        $result = new \stdClass();
        $result->num_rows = (int)$stmt_result->num_rows;
        $result->rows     = $stmt_result->fetch_all(MYSQLI_ASSOC);
        $result->row      = $result->rows[0] ?? [];

        $stmt_result->close();

        return $result;
    }
}
