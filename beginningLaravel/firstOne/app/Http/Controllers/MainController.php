<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function home(){
        return view('home');
    }

    public function about(){
        return view('about');
    }

    public function review(){
        $reviews = new Contact();

        return view('review', ['reviews'=>$reviews->all()]);
    }
    #принимает запрос и проверяет его валидность
    public function review_check(Request $request){
        $valid = $request->validate([
            "email" => "required|min:4|max:100",
            "subject" => "required|min:4|max:100",
            "message" => "required|min:15|max:500"
        ]);

        #создается экземпляр класса Contact(наследует от Model)
        $review = new Contact();

        #заполняются свойства экземпляра
        $review->email = $request->input('email');
        $review->subject = $request->input('subject');
        $review->message = $request->input('message');
        #сохраняем экземпляр
        $review->save();

        return redirect()->route('review');
    }
}
