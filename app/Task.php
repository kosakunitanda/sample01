<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $fillable = [
        'contents', 'assigned_user_id','request_user_id', 'parent_task_id'
    ];

    public function children()
    {
        return $this->hasMany('App\Task', 'parent_task_id', 'id');
    }
    public function assigned_user()
    {
        return $this->hasOne('App\User', 'id', 'assigned_user_id');
    }
    public function request_user()
    {
        return $this->hasOne('App\User', 'id', 'request_user_id');
    }
    public function comments()
    {
        return $this->hasMany('App\Comment')->with('user');
    }
}
