<nav class="navbar fixed-top">
    <div class="container-fluid">
        <div class="left-item">
            <!-- <button class="navbar-toggler" type="button"><img src="{% static 'img/menu-bars.png' %}" alt="logo" /></button> -->

            <div class="header-logo"><a href="{{ url('/admin/user/userlist') }}"><img src="{{ asset('images/header-logo.png') }}" alt="logo" /></a></div>
        </div>

        <div class="right-item">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <i class="icon-profile"></i>
                    <span>Administrator</span>
                </button>
                <div class="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="{{ url('/admin/changePassword') }}"><i class="icon-key"></i> Change Password</a>
                    <a class="dropdown-item" href="{{ url('/admin/logout') }}"
                        onclick="event.preventDefault();
                                 document.getElementById('logout-form').submit();">
                        <i class="icon-logout"></i> Logout</a>
                        
                        <form id="logout-form" action="{{ url('/admin/logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                </div>
            </div>
        </div>
    </div>
    <!-- container-fluid -->
</nav>
