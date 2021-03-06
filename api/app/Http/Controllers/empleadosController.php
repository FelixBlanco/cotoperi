<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Empleado;
use App\Pago;
use Carbon\Carbon;
use App\Cuenta;

class empleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {        
        $e = Empleado::where('user_id',$request->user()->id)->orderby('username','asc')->get();
        
        $e->each(function($e){
            $e->setDate = Carbon::parse($e->created_at)->format('d m Y');
            $pagosPendientes = Pago::where([
                                    ['empleado_id',$e->id],
                                    ['is_pago','0']                
                                ])->count();

            $e->nro = $pagosPendientes;
            $e->pagosPendientes = ($pagosPendientes == 1) ? 'true' : 'false' ;
            
            $e->ultimo_dos_pagos = Pago::select(
                'pagos.id as idPago','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto',
                'cuentas.id as idCuenta','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco'
                )
                ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
                ->where('pagos.empleado_id',$e->id)
                ->orderby('pagos.id','desc')
                ->limit(2)
                ->get();

            $e->cuentas = Cuenta::where('empleado_id',$e->id)->get();
        });

        return response()->json([
            'empleados' => $e            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $e = new Empleado($request->all());
        $e->user_id = $request->user()->id;
        $e->save();
        return response()->json($e);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        
        $empleado = Empleado::find($id); //Ver toda la infomracion del mismo
        
        $pagos = null;
                
        if($empleado->user_id == $request->user()->id){
            
            $response = 'true';

            $pagos = Pago::select(
                'cuentas.id as idCuenta','cuentas.nro','cuentas.titular','cuentas.telefono',
                'cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco',
                'tipos.id as idTipos','tipos.tipo',
                'pagos.id as id','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago',
                'pagos.code','pagos.observacion','pagos.monto','pagos.created_at as datePago'
            )
                ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
                ->join('tipos','tipos.id','=','cuentas.tipo_id')
                ->where('pagos.empleado_id',$id)
                ->orderby('pagos.id','desc')
                ->get();
            
            $pagos->each(function($pagos){
                $monto_sin_cero = str_replace ( ".", "", $pagos->monto);
                $pagos->setMonto = number_format($monto_sin_cero);
                $pagos->setDate = Carbon::parse($pagos->datePago)->format('d m Y ');
            });
        }else{
            $response = 'false';
        }


        return response()->json([
            'empleado' => $empleado, 'pagos' => $pagos,
            'response' => $response
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $e = Empleado::find($id);
        $e->delete();
        $e->save();
        return response()->json($e);
    }
}
