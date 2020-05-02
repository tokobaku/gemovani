<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Config;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Class Config
 * Model for config entity
 * @property string $key
 * @property string $value
 * @property string $id
 */
class Config extends Model
{
    /**
     * @param string $key
     * @return Config|null
     */
    public static function get(string $key)
    {
        return Config::where('key', $key)->first();
    }

    /**
     * @param string $key
     * @param string $value
     * @return Config
     */
    public static function set(string $key, string $value): Config
    {
        $config = Config::get($key);

        if (!$config) {
            $config = new Config();
            $config->key = $key;
        }

        $config->value = $value;
        $config->save();

        return $config;
    }

    /**
     * @param null|string[] $keys
     * @return Config[]
     */
    public static function keyValuePairs(array $keys = null): array
    {
        if ($keys) {
            $allConfigs = DB::table('configs')
                ->select('key', 'value')
                ->whereIn('key', ['gemovani_logo'])
                ->get();
        } else {
            $allConfigs = Config::all();
        }

        $configs = [];

        foreach ($allConfigs as $config) {
            $configs[$config->key] = $config->value;
        }

        return $configs;
    }
}
