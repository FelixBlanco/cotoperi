<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pago extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'cuenta_id','empleado_id','is_pago','code','observacion','monto'
    ];
}
