<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

Auth::routes();

Route::group(['prefix' =>'admin', 'middleware' => 'auth'], function () {
    Route::get('/', function () {
        return view('admin.dashboard');
    });

    Route::get('/files', 'FilesController@index');
    Route::resource('galleries', 'GalleryController');
    Route::post('/galleries/delete', 'GalleryController@massDelete');

    Route::get('/faq', 'FaqController@index');
    Route::post('/faq', 'FaqController@store');

    Route::resource('tours', 'TourController');
    Route::post('/tours/delete', 'TourController@massDelete');

    Route::resource('locations', 'LocationController');
    Route::post('/locations/delete', 'LocationController@massDelete');

    Route::get('/slides/reorder', 'SlideController@reorder');
    Route::post('/slides/reorder', 'SlideController@saveOrder');
    Route::resource('slides', 'SlideController');
    Route::post('/slides/delete', 'SlideController@massDelete');

    Route::get('/config', 'ConfigController@index');
    Route::post('/config', 'ConfigController@save');

    Route::resource('messages', 'ContactMessageController');
    Route::post('/messages/delete', 'ContactMessageController@massDelete');

    Route::get('{path}', function () {
        return view('admin.404');
    })->where('path', '.*');
});

Route::get('/image/{path}', 'ImageController@show')->where('path', '.*');

Route::get('/sound/{path}', function (string $path) {
    return response()->file(storage_path("app/public/{$path}"), [
        'Content-Type' => 'audio/mpeg'
    ]);
})->where('path', '.*');

Route::get('{path?}', function ($path = '/') {
    $isBot = isset($_SERVER['HTTP_USER_AGENT'])
        && preg_match('/bot|crawl|slurp|spider|mediapartners/i', $_SERVER['HTTP_USER_AGENT']);

    // If use is search engine return pre-rendered content
    if ($isBot) {
        $curl = curl_init('localhost:3000/render/' . urlencode(env('APP_URL') . $path));

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($curl);
        curl_close($curl);

        return $data;
    }

    return view('welcome');
})->where('path', '^(?!/?api.*$).*');
