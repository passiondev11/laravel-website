<div class="popuptable">
    <div class="popupcell">
        <div class="popinnercontent">
            <img src="{{ asset('images/web/cross.png') }}" class="crossimg close-detailpop">
            <div class="popinnercontentblock">
                <div class="popleftimg-blk">
                    <div class="popleftgame">
                        <div class="popimg-block">
                            <div class="popinnerimg-block">
                                <img src="{{ $playerdetail->player_image ?? '' }}">
                            </div>
                        </div>
                        <div class="popimgdetail">
                            <h2>{{ $playerdetail->player_name ?? "" }}</h2>
<!--                                <small>Next Game</small>
                            <div class="popblkcontent">
                                Cleveland Cavaliers
                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="poprightimg-blk fansure-this-blk">
                    <div class="popleftgame formblockpop">
                        <form action="{{ url('api/getPlayerQuote') }}" class="getQuote" method="POST">
                            {{ csrf_field() }}
                            <input class="bn-input search" type="hidden" name="player_name" placeholder="Player Name" value="{{ $playerdetail->player_name ?? "" }}">
                            <input type="hidden" class="player_id" name="player_id" value="{{ $playerdetail->id ?? "" }}">  
                            <h2>PROTECT ANOTHER GAME</h2>
                            <div class="popfieldblock">
                                <div class="popinputblockrow">
                                    <div class="popinnercol">
                                        <img src="{{ asset('images/web/calic.png') }}">
                                        <input type="text" class="game_date player_date "  name="game_date" placeholder="Game Date" readonly="readonly">
                                        <span class="error"></span>
                                    </div>
                                </div>
                                <div class="popinputblockrow">
                                    <div class="popinnercol">
                                        <img src="{{ asset('images/web/ticket.png') }}">                    
                                        <input class="ticket_price" type="text" maxlength="8" name="ticket_price" placeholder="Ticket Price" val="" autocomplete="off">  
                                        <span class="error"></span>
                                    </div>
                                </div>
                                <div class="btn-block-main">
                                    <input class="getaquote getQuoteButton" type="button" value="GET A QUOTE">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>