<?php

include_once('Parsedown.php');

$fileSource = fileIterator('data/');
$dataSource = [];
foreach ($fileSource as $source) {
    $dataSource[] = include_once($source['path']);
}

$markdown = new Parsedown();
$dataAll = $dataGroup = $dataTrunk = $dataTags = [];

$timeStart = microtime(true);

foreach ($dataSource as $source) {
    if (!$source['data']) {
        continue;
    }

    foreach ($source['data'] as $data) {
        $dataGroup[] = $source['group'];
        $dataTags    = array_merge($dataTags, $data[0]);

        $dataAll[]   = [
            'group'    => $source['group'],
            'tags'     => $data[0],
            'content'  => $markdown->text($data[1]),
        ];
    }
}

$dataGroup = array_unique($dataGroup); sort($dataGroup);
$dataTags  = array_unique($dataTags);  sort($dataTags);
$savePath  = __DIR__ . '/../';

file_put_contents($savePath . 'data-source.json', json_encode($dataAll, JSON_PRETTY_PRINT));
file_put_contents($savePath . 'data-list.json', json_encode(['group' => $dataGroup, 'tags' => $dataTags], JSON_PRETTY_PRINT));

$timeEnd = microtime(true);
$timeProcess = ($timeEnd - $timeStart);

echo 'Generated in ' . number_format($timeProcess, 4) . ' seconds.';

// =============================================================================

function fileIterator($path, $exclude = array())
{
    $files = array();
    $fileIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));

    foreach ($fileIterator as $splFileInfo) {
        if (!in_array($splFileInfo->getBasename(), $exclude) && $splFileInfo->isFile()) {
            $files[] = array(
                'path'      => ltrim(str_replace(array(rtrim(__DIR__, '/'), '\\'), array('', '/'), '' . $splFileInfo), '/'),
                'filename'  => $splFileInfo->getBasename(),
                'extension' => $splFileInfo->getExtension(),
            );
        }
    }

    return $files;
}
