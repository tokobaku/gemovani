<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Helpers;

/**
 * Class UrlKeyGenerator
 * Helps generating url key from given string
 */
class UrlKeyGenerator
{
    /**
     * Generates url key based on parameter $string
     * @param string $string
     * @param string $charactersToDashes
     * @return string
     */
    public static function toUrlKey(string $string, string $charactersToDashes = "/\W+/"): string
    {
        return preg_replace(
            $charactersToDashes,
            '-',
            strtolower(trim($string))
        );
    }
}
