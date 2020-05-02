<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use App\Config\Config;
use Illuminate\Http\Response;

/**
 * Class ConfigController
 * For config CRUD
 */
class ConfigController extends Controller
{
    /**
     * @return Application|ResponseFactory|Response
     */
    public function index()
    {
        $allConfigs = Config::all();
        $configs = [];

        foreach ($allConfigs as $config) {
            $configs[$config['key']] = $config;
        }

        return view('admin.config.index', [
            'configs' => $configs
        ]);
    }

    /**
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function save(Request $request)
    {
        $configs = $request->get('configs');

        foreach ($configs as $config) {
            Config::set($config['key'], $config['value']);
        }

        return redirect('/admin/config')->with('messages', [
            [
                'type' => 'success',
                'message' => 'Saved configuration!'
            ]
        ]);
    }
}
