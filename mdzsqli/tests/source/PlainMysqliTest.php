<?php

declare(strict_types=1);

namespace Mdz\Test;

use PHPUnit\Framework\TestCase;

class PlainMysqliTest extends TestCase
{
    protected $db;

    protected function setUp(): void
    {
        if (!is_file('./tests/config.php')) {
            exit('Database configuration file required!');
        }

        $config = include './tests/config.php';

        $this->db = new \Mdz\PlainMysqli(
            $config['host'],
            $config['username'],
            $config['password'],
            $config['database'],
        );

        // Recreate DB table per test
        $schema = file_get_contents('./tests/schema.sql');
        $this->db->multiQuery($schema);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Mdz\PlainMysqli', $this->db);
        $this->assertInstanceOf(\mysqli::class, $this->db->connection());
    }

    public function testRaw()
    {
        $this->assertInstanceOf(\mysqli_result::class, $this->db->raw("SELECT now()"));
    }
}
