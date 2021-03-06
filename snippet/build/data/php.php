<?php

return [
    'group'  => 'PHP',
    'data' => [
        /*
        [
            ['tag'],
            'content'
        ],
        */

        [
            ['time'],
            '
Measure processing time
```php
$timeStart = microtime(true);

// code here..

$timeEnd = microtime(true);
$timeProcess = ($timeEnd - $timeStart);

// Generated in 0.0043 seconds.
echo \'Generated in \' . number_format($timeProcess, 4) . \' seconds.\';
```
'
        ],
        [
            ['xml'],
            '
Handling DomDocument error

```php
$libXmlError = libxml_use_internal_errors(true);

$dom       = new DOMDocument(\'1.0\', \'UTF-8\');
$xmlString = \'<?xml version="1.0" encoding="utf-8"?>
<root>
    <trunk>test</trumk>
</root>\';


// Supress it because warning is not generated by libxml
if (@$dom->loadXml($xmlString) !== false) {
    // codes..
} else {
    $xmlError = libxml_get_last_error();

    // XML error: Opening and ending tag mismatch: trunk line 3 and trumk - line 3!
    $error[] = sprintf(\'XML error: %s - line %s\', $xmlError->message, $xmlError->line);
}
libxml_use_internal_errors($libXmlError);
```'
        ],
        [
            ['exception'],
            '
Custom exception
```php
namespace Mdz\Snippet;

class HttpException extends \Exception {}
class NotFoundHttpException extends HttpException {}

// How to use?
throw new \Mdz\Snippet\NotFoundHttpException(\'The message\');
```
'
        ],
        [
            ['class'],
            '
[Anonymous class](https://www.php.net/manual/en/language.oop5.anonymous.php)
```php
$object = new class($arrays) extends \Bags {
    // private $items;

    public function set(string $key, mixed $value): void
    {
        $this->items[$key] = $value;
    }
};

$object->set(\'key\', \'value\')
```
'
        ],
        [
            ['curl'],
            '
A simple get remote content with [file_get_contents()](https://www.php.net/manual/en/function.file-get-contents.php):

```php
// Require allow_url_fopen to be enabled for different domain
$result = file_get_contents(\'https://example.com/file.json\');
```

Use [CURL](https://www.php.net/manual/en/intro.curl.php) to remote content:

```php
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, \'http://example.com/file.json\');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, 0);
$result = curl_exec($curl);
curl_close($curl);
```
'
        ],
        [
            ['ipaddress'],
            '
```php
function getIp()
{
    return getenv(\'HTTP_CLIENT_IP\') ?: (
        getenv(\'HTTP_X_FORWARDED_FOR\') ?: (
            getenv(\'HTTP_X_FORWARDED\') ?: (
                getenv(\'HTTP_FORWARDED_FOR\') ?: (
                    getenv(\'HTTP_FORWARDED\') ?: (
                        getenv(\'REMOTE_ADDR\') ?: $_SERVER[\'REMOTE_ADDR\']
                    )
                )
            )
        )
    );
}
```'
        ],
    ]
];
