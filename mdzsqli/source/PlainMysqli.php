<?php

declare(strict_types=1);

namespace Mdz;

class PlainMysqli
{
    /**
     * @var string
     */
    public const VERSION = '1.0.0-a.1';

    /**
     * @var \mysqli
     */
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

    public function connection(): \mysqli
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
        return $this->mysqli->query($query, MYSQLI_STORE_RESULT);
    }

    public function escape($value): string
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
     * Execute multiple sql queries.
     *
     * @param  string $queries
     */
    public function multiQuery(string $queries)
    {
        $this->mysqli->multi_query($queries);

        do {
            if ($result = $this->mysqli->store_result()) {
                $result->free_result();
            }
        } while ($this->mysqli->next_result());
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
        $stmt_result = $params ? $this->query($query, $params, $types) : $this->raw($query);

        if ($stmt_result instanceof \mysqli_stmt) {
            $stmt_result = $stmt_result->get_result();
        }

        $result = new \stdClass();
        $result->num_rows = (int)$stmt_result->num_rows;
        $result->rows     = $stmt_result->fetch_all(MYSQLI_ASSOC);
        $result->row      = $result->rows[0] ?? [];

        $stmt_result->close();

        return $result;
    }

    /**
     * Get information about the most recently executed query.
     *
     * @link https://www.php.net/manual/en/mysqli.info.php#mysqli.info.description
     *
     * @return array
     */
    public function info(): array
    {
        $result = [];

        if ($info = $this->mysqli->info) {
            preg_match_all('/(\w[^:]+): (\d+)/', strtolower($info), $matches);
            $result = array_combine($matches[1], $matches[2]);
        }

        return $result;
    }

    /**
     * Get latest primary key inserted.
     *
     * @return int|string
     */
    public function insertId(): int
    {
        return (int)$this->mysqli->insert_id;
    }

    /**
     * Get the affected rows in the previous query.
     *
     * @return int  The number of rows affected or retrieved
     */
    public function affectedRows(): int
    {
        return (int)$this->mysqli->affected_rows;
    }

    /**
     * Check database connection.
     *
     * @return bool
     */
    public function ping(): bool
    {
        return $this->mysqli->ping();
    }
}
