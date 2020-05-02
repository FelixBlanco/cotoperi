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

Route::group(['prefix' => 'v1', 'middleware' => 'cors'], function () {    
    
    Route::resource('empleados','empleadosController');    
    
    Route::get('cuentas','cuentasController@index');
    Route::post('cuentas','cuentasController@store'); 
    Route::put('cuentas/{id}','cuentasController@upgrade');
    Route::delete('delete-cuenta/{id}','cuentasController@delete');
    
    Route::get('pagos-pendientes','pagosController@pagosPendientes');   
    Route::post('pagos','pagosController@store');
    Route::post('pagar','pagosController@codePago');    
    Route::get('ultimos-pagos','pagosController@ultimosPagos');
    Route::get('delete-pagos/{id}', 'pagosController@deletePagos');
    Route::post('add-pago-empleado','pagosController@addPagosEmpleados');

    Route::get('tipos','tiposController@index');    
    Route::get('cuentas-empleados/{idEmpleado}','cuentasController@cuentaEmpleado');
    
    Route::get('lista-pagos','pagosController@listaNomina');
    Route::get('seach-nomina/{date}','pagosController@seachFechaNomina');
});