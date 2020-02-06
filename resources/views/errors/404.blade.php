@extends('layouts.404-layout')
@section('title')
    404 Not Found
@endsection
<section class="container-error">
    <div class="error-inner">    
        <img src="{{ asset('images/404.png') }}" alt="404 error" />
        <h2>Oops. Page not found.</h2>
        <p>We can’t seem to find the page you’re looking for.</p>
        @if(Request::is('admin/*'))
        <a href="{{url('admin/')}}" type="button" class="btn link-btn">Back to home</a>
        @else
        <a href="{{url('/')}}" type="button" class="btn link-btn">Back to home</a>
        @endif
    </div>
</section>
