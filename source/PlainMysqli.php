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

    /**
     * @var array
     */
    private $config = [];

    public function __construct(
        string $host,
        string $username,
        string $password,
        string $database,
        string $charset = 'utf8mb4',
        string $collation = 'utf8mb4_unicode_520_ci',
        int $port = 3306,
        string $socket = null
    ) {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $this->mysqli = new \mysqli($host, $username, $password, $database, $port, $socket);
        $this->mysqli->set_charset($charset);
        $this->mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
        $this->mysqli->query('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_520_ci');

        $this->setConfig();
    }

    public function setConfig(array $configuration = [])
    {
        $this->config = array_replace_recursive(
            [
                'query_fallback' => true
            ],
            $configuration
        );
    }

    public function getConfig($key, $default = null)
    {
        return $this->config[$key] ?? $default;
    }

    /**
     * @return \mysqli
     */
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

    public function escape(string $value, string $extra = ''): string
    {
        $escaped = $this->mysqli->real_escape_string($value);

        if ($extra !== '') {
            $escaped = addcslashes($escaped, $extra);
        }

        return $escaped;
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
        if ($params === [] && $this->getConfig('query_fallback')) {
            return $this->raw($query);
        }

        if ($types === '') {
            if ($results = $this->parseParamName($query, $params)) {
                list($query, $params, $types) = $results;
            } else {
                list($query, $types) = $this->parseParamType($query);
            }
        }

        $statement = $this->mysqli->prepare($query);
        $statement->bind_param($types, ...$params);
        $statement->execute();

        if ($statement->result_metadata() instanceof \mysqli_result) {
            return $statement->get_result();
        }

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
     * Parameter type hint.
     *
     * @param  string $query
     *
     * @return array|false
     */
    protected function parseParamType(string $query)
    {
        preg_match_all('/\?([sidb])?/', $query, $matches);
        list($tokens, $tokenType) = $matches;

        if (!$tokens) {
            return false;
        }

        $tokenType = array_map(
            function ($type) {
                return $type ?: 's';
            },
            $tokenType
        );

        $query = strtr($query, array_fill_keys($tokens, '?'));
        $types = implode('', $tokenType);

        return [$query, $types];
    }

    protected function parseParamName(string $query, array $params = [])
    {
        if (array_keys($params) === range(0, count($params) - 1)) {
            return false;
        }

        preg_match_all('/:(\w{2,}+)(\?[sidb])?/', $query, $matches);
        list($tokens, $tokenParam, $tokenType) = $matches;

        if (!$tokens) {
            return false;
        }
        if (count(array_unique($tokenParam)) !== count(array_intersect_key(array_flip($tokenParam), $params))) {
            throw new \InvalidArgumentException(sprintf('The number of given parameters not match named-parameter for query "' . $query . '".'));
        }

        $types  = '';
        $parameters = [];
        $placeholders = [];

        foreach ($tokenParam as $i => $name) {
            $_type = $tokenType[$i] ?: '?s';
            $_paramsVal = $params[$name];

            if (is_array($_paramsVal)) {
                $_count = count($_paramsVal);

                switch ($_type) {
                    case '?i':
                        $_paramsVal = array_map('intval', $_paramsVal);
                        break;
                    case '?d':
                        $_paramsVal = array_map('floatval', $_paramsVal);
                        break;
                    default:
                        $_paramsVal = array_map('strval', $_paramsVal);
                        break;
                }

                $types .= str_repeat($_type, $_count);
                $parameters = array_merge($parameters, $_paramsVal);
                $placeholders[$tokens[$i]] =  '?' . str_repeat(',?', $_count - 1);
            } else {
                $types .= $_type;
                $placeholders[$tokens[$i]] = '?';

                switch ($_type) {
                    case '?i':
                        $parameters[] = intval($_paramsVal);
                        break;
                    case '?d':
                        $parameters[] = floatval($_paramsVal);
                        break;
                    default:
                        $parameters[] = strval($_paramsVal);
                        break;
                }
            }
        }

        $query = strtr($query, $placeholders);
        $types = str_replace('?', '', $types);

        // Variable
        preg_match_all('/{\w+}/', $query, $matches);
        $vars  = array_intersect_key($params, array_flip($matches[0]));
        $query = strtr($query, $vars);

        return [$query, $parameters, $types];
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

    // Helper
    // ================================================

    /**
     * SELECT query helper
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

        $result = new \stdClass();
        $result->num_rows = (int)$stmt_result->num_rows;
        $result->rows     = $stmt_result->fetch_all(MYSQLI_ASSOC);
        $result->row      = $result->rows[0] ?? [];

        $stmt_result->close();

        return $result;
    }

    /**
     * INSERT query helper
     *
     * @param  string $table
     * @param  array  $data
     *
     * @return \mysqli_stmt|bool
     */
    public function insert(string $table, array $data)
    {
        $sets   = [];
        $params = [];
        $types  = str_repeat('s', count($data));

        foreach ($data as $key => $value) {
            $sets[]   = "`" . $key . "` = ?";
            $params[] = is_array($value) ? json_encode($value) : $value;
        }

        return $this->query(
            "INSERT INTO `" . $table . "` SET " . implode(', ', $sets),
            $params,
            $types
        );
    }

    /**
     * UPDATE query helper
     *
     * @param  string $table
     * @param  array  $data
     * @param  array  $where
     *
     * @return \mysqli_stmt|bool
     */
    public function update(string $table, array $data, array $where)
    {
        $sets   = [];
        $wheres = [];
        $params = [];
        $types  = str_repeat('s', count($data));

        foreach ($data as $key => $value) {
            $sets[]   = "`" . $key . "` = ?";
            $params[] = is_array($value) ? json_encode($value) : $value;
        }

        foreach ($where as $key => $value) {
            if (is_array($value)) {
                $wheres[] = "`" . $key . "` IN (" . '?' . str_repeat(',?', count($value) - 1) . ")";
                $params   = array_merge($params, $value);
                $types   .= str_repeat('s', count($value));
            } else {
                $wheres[] = "`" . $key . "` = ?";
                $params[] = $value;
                $types   .= 's';
            }
        }

        return $this->query(
            "UPDATE `" . $table . "` SET " . implode(', ', $sets) . " WHERE " . implode(' AND ', $wheres),
            $params,
            $types
        );
    }
}