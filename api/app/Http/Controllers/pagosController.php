<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pago;
use App\Empleado;
use App\Cuenta;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class pagosController extends Controller
{
    public function pagosPendientes(){
        $pagosPendientes = Pago::select(
            'pagos.id as idPagos','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto','pagos.created_at',
            'cuentas.id as idCuentas','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id',
            'empleados.id as idEmpleados', 'empleados.username', 'empleados.ubicacion'
            )
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->join('empleados','empleados.id','=','pagos.empleado_id')
            ->where('pagos.is_pago',0)->get();

        $pagosPendientes->each(function($pagosPendientes){
            $monto_sin_cero = str_replace ( ".", "", $pagosPendientes->monto);
            $pagosPendientes->setMonto = number_format($monto_sin_cero);
            $pagosPendientes->setDate = Carbon::parse($pagosPendientes->created_at)->format('d m Y');
        });

        return response()->json($pagosPendientes);
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

    /**
     * Agregar pagos desde el perfil 
     * del empleado
     */
    public function addPagosEmpleados(Request $request){        
        $p = new Pago($request->all());
        $p->save();
        return response()->json($p);
    }


    /**
     * Lista de nominas generales
     */

    public function listaNomina(){

        $pagos = Pago::select( DB::raw("date(created_at) as listaDate") )
                ->groupBy('listaDate')
                ->orderby('listaDate','desc')
                ->get();

        return response()->json($pagos);
    }

    public function seachFechaNomina($date){       

        $p = Pago::select(
            'empleados.id as idEmpleado','empleados.username', 'empleados.ubicacion',
            'cuentas.id as idCuentas','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco',
            'pagos.id as idPagos','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto'
        )
            ->join('empleados','empleados.id','=','pagos.empleado_id')
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->where('pagos.created_at','like','%'.$date.'%')->get();
        
        $p->each(function($p,$totalNeto){   
            $monto_sin_cero_uno = str_replace ( ".", "", $p->monto);                     
            $p->setMonto = number_format($monto_sin_cero_uno);                        
        });
                    
        $totalNeto = 0;        
        foreach ($p as $pago) {
            $monto_sin_cero = str_replace ( ".", "", $pago->monto);  
            $totalNeto = $totalNeto + $monto_sin_cero;
        }

        return response()->json([
            'p'         => $p,
            'totalNeto' => number_format($totalNeto)
        ]);
    }
}
