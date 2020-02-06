<div id="mySidenav" class="sidenav">
<div id="sidebar_menu">
    <ul class="main-list">
        <li class="item-link {{ Request::is('admin/user/*') || Request::is('admin/insurance/viewprofile/*') ? 'active' : '' }} ">
            <a href="{{ route('userlist')}}" class="item-sub-link">
                <div class="side-img user-mange"></div> <span>User Management</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(Request::is('admin/insurance/viewprofile/*')) elseif(!Request::is('admin/user/*')) display:none  @endif">
                <li class="{{ Request::is('admin/user/userlist') || Request::is('admin/insurance/viewprofile/*') ? 'active-sub' : '' }} "><a href="{{ route('userlist')}}">User List</a></li>
                <li class="{{ Request::is('admin/user/guestuserlist') ? 'active-sub' : '' }} "><a href="{{ route('guestuserlist')}}">Guest User List</a></li>  
                <li class="{{ Request::is('admin/user/adduser') ? 'active-sub' : '' }} "><a href="{{ route('adduseradmin')}}">Add User</a></li>
            </ul>
        </li>
        <li class="item-link {{ Request::is('admin/insurance/*') &&  !Request::is('admin/insurance/viewprofile/*') ? 'active' : '' }}">
            <a href="#" class="item-sub-link">
                <div class="side-img ins-mange"></div>
                <span>Insurance Management</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(!Request::is('admin/insurance/*')) display:none @endif" >
                <li class="{{ Request::is('admin/insurance/viewList') ? 'active-sub' : '' }} "><a href="{{ route('viewList')}}">Insurance List</a></li>
            </ul>
        </li>
        <li class="item-link {{ Request::is('admin/team/*') ? 'active' : '' }} ">
            <a href="#" class="item-sub-link">
                <div class="side-img team-mange"></div>
                <span>Team Management</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(!Request::is('admin/team/*')) display:none @endif" >
                <li class="{{ Request::is('admin/team/addTeamView') ? 'active-sub' : '' }} "><a href="{{ route('addTeamView')}}">Add Team</a></li>
                <li class="{{ Request::is('admin/team/teamList') ? 'active-sub' : '' }} "><a href="{{ route('teamList')}}">Team List</a></li>
            </ul>
        </li>
        <li class="item-link {{ Request::is('admin/player/*') ? 'active' : '' }} ">
            <a href="{{ route('playerList')}}" class="item-sub-link">
                <div class="side-img player-mange"></div>
                <span>Player Management</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(!Request::is('admin/player/*')) display:none @endif" >
                <li class="{{ Request::is('admin/player/addPlayer') ? 'active-sub' : '' }} "><a href="{{ route('addPlayer')}}">Add Player</a></li>
                <li class="{{ Request::is('admin/player/playerList') ? 'active-sub' : '' }} "><a href="{{ route('playerList')}}">Player List</a></li>
            </ul>
        </li>
        <li class="item-link {{ Request::is('admin/claims/*') ? 'active' : '' }} ">
            <a href="#" class="item-sub-link">
                <div class="side-img claim-mange"></div>
                <span>Claim Requests</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(!Request::is('admin/claims/*')) display:none @endif" >
                <li class="{{ Request::is('admin/claims/requestList') ? 'active-sub' : '' }} "><a href="{{ route('claimRequests')}}">Claim Requests list</a></li>
            </ul>
        </li>
        <li class="item-link {{ Request::is('admin/promocode/*') ? 'active' : '' }} ">
            <a href="{{ route('promocodeList')}}" class="item-sub-link">
                <div class="side-img promo-mange"></div>
                <span>Promo Codes</span>
                <i class="icon-left-arrow"></i>
            </a>
            <ul class="sub-menu" style="@if(!Request::is('admin/promocode/*')) display:none @endif" >
                <li class="{{ Request::is('admin/promocode/addPromocode') ? 'active-sub' : '' }} "><a href="{{ route('addPromocode')}}">Add Promo Code</a></li>
                <li class="{{ Request::is('admin/promocode/promocodeList') ? 'active-sub' : '' }} "><a href="{{ route('promocodeList')}}">Promo Code List</a></li>
            </ul>
        </li>
    </ul>
</div>
</div>