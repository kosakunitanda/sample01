<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
// ログインユーザー
Route::get('/user', function () {
    return Auth::user();
})->name('user');
Route::get('/tasks', 'TaskController@index')->name('tasks.index');
Route::get('/users', 'UserController@index')->name('users.index');
Route::post('/task/create', 'TaskController@create')->name('task.create');
Route::post('/task/comment', 'TaskController@comment')->name('task.comment');
Route::post('/task/done', 'TaskController@done')->name('task.done');
Route::post('/user/create', 'UserController@create')->name('user.create');
Route::post('/user/edit', 'UserController@edit')->name('user.edit');
Route::post('/user/delete', 'UserController@delete')->name('user.delete');
