<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pago;

use App\Empleado;
use App\Cuenta;

class pagosController extends Controller
{
    public function pagosPendientes(){
        $p = Pago::select(
            'pagos.id as idPagos','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto',
            'cuentas.id as idCuentas','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id',
            'empleados.id as idEmpleados', 'empleados.username', 'empleados.ubicacion'
            )
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->join('empleados','empleados.id','=','pagos.empleado_id')
            ->where('pagos.is_pago',0)->get();
        return response()->json($p);
    }

    public function store(Request $request){

        if($request->isNewEmpleado){
            $e = new Empleado($request->empleados);
            $e->save();
            $idEmpleado = $e->id;
        }else{
            $idEmpleado = $request->empleado_id;
        }

        if($request->isNewCuenta){
            $c = new Cuenta($request->cuentas);
            $c->tipo_id = $request['cuentas']['tipo'];
            $c->empleado_id = $idEmpleado;
            $c->save();
            $isCuenta = $c->id;
        }else{
            $isCuenta = $request->cuenta_id;
        }
        
        // Store pagos 
        $p = new Pago($request->pago);    
        $p->cuenta_id   = $isCuenta;
        $p->empleado_id = $idEmpleado;
        $p->is_pago     = 0;
        $p->save();

        return response()->json($p);
    }

    public function codePago(Request $request){        
        $p = Pago::find($request->idPago);
        $p->is_pago = 1;
        $p->code = $request->code;
        $p->save();
        return response()->json($p);
    }

    public function ultimosPagos(){
        $p = Pago::select(
            'pagos.id as idPagos','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto',
            'cuentas.id as idCuentas','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id',
            'empleados.id as idEmpleados', 'empleados.username', 'empleados.ubicacion'
            )
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->join('empleados','empleados.id','=','pagos.empleado_id')
            ->where('pagos.is_pago',0)->orderby('pagos.id','desc')->limit(5)->get();
        return response()->json($p);
    }


    public function deletePagos($id){
        $p = Pago::find($id);
        $p->delete();
        $p->save();
        return response()->json($p);
    }
}
