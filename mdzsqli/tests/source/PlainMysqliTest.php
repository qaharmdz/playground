<?php

declare(strict_types=1);

namespace Mdz\Test;

use PHPUnit\Framework\TestCase;

class PlainMysqliTest extends TestCase
{
    protected static $db;

    public static function setUpBeforeClass(): void
    {
        if (!is_file('./tests/config.php')) {
            exit('Database configuration file required!');
        }

        $config = include './tests/config.php';

        self::$db = new \Mdz\PlainMysqli(
            $config['host'],
            $config['username'],
            $config['password'],
            $config['database'],
        );

        $schema = file_get_contents('./tests/schema.sql');
        self::$db->multiQuery($schema);
    }

    public static function tearDownAfterClass(): void
    {
        self::$db = null;
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Mdz\PlainMysqli', self::$db);
        $this->assertInstanceOf(\mysqli::class, self::$db->connection());
    }

    public function testRaw()
    {
        $this->assertInstanceOf(\mysqli_result::class, self::$db->raw("SELECT now()"));
    }
    }
}
