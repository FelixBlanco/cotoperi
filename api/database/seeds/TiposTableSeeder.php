<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipos')->insert([
            'tipo' => 'transferencia'
        ]);

        DB::table('tipos')->insert([
            'tipo' => 'Pago Movil'
        ]);
        
        DB::table('tipos')->insert([
            'tipo' => 'Otros'
        ]);        
    }
}
