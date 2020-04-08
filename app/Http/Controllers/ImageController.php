<?php
/**
 * @author Torknike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\ServerFactory;

/**
 * Class ImageController
 * Uses glide server to manipulate images from http response and return them
 */
class ImageController extends Controller
{
    public function show($path)
    {
        $server = ServerFactory::create([
            'response' => new LaravelResponseFactory(app('request')),
            'source' => app('filesystem')->disk('public')->getDriver(),
            'cache' => storage_path('glide'),
            'cache_path_prefix' => '.cache',
            'base_url' => 'image',
        ]);

        return $server->getImageResponse($path, request()->all());
    }
}
