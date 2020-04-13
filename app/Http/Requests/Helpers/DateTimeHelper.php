<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Helpers;

use DateTime;
use Exception;

class DateTimeHelper
{
    /**
     * @param string $dateTimeString
     * @param string|null $format
     * @return string
     */
    public static function getPreviousDateOrToday(string $dateTimeString, string $format = null): string
    {
        $format = $format ?? 'mm/dd/Y';

        try {
            $dateTime = new DateTime($dateTimeString);
            $dateTime->modify('-1 day');

            return $dateTime->format($format);
        } catch (Exception $exception) {
            return DateTime::createFromFormat($format, date($format))->format($format);
        }
    }
}
