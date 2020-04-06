<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCuentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cuentas', function (Blueprint $table) {
            $table->unsignedBigInteger('tipo_id')->nullable();
            $table->foreign('tipo_id')->references('id')->on('tipos');    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cuentas', function (Blueprint $table) {
            //
        });
    }
}
