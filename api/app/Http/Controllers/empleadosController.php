<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Empleado;
use App\Pago;

class empleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $e = Empleado::get();
        return response()->json($e);
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
        $e->save();
        return response()->json($e);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $empleado = Empleado::find($id); //Ver toda la infomracion del mismo

        $pagos = Pago::select(
            'cuentas.id as idCuenta','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco',
            'tipos.id as idTipos','tipos.tipo',
            'pagos.id as id','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto','pagos.created_at as datePago'
        )
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->join('tipos','tipos.id','=','cuentas.tipo_id')
            ->where('pagos.empleado_id',$id)
            ->orderby('pagos.id','desc')
            ->get();

        return response()->json([
            'empleado' => $empleado, 'pagos' => $pagos
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
