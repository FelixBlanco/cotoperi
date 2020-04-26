<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cuenta;

class cuentasController extends Controller
{
    public function store(Request $request){
        $c = new Cuenta($request->all());
        $c->save();
        return response()->json();        
    }

    public function index(){
        $c = Cuenta::orderby('id','desc')->get();
        return response()->json($c);
    }

    public function cuentaEmpleado($idEmpleado){
        $c = Cuenta::select(
            "tipos.tipo", 
            'cuentas.id as id','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco'
        )->join('tipos','tipos.id','=','cuentas.tipo_id')->where('empleado_id',$idEmpleado)->get();
        return response()->json($c);
    }

    public function upgrade(Request $request, $id){
        $cuenta = Cuenta::find($id);
        $cuenta->fill($request->all());
        $cuenta->save();
        return response()->json($cuenta);
    }

    public function delete($id){
        $c = Cuenta::find($id);
        $c->delete();
        $c->save();
        return response()->json($c,200);
    }
}
