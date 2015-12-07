

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
		
		 while(startIndex <= endIndex){
          var tweet = streams.home[startIndex];
          
          var $tweet = $('<div data-user ='+tweet.user+'></div>');
          $tweet.attr('class','singleTweet');

          var tweetHeader = $('<div></div>');
          tweetHeader.attr('class','tweetHeader');

          var tweetHeaderUser = $('<div></div>');
          tweetHeaderUser.text('@' + tweet.user);
          tweetHeaderUser.on('click', filterUser);
          tweetHeaderUser.attr('id', 'tweetHeaderUser');

          var tweetHeaderDate = $('<div></div>');
          tweetHeaderDate.text(' - '+ formatDate(tweet.created_at));
          tweetHeaderDate.attr('data-date', tweet.created_at);
          tweetHeaderDate.attr('id', 'tweetHeaderDate');
          
          tweetHeaderUser.appendTo(tweetHeader);
          tweetHeaderDate.appendTo(tweetHeader);
          
          var tweetContent = $('<div></div>');
          tweetContent.text(tweet.message);
          tweetContent.attr('class','tweetContent');

          tweetHeader.appendTo($tweet);
          tweetContent.appendTo($tweet);
     
          $tweet.prependTo($('#timeline'));
          startIndex++;
        }
        updateTweetTimes();
	}
}

function filterUser(){
	var user = $(this).parent().parent().data('user');
	var filteredTimeline = $('#timeline').children('div');
		
	$('.singleTweet').hide();
	
	filteredTimeline.filter(function(){return $(this).data('user') === user;}).show();
	updateTweetTimes();
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

function submitNewTweet(twittler){
	window.visitor = 'maryam'; //set global windows variable
	var tweetContent = $('#newTweetInput').val();
	$('#newTweetInput').val('');
	if(tweetContent === ''){
		alert('Cannot tweet void!');
	}else{
		writeTweet(tweetContent);
	}

	var startIndex = twittler.getLastTweetIndex();
    var endIndex = streams.home.length - 1;
    twittler.setLastTweetIndex(endIndex+1);
    twittler.tweets(startIndex, endIndex);
    updateTweetTimes();
}

function updateTweetTimes(){
	
	var tweetTimes = $('#timeline').children('div').children('div').children('div').filter(function(){return $(this).data('date');});

	tweetTimes.each(function(index, obj){
		var date = $(this).attr('data-date');
		$(this).text(' - '+ formatDate(new Date(date)));
	});
}
