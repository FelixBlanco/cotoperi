<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class authController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'       => 'required',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);
        
        $credentials = request(['email', 'password']);   

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $user = $request->user(); 

        try {
             
            $tokenResult = $user->createToken('Personal Access Token');

            $token = $tokenResult->token;
            
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
            
            $token->save();
            
            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'token_type'   => 'Bearer',
                'expires_at'   => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
            ],201);  

        } catch (\Exception $e) {            
            Log::error('Ha ocurrido un error en LoginController: '.$e->getMessage().', Linea: '.$e->getLine());
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }          
    }    
}
