<?php

namespace mdzStack;

/**
 * https://alquran.cloud/
 * Github: https://github.com/islamic-network/alquran.cloud
 *
 * API Alternatif
 * - API Consumer https://quran.kemenag.go.id/ use https://web-api.qurankemenag.net/quran-ayah?start=0&limit=6&surah=1
 * - https://equran.id/apidev
 * - https://github.com/renomureza/quran-api-id
 *   - https://github.com/renomureza/hadis-api-id
 * - https://github.com/gadingnst/hadith-api
 */

class MushafApi
{
    private $apiURL     = 'https://api.alquran.cloud/';
    public $typeQuran   = 'quran-uthmani';
                        // quran-simple, quran-simple-clean, quran-simple-enhanced, quran-simple-min, quran-corpus-qd,
                        // quran-uthmani-min, quran-uthmani, quran-tajweed, quran-wordbyword, quran-kids
    public $typeTrans   = 'id.indonesian';
                        // id.indonesian, id.muntakhab, en.sahih, en.hilali
    public $cacheStatus = true;
    public $cacheExpire = 60 * 60 * 24 * 365; // 365 day

    private $collects   = [
        '1', '2:1-7', '2:255-257', '2:284-286', '23:1-11',
        '2:152-157', '2:183-186', '2:207-210', '3:1-9', '3:14-18', '3:26-28'
    ];

    public function fetch($segments, $arrayFormat = false)
    {
        try {
            // var_dump($this->apiURL . $segments);
            $data = file_get_contents($this->apiURL . $segments, false, stream_context_create(array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ),
            )));
            // var_dump($data);

