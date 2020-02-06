<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        @yield('title')
    </title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="description" content="">
    <meta name="robots" content="noindex, nofollow">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('../images/favicon.ico') }}">
    @include('partials.styles')
</head>

<body class="hold-transition sidebar-mini sidebar-collapse skin-dark">
<div id='app'></div>
    <div class="wrapper">

        @yield('content')
        @include('partials.scripts')
    </div>
</body>
</html>