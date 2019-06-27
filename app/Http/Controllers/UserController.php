<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        return User::all();
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'role' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:4', 'confirmed'],
        ]);

        $task = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'role' => $validatedData['role'],
            'password' => \Hash::make($validatedData['password']),
        ]);

        return User::all();
    }
    public function edit(Request $request)
    {
        $validatedData = $request->validate([
            'id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255',   Rule::unique('users')->ignore($request->id)],
            'role' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'min:4', 'confirmed'],
        ]);

        $user = User::find($validatedData['id']);
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->role = $validatedData['role'];
        if($validatedData['password']){
            $user->password = $validatedData['password'];
        }
        $user->save();


        return User::all();
    }
    public function delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        User::destroy($validatedData['id']);

        return User::all();
    }
}