            return json_decode($data, $arrayFormat);
        } catch (Exception $e) {
            die('Unable to connect to the Al Quran Cloud API!');
        }
    }

    /**
     * Bulk fetch
     * - Each surah separated by "," a comma.
     * - An ayah of surah indicated by ":" a colon.
     * - Ayah range indicated by "-" a dash.
     *
     * Params :
     * - /?translate=1  Show trnaslation
     * - /?mode=xlarge  Option: narrow, normal, xlarge
     *
     * Example: /?surah=1,2:1-7,2:255-257,2:284-286,23:1-11&mode=narrow&translate=1
     */
    public function init($surah)
    {
        $items  = array_map('trim', explode(',', $surah));

        $surahs = [];
        foreach ($items as $item) {
            if (is_numeric($item)) {
                $surahs[] = $this->surah((int)$item);
            }

            // Contain : as surah and - as ayah separation
            if (strpos($item, ':') !== false) {
                $_items = explode(':', $item);
                $surahs[] = $this->surah((int)$_items[0], $_items[1]);
            }
        }

        return $surahs;
    }

    /**
     * Fetch surah
     *
     * @param  int   $surah
     * @param  mixed $ayah    Format: 255, 284-286
     *
     * @return string
     */
    public function surah(int $surah, $ayah = false)
    {
        $cacheKey = sprintf('%s__surah_%s__ayah_%s__%s', $this->typeQuran, $surah, $ayah, $this->typeTrans);

        if ($cached = $this->cacheGet($cacheKey)) {
            return $cached;
        }

        $segments = 'editions/' . $this->typeQuran . ',' . $this->typeTrans;

        if ($ayah) {
            $offset = 0;
            $limit  = 1;

            $number = explode('-', $ayah);
            $offset = (int)$number[0] - 1;
            $limit  = !empty($number[1]) ? (int)$number[1] -  $offset : $limit;

            $segments .= '?offset=' . $offset . '&limit=' . $limit;
        }

        if (!$response = $this->fetch('surah/' . $surah . '/' . $segments)) {
            return $this->error('Error occured, please try again later!');
        }
        if ($response->code != 200) {
            return $this->error($response->data);
        }
        if (is_string($response->data[0]->ayahs)) {
            return $this->error('
                <b>Invalid Parameters: surah ' . $surah . ($ayah ? ', ayah ' . $ayah : '') . '</b><br>
                <ul style="margin-bottom:0">
                <li>Please specify a valid surah (1 to 114).</li>
                <li>If you have specified an ayah numbers, please ensure they are valid and fall within (range of) the number of ayahs the surah has.</li>
                </ul>
            ');
        }

        return $this->cacheSet($cacheKey, $this->format($response->data));
    }

    /**
     * Format API response
     *
     * @param  obj $surah   $response->data
     *
     * @return string
     */
    public function format($surah)
    {
        $data    = '';
        $output  = '';

        $start = $surah[0]->ayahs[0]->numberInSurah;
        $total = count($surah[0]->ayahs) - 1;
        $end   = $total >= 1 ? $start + $total : 0;

        $surahNumber    = \str_pad($surah[0]->number, 2, '0', \STR_PAD_LEFT);
        $surahAyahRange = $start . ($end ? '-' . $end : '');
        $saveAsFilename = $surahNumber . ' ' . $surah[0]->englishName . ' ' . $surahAyahRange;

        $header = '<h3 id="qs-' . $surahNumber . '_' . $surahAyahRange . '" class="surahName">';
        $header .= 'QS ' . $this->surahTitle($surah[0]->englishName) . ' ' . $surahNumber . ':' . $surahAyahRange;
        $header .= '</h3>';

        $output .= '<div class="ayah" id="snippetData" data-saveas="' . $saveAsFilename . '">';
        foreach ($surah[0]->ayahs as $ayah) {
            $data = $ayah->text;

            if ($ayah->numberInSurah == 1 && !in_array($surah[0]->number, [1, 9])) {
                $data = preg_replace('/^(([^ ]+ ){4})/u', '', $ayah->text);
            }

            $output .= preg_replace('/ ([ۖ-۩])/u', '<span class="sign"> $1</span>', $data);
            $output .= $this->ayahNumber($ayah->numberInSurah);
        }
        $output .= '</div>';

        $output .= '<div class="translation">';
        foreach ($surah[1]->ayahs as $ayah) {
            $output .= '<b>' . $ayah->numberInSurah . '.</b> ' . $ayah->text . ' ';
        }
        $output .= '</div>';

        return $header . $output;
    }

    public function ayahNumber($num = 1)
    {
        $digit  = ['0','1','2','3','4','5','6','7','8','9'];
        $arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

        $number = '<span class="ayahNumber">﴿';
        $number .= '<span>' . str_replace($digit, $arabic, $num) . '</span>';
        $number .= '﴾</span>';

        return $number;
    }

    public function surahTitle($title)
    {
        $taxonomy = array(
            'Al-Baqara' => 'Al-Baqarah',
            'Aal-i-Imraan' => 'Ali-Imraan',
            'Al-Muminoon' => 'Al-Mu\'minuun'
        );

        if (isset($taxonomy[$title])) {
            $title = $taxonomy[$title];
        }

        return $title;
    }

    /**
     * Helper
     ==================================== */

    public function error($content)
    {
        return '<div class="error">' . $content . '</div>';
    }

    public function clean($data)
    {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                unset($data[$key]);
                $data[$this->clean($key)] = $this->clean($value);
            }
        } else {
            $data = htmlspecialchars($data, ENT_COMPAT, 'UTF-8');
        }

        return $data;
    }

    public function cacheGet($key)
    {
        if (!$this->cacheStatus) {
            return false;
        }

        $files = glob('./temp/cache.' . preg_replace('/[^A-Z0-9\._-]/i', '', $key) . '.*');

        if ($files) {
            $handle = fopen($files[0], 'r');

            flock($handle, LOCK_SH);
            $data = fread($handle, filesize($files[0]));
            flock($handle, LOCK_UN);
            fclose($handle);

            return json_decode($data, true);
        }

        return false;
    }

    public function cacheSet($key, $value)
    {
        if (!$this->cacheStatus) {
            return $value;
        }

        $this->cacheDelete($key);

        $file = './temp/cache.' . preg_replace('/[^A-Z0-9\._-]/i', '', $key) . '.' . (time() + $this->cacheExpire);

        $handle = fopen($file, 'w');
        flock($handle, LOCK_EX);
        fwrite($handle, json_encode($value));
        fflush($handle);
        flock($handle, LOCK_UN);
        fclose($handle);

        return $value;
    }

    public function cacheDelete($key)
    {
        $files = glob('./temp/cache.' . preg_replace('/[^A-Z0-9\._-]/i', '', $key) . '.*');

        if ($files) {
            foreach ($files as $file) {
                if (file_exists($file)) {
                    unlink($file);
                }
            }
        }
    }

    public function cacheClear()
    {
        $files = glob('./temp/cache.*');

        if ($files) {
            foreach ($files as $file) {
                if (file_exists($file)) {
                    unlink($file);
                }
            }
        }
    }
}
