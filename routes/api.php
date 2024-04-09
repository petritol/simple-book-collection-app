<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BooksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('books', 'App\Http\Controllers\BooksController@show');
Route::post('books','App\Http\Controllers\BooksController@store');
Route::delete('books/{id}', 'App\Http\Controllers\BooksController@delete');