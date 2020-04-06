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
        $c = Cuenta::join('tipos','tipos.id','=','cuentas.tipo_id')->where('empleado_id',$idEmpleado)->get();
        return response()->json($c);
    }
}
