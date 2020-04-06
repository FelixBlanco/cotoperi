<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tipo;

class tiposController extends Controller
{
    public function index(){
        return response()->json(Tipo::get());
    }
}
