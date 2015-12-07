

function Twittler(){
	var lastTweetIndex;

	this.setLastTweetIndex = function (tweetIndex){
	this.lastTweetIndex = tweetIndex;
	}

	this.getLastTweetIndex = function (){
	return this.lastTweetIndex;
	}

	this.tweets = function(startIndex, endIndex){

		//show all tweets
		$('.singleTweet').show();
		$('#newTweetsButton').text('0 New Tweets');
		
		 while(endIndex >= startIndex){
          var tweet = streams.home[endIndex];
          
          var $tweet = $('<div data-user ='+tweet.user+'></div>');
          $tweet.attr('class','singleTweet');

          var tweetHeader = $('<div></div>');
          tweetHeader.text('@' + tweet.user);
          tweetHeader.attr('class','tweetHeader');
          tweetHeader.on('click', filterUser);
          
          var tweetContent = $('<div></div>');
          tweetContent.text(tweet.message +' time:'+tweet.created_at);
          tweetContent.attr('class','tweetContent');

          tweetHeader.appendTo($tweet);
          tweetContent.appendTo($tweet);
     
          $tweet.prependTo($('#timeline'));
          endIndex--;
        }
	}
}

function filterUser(){
	var user = $(this).parent().data('user');
	console.log(user);
	var filteredTimeline = $('#timeline').children('div');
		
	$('.singleTweet').hide();
	
	filteredTimeline.filter(function(){return $(this).data('user') === user;}).show();
}

function updateNewTweetsNumber(obj){
    	var lastTweetIndex = obj.getLastTweetIndex();
    	var allTweetsNumber = streams.home.length;    	
    	var newTweetsNumber = allTweetsNumber - lastTweetIndex;
    	$('#newTweetsButton').text(newTweetsNumber+' New Tweets');
		setTimeout(function(){updateNewTweetsNumber(obj);}, 10000);
	}

