<!DOCTYPE html>
<html lang="en" dir="ltr">
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/MushafApi.php';

$mushaf = new mdzStack\MushafApi();
$_GET = $mushaf->clean($_GET);

$mushafSnippet = '2:1-10, 2:152-157, 2:183-186, 2:254-257, 2:284-286, 3:16-19, 3:133-136, 3:190-194, 23:1-11, 59:18-24';
$default   = '2:1-10, 2:127-128, 2:152-153, 2:183, 2:186, 2:197, 2:208, 2:254, 2:256, 2:257, 2:261, 2:267-268, 2:284, 2:285, 3:8-9, 3:19, 3:133-134, 3:190-191, 3:192-194, 3:200, 4:59, 5:27, 6:160-161, 6:162-163, 7:96, 11:114, 17:7, 33:70-71, 49:13, 51:56, 65:2-4';


$surah     = !empty($_GET['surah']) ? $_GET['surah'] : $default;
$font      = !empty($_GET['font']) ? $_GET['font'] : 'scheherazade';
$mode      = !empty($_GET['mode']) ? $_GET['mode'] : '';
$translate = !empty($_GET['translate']) ? 'show-translation' : '';
$nocache   = !empty($_GET['nocache']) ? '1' : '';

if (!empty($_GET['nocache'])) {
    $mushaf->cacheClear();
}
?>
<head>
    <meta charset="UTF-8">
    <title>Mushaf Snippet | Mdz PlayGround</title>

    <link rel="stylesheet" href="./style.css" media="all">
    <?php if ($font == 'scheherazade') { ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap" rel="stylesheet">
    <?php } ?>
</head>

<body>

<div class="information">
    <p>
        <b>How to use</b>: Each surah separated by <code>,</code> a comma. An ayah of surah indicated by <code>:</code> a colon. Ayah range indicated by <code>-</code> a dash. 
        Ex. example.com/<b><i>?surah=1,2:1-7,2:255-257,2:284-286,23:1-11&translate=1&mode=xlarge</i></b>
    </p>
    <form name="mushafFilter" class="mushaf-filter" action="./" method="get">
        Surah 
        <!-- <input type="text" name="surah" value="<?php echo $surah; ?>" placeholder="1, 2:1-7, 2:255-257" style="width:200px"> -->

        <textarea name="surah" style="width:405px; height:70px"><?php echo $surah; ?></textarea>
        &nbsp;&nbsp;&nbsp;
        Font:
        <select name="font">
            <option value="" <?php echo !$font ? 'selected' : '' ?>>System</option>
            <option value="scheherazade" <?php echo $font == 'scheherazade' ? 'selected' : '' ?>>Scheherazade</option>
            <option value="kitab" <?php echo $font == 'kitab' ? 'selected' : '' ?>>Kitab</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        Mode:
        <select name="mode" >
            <option value="" <?php echo !$mode ? 'selected' : '' ?>>Default</option>
            <option value="narrow" <?php echo $mode == 'narrow' ? 'selected' : '' ?>>Narrow</option>
            <option value="xlarge" <?php echo $mode == 'xlarge' ? 'selected' : '' ?>>Large</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        Translate:
        <select name="translate">
            <option value="0" <?php echo !$translate ? 'selected' : '' ?>>No</option>
            <option value="1" <?php echo $translate ? 'selected' : '' ?>>Yes</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        Clear Cache:
        <select name="nocache">
            <option value="0" <?php echo !$nocache ? 'selected' : '' ?>>No</option>
            <option value="1" <?php echo $nocache ? 'selected' : '' ?>>Yes</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <button type="submit" class="mushaf-filter-go">GO</button>

        <!-- 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="save" type="button">SAVE AS IMAGE</button>
        -->

        &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
        Data source: <a href="https://alquran.cloud/" target="_blank">Al Quran Cloud</a>
    </form>
</div>

<!-- Test copas -->
<div style="display:none;">
    <div class="surah show-translation">
        <h3 class="surahName">QS Al-Baqara 002:152-153</h3>
        <div class="ayah">فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ﴿١٥٢﴾يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ﴿١٥٣﴾</div>
        <div class="ayah" id="snippetData" data-saveas="002 Al-Baqara 152-153">فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ<span class="ayahNumber">﴿<span>١٥٢</span>﴾</span>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ<span class="sign">&nbsp;ۚ</span> إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ<span class="ayahNumber">﴿<span>١٥٣</span>﴾</span></div>
        <div class="translation"><b>152.</b> Karena itu, ingatlah kamu kepada-Ku niscaya Aku ingat (pula) kepadamu, dan bersyukurlah kepada-Ku, dan janganlah kamu mengingkari (nikmat)-Ku. <b>153.</b> Hai orang-orang yang beriman, jadikanlah sabar dan shalat sebagai penolongmu, sesungguhnya Allah beserta orang-orang yang sabar. </div>
    </div>
</div>

<div id="snippetFrame" class="container font-<?php echo $font; ?> <?php echo $mode; ?> <?php echo $translate; ?>">
    <!-- 
        $surahNumber    = \str_pad($surah[0]->number, 2, '0', \STR_PAD_LEFT);
        $items  = array_map('trim', explode(',', $surah));
     -->
    <?php foreach ($mushaf->init($surah) as $snippet) { ?>
        <div class="surah">
            <?php echo $snippet; ?>
        </div>
    <?php } ?>
</div>    

</body>
</html>
