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

        $this->configuration([]);
    }

    public function configuration(array $rules)
    {
        $this->config = array_replace_recursive(
            [
                'query_fallback' => true
            ],
            $rules
        );
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
        if ($params === [] && $this->config['query_fallback']) {
            return $this->raw($query);
        }

        if ($types === '') {
            if ($results = $this->parseParamType($query)) {
                list($query, $types) = $results;
            } else {
                $types = str_repeat('s', count($params));
            }
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
     * Parameter type hint.
     *
     * @param  string $query
     *
     * @return array|false
     */
    public function parseParamType(string $query)
    {
        preg_match_all('/\?([sidb])?/', $query, $matches);
        list($tokens, $tokenType) = $matches;

        if (!$tokens) {
            return false;
        }

        $tokenType = array_map(
            function($type) { return $type ?: 's'; },
            $tokenType
        );

        $query = strtr($query, array_fill_keys($tokens, '?'));
        $types = implode('', $tokenType);

        return [$query, $types];
    }

    public function parseParamName(string $query, array $params = [])
    {
        if ($params === [] || (array_keys($params) === range(0, count($params) - 1))) {
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
