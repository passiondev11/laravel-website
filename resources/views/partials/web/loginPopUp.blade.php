<div id="getAQuotePopUp">
    <div class="getquoteouter fansure-more-popup login-popup" style="display:none">
        <div class="getquote-inner">
            <a class="close-img fansure-more-close"><img src="{{ asset('images/web/close.svg') }}"></a>
            <div class="getquote-left">
                <div class="getquote-left-inside">
                    <h1>Why Pay if They Don't Play? </h1>
                    <p>Get Reimbursed If Your Favorite Player Sits Out.</p>
                </div>
            </div>
            <div class="getquote-right">
                
                <form class="form-horizontal" id="frmUserLogin" role="form" method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}
                    <div class="heading-auoth">Welcome Back! Sign In Here.</div>
                    <div class="sign-acc">or <a href="{{ route('register') }}">create an account.</a></div>
                    <div class="row-input">
                        <input id="email" type="email" name="email" placeholder="Email" spellcheck="" autocomplete="off">
                        @if ($errors->has('email'))
                            <span class="error-block">{{ $errors->first('email') }}</span>
                        @endif
                    </div>
                    <div class="row-input">
                        <input id="password" type="password" placeholder="Password" name="password">
                        @if ($errors->has('password'))
                            <span class="error-block">{{ $errors->first('password') }}</span>
                        @endif
                    </div>
                    <div class="Remember-pwd">
                        <div class="check-inp checkbox">
                            <input type="checkbox" id="logincheck" name="remember" {{ old('remember') ? 'checked' : '' }}> 
                            <label for="logincheck">Remember Me</label>
                        </div>
                        <a class="fgt-pwd" href="{{ url('/user/password/reset') }}">Forgot Password?</a>
                    </div>
                    <div class="row-input-submit">
                        <input type="submit" name="" value="Sign In">
                    </div>
                </form>    
            </div>
        </div>
    </div>
</div>  

