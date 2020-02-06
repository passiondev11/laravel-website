<footer class="site-footer">
    <img src="{{ asset('images/web/footer-oval-top.png') }}" class="footer-oval-top">
    <div class="container-main">
        <a href="#" class="footer-logo not-active"><img src="{{ asset('images/web/footer-logo.png') }}"></a>
        <ul class="footer-menu">
            <li><a class="not-active" target="" href="javascript:void(0)">Blog</a></li>
            <li><a class="not-active" target="" href="javascript:void(0)">Reviews</a></li>
            <li><a target="" href="{{ route('Privacy Policy')}}">Privacy Policy</a></li>
            <li><a target="" href="{{ route('terms')}}">Terms & Conditions</a></li>
            <li><a target="" href="{{ route('contactUs')}}">Contact</a></li>
            <li><a class="claim-refund" target="" href="{{ route('Request Refund')}}">Request Claim</a></li>
            <li><a target="" href="{{ route('pressBox')}}">Press Box</a></li>            
        </ul>
        <ul class="footer-info">
            <li><a href="javascript:void(0)" class="not-active">(408) 634-0059</a></li>
            <li><a href="mailto: {{ config('app_constant.MAILUSAT')  }}">INFO@FANSURE.COM</a></li>
            <li><a href="javascript:void(0)" class="not-active">FANSURE INC.</a></li>
        </ul>
        <ul class="footer-social">
            <li><a href="https://www.facebook.com/fansureit/" class="active" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="https://www.twitter.com/fansure_nba" class="active" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="https://www.instagram.com/fansure_nba" class="active" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
        </ul>
    </div>
</footer>
