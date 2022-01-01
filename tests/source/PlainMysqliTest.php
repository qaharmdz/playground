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

    public function testConstruct()
    {
        $config = include './tests/config.php';

        $db = new \Mdz\PlainMysqli(
            $config['host'],
            $config['username'],
            $config['password'],
            $config['database'],
        );

        $this->assertEquals($db, self::$db);
    }

    public function testRaw()
    {
        $this->assertInstanceOf(\mysqli_result::class, self::$db->raw("SELECT now()"));
    }

    public function testEscape()
    {
        $this->assertEquals(
            'foo\\\nbar\"baz%bat_for',
            self::$db->escape('foo\nbar"baz%bat_for')
        );

        // Extra escape: _ and %
        $this->assertEquals(
            'foo\\\nbar\"baz\%bat\_for',
            self::$db->escape('foo\nbar"baz%bat_for', '_%')
        );
    }

    public function testQueryRaw()
    {
        $result = self::$db->query("SELECT now() AS `now`")->fetch_assoc();

        $this->assertTrue(!empty($result['now']));
    }

    public function testQuery()
    {
        $result = self::$db->query(
            "INSERT INTO `post` SET `title` = ?s, `content` = ?s, `status` = ?i",
            ['The Second Post', 'The second post description. ', 1]
        );

        $this->assertInstanceOf(\mysqli_stmt::class, $result);

        $this->assertTrue(self::$db->insertId() > 1);
        $this->assertTrue(self::$db->affectedRows() === 1);
    }

    public function testQueryResult()
    {
        $result = self::$db->query(
            "SELECT * FROM `post` WHERE `title` LIKE ?s AND `status` = ?i",
            ['%first%', 1]
        )->fetch_assoc();

        $this->assertEquals('The First Post', $result['title']);
    }

    /**
     * @depends testQuery
     */
    public function testQueryNamedParameter()
    {
        $result = self::$db->query(
            "SELECT * FROM `post` WHERE `post_id` IN (:post_ids?i) AND `title` LIKE :title?s AND `status` = :status?i ORDER BY {sort_col} DESC",
            [
                'post_ids'   => [1, 2, 3],
                'title'      => '%the%',
                'status'     => 1,
                '{sort_col}' => 'post_id'
            ]
        )->fetch_assoc();

        $this->assertEquals('The Second Post', $result['title']);
    }

    /**
     * Pass parameters but query not have "?" placeholders.
     */
    public function testQueryInvalidParamPlaceholder()
    {
        $this->expectException(\TypeError::class);

        $result = self::$db->query("SELECT now() AS `now`", [1])->fetch_assoc();
    }

    public function testMultiQuery()
    {
        $this->assertNull(self::$db->multiQuery("
            SELECT @@character_set_database AS charset, @@collation_database AS collation;
            SELECT now();
        "));
    }

    public function testInfo()
    {
        self::$db->query(
            "INSERT INTO `post` (`title`, `content`, `status`) VALUES (?s, ?s, ?i), (?s, ?s, ?i)",
            [
                'The Third Post', 'The third post description. ', 1,
                'The Fourth Post', 'The fourth post description. ', 0
            ]
        );

        $this->assertEquals([
            'records'    => '2',
            'duplicates' => '0',
            'warnings'   => '0',
        ], self::$db->info());
    }

    public function testPing()
    {
        $this->assertTrue(self::$db->ping());
    }

    public function testSelect()
    {
        $result = self::$db->get(
            'SELECT * FROM `post` WHERE `status` = ?i',
            [1]
        );

        $this->assertEquals($result->num_rows, count($result->rows));
        $this->assertArrayHasKey('title', $result->rows[0]);
        $this->assertArrayHasKey('title', $result->row);
    }

    public function testInsert()
    {
        self::$db->add(
            'post',
            [
                'title'   => 'Test Insert',
                'content' => 'Test insert content',
                'status'  => 0,
            ]
        );

        $this->assertTrue(self::$db->insertId() > 1);
    }

    /**
     * @depends testInsert
     */
    public function testUpdate()
    {
        $statement = self::$db->set(
            'post',
            [
                'title'  => 'Test Update',
                'status' => 1,
            ],
            [
                'post_id' => 5
            ]
        );

        $this->assertEquals(1, self::$db->affectedRows());
    }

    /**
     * @depends testInsert
     */
    public function testUpdateWhereArray()
    {
        $statement = self::$db->set(
            'post',
            [
                'content'  => 'Test update content',
                'status' => 0,
            ],
            [
                'post_id' => [2, 3, 5]
            ]
        );

        $this->assertEquals(3, self::$db->affectedRows());
    }
}
