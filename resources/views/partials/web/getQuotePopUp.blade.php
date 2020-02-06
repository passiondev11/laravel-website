<div id="getAQuotePopUp">
    <div class="getquoteouter fansure-more-popup" style="display:none">
        <div class="getquote-inner">
            <a class="close-img fansure-more-close"><img src="{{ asset('images/web/close.svg') }}"></a>
            <div class="getquote-left">
                <div class="getquote-left-inside">
                    <h1>Why Pay if They Don't Play? </h1>
                    <p>Get Reimbursed If Your Favorite Player Sits Out.</p>
                </div>
            </div>
            <div class="getquote-right">
                <h3>get a quote</h3>
                <form action="{{ url('api/getPlayerQuote') }}" class="getQuote" method="POST">
                    {{ csrf_field() }}
                    <div class="get-inp">
                        <img class="iconinp" src="{{ asset('images/web/user.svg') }}">
                        <input type="text" class="search home_search" name="player_name" placeholder="Player Name" maxlength="40">
                        <input type="hidden" class="player_id" name="player_id" value=""> 
                        <span class="error"></span>
                    </div>
                    <div class="get-inp">
                        <img class="iconinp" src="{{ asset('images/web/calender-icon.svg') }}">
                        <input class="game_date player_date"  name= "game_date" type="text" name="" placeholder="Game Date" readonly="readonly">
                        <span class="error"></span>
                    </div>
                    <div class="get-inp">
                        <img class="iconinp" src="{{ asset('images/web/tickets.svg') }}">
                        <div class="tooltip">
                            <img class="infoinp" src="{{ asset('images/web/info-icon.png') }}">
                            <div class="tooltiptext">Please enter the amount you paid per ticket (i.e. the cost of each ticket to be reimbursed).</div>
                        </div>
                        <input class="ticket_price" type="text" maxlength="8" name="ticket_price" placeholder="Ticket Price" val="" autocomplete="off">  
                        <span class="error"></span>
                    </div>
                    <div class="submit-btn">
                        <input class="fansure-more-submit getQuoteButton" type="button" value="submit">

                    </div>
                </form>    
            </div>
        </div>
    </div>
</div>  

