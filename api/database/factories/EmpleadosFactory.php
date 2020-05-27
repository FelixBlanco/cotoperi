<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Empleado::class, function (Faker $faker) {
    return [
        'username' => $faker->name, 
        'ubicacion' => 'Venezuela',
        'user_id' => '2'
    ];
});
