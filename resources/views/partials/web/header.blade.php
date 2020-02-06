<header class="site-header inner-page-header">
    <div class="container-main">
        <div class="mobile-overlay"></div>
        <a href="{{ route('dashboardPage')}}" class="site-logo"><img src="{{ asset('images/web/logo-main.svg') }}" alt="img"></a>
        <div class="header-nav">
            <nav>

                <ul> 
                    @unless(Auth::guard('user')->check())
                    <li class="mobile-login"><a href="{{ route('login')}}">Login</a></li>
                    @endunless                    
                    <!--<li class=" {{ ((Request::is('user/howItWorks')))? 'active' : '' }}"><a href="{{ route('How it works')}}">How It Works</a></li>-->


                    <li class="">
                            <a href="{{route('How it works')}}">How It Works</a>
                            <ul class="dropdown-nav logout-dropdown">

                                <li><a href="{{route('How it works')}}#process">Our Process</a></li>
                                <li><a href="{{route('How it works')}}#faq">FAQ</a></li>

                            </ul>
                        </li>

                    <li class="get-quote"><a href="javascript:void(0)">Get Quote</a></li>
                    <li class=" {{ ((Request::is('user/player')))? 'active' : '' }}">
                        <a href="{{ route('players')}}">Players</a>
                    </li>
                    <li class=" {{ ((Request::is('user/fansureIndex')))? 'active' : '' }}"><a href="{{ route('Sit Risk Index')}}">Fansure Index</a></li>                            
                    <li class=" {{ ((Request::is('user/aboutUs')) || Request::is('user/aboutUs/team') || Request::is('user/aboutUs/join')) ? 'active' : '' }}">
                        <a href="{{ route('aboutUs')}}">About</a>
                        <ul class="dropdown-nav logout-dropdown">
                            <li><a href="{{ route('aboutUs')}}" @if (Request::is('user/aboutUs')) class="active" @endif >About Us</a></li>
                            <li><a href="{{ route('aboutUs-MeetOurTeam')}}" @if (Request::is('user/aboutUs/team')) class="active" @endif >Meet Our Team</a></li>
                            <li><a href="{{ route('aboutUs-JoinOurTeam')}}" @if (Request::is('user/aboutUs/join')) class="active" @endif >Join Our Team</a></li>
                        </ul>
                    </li>
                    @if (Auth::guard('user')->check())
                    
                    <li class="claim-refund {{ ((Request::is('user/requestRefund')))? 'active' : '' }}"><a href="{{ route('Request Refund')}}">Request Claim</a></li>
                    <li class="dekstop-logout">
                        <div class="logout-profile">
                           <?php  $userArr = \App\Model\Admin\UserProfile::where('user_id', Auth::guard('user')->user()->id)->get()->first(); 
                           if(isset($userArr) && $userArr->user_image != NULL){
                           ?>
                            <img src="{{ $userArr->user_image }}" alt="">
                           <?php
                            }
                            else{
                            ?>        
                             <img src="" alt="">
                            <?php 
                           }
                           ?>

                        </div>

                        <ul class="dropdown-nav logout-dropdown">
                            <li><a href="{{ url('/user/viewProfile') }}">View Profile</a></li>
                            <li><a href="{{ url('/user/changePassword') }}">Change Password</a></li>
                            <li><a href="{{ url('userlogout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout</a></li>
                        </ul>

                        <form id="logout-form" action="{{ url('/user/logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                    @else
                    <li class="deskstop-login"><a href="{{ route('login')}}">Login</a></li>
                    <li class="claim-refund {{ ((Request::is('user/requestRefund')))? 'active' : '' }}"><a href="{{ route('Request Refund')}}">Request Claim</a></li>
                    @endif
                </ul>
            </nav>
            <div class="mobile-right-item">
                @if (Auth::guard('user')->check())        
                    <div class="mobile-menu-custom">
                        <div class="logout-profile">
                            {{-- <img src="{{ asset('images/dummy-img.png') }}" alt="user image" /> --}}
                        </div>
                        <ul class="dropdown-nav logout-dropdown">
                            <li><a href="{{ url('/user/viewProfile') }}">View Profile</a></li>
                            <li><a href="{{ url('/user/changePassword') }}">Change Password</a></li>
                            <li><a href="{{ url('userlogout') }}" 
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                Logout</a>
                            </li>
                        </ul>

                        <form id="logout-form" action="{{ url('/user/logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </div>
                @endif

                <button class="header-search-btn"><img src="{{ asset('images/web/search-icon.svg') }}"></button>
                <span class="mobile-menu"><span></span></span>
            </div>
            <!-- mobile-right-item -->
            <button class="header-search-btn search-hide-mb"><img src="{{ asset('images/web/search-icon.svg') }}"></button>
        </div>
    </div>
</header>
