

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
          tweetHeader.text('@' + tweet.user +' - '+ formatDate(tweet.created_at));
          tweetHeader.attr('class','tweetHeader');
          tweetHeader.on('click', filterUser);
          
          var tweetContent = $('<div></div>');
          tweetContent.text(tweet.message);
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

function formatDate(fullDate){
	var currentDate = new Date();
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	var timeDifference = Math.abs(currentDate.getTime() - fullDate.getTime()); //time in milliseconds
	var DaysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); 

	var day = fullDate.getDay();
	var monthIndex = fullDate.getMonth();
	var year = fullDate.getFullYear();

	if(DaysDifference === 1){ //tweet within 24 hours
		var seconds = timeDifference/1000;
		var minutes = seconds/60;
		var hours = minutes/60;

		if(hours >= 1){
			return Math.ceil(hours) +' h ago';
		}else if(minutes >= 1){
			return Math.ceil(minutes)+' m ago';
		}else if(seconds >= 1){
			return Math.ceil(seconds)+' sec ago';
		}else{
			return 'few seconds ago';
		}

	}else if(currentDate.getFullYear() === year){ //tweet in same year
		return day+'-'+months[monthIndex];
	}else{
		return day+'-'+months[monthIndex]+'-'+year;
	}
		
}

function submitNewTweet(){
	window.visitor = 'maryam'; //set global windows variable
	var tweetContent = $('#newTweetInput').val();
	$('#newTweetInput').val('');
	writeTweet(tweetContent);
}

