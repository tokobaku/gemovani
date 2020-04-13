<?php

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
    Route::post('/tours/delete', 'GalleryController@massDelete');

    Route::get('{path}', function () {
        return view('admin.404');
    })->where('path', '.*');
});

Route::get('/image/{path}', 'ImageController@show')->where('path', '.*');

Route::get('{path}', function () {
    return view('welcome');
})->where('path', '.*');
