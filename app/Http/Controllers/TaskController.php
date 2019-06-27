<?php

namespace App\Http\Controllers;

use App\Task;
use App\Comment;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        return Task::where('status','0')->with('children')->with('comments')->with('assigned_user')->with('request_user')->get();
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'contents' => ['required', 'string'],
            'assigned_user_id' => ['required', 'integer'],
            'parent_task_id' => ['integer','nullable'],
        ]);

        $task = Task::create([
            'contents' => $validatedData['contents'],
            'request_user_id' => \Auth::user()->id,
            'assigned_user_id' => $validatedData['assigned_user_id'],
            'parent_task_id' => $validatedData['parent_task_id'],
        ]);

        return Task::where('status','0')->with('children')->with('comments')->with('assigned_user')->with('request_user')->get();
    }
    public function comment(Request $request)
    {
        $validatedData = $request->validate([
            'comment' => ['required', 'string'],
            'task_id' => ['required', 'integer'],
        ]);

        $task = Comment::create([
            'comment' => $validatedData['comment'],
            'task_id' => $validatedData['task_id'],
            'user_id' =>  \Auth::user()->id,
        ]);

        return Task::where('status','0')->with('children')->with('comments')->with('assigned_user')->with('request_user')->get();
    }
    public function done(Request $request)
    {
        $validatedData = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $task = Task::find($validatedData['id']);
        $task->status = 1;
        $task->save();

        return Task::with('children')->with('comments')->with('assigned_user')->with('request_user')->get();
    }
}
