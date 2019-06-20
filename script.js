$(function() {
  getQuote();

  // quote button
  var buttonQuote = $("#trigger");
  buttonQuote.on("click", function() {
    getQuote();
  });

  // Tweet
  var buttonTweet = $("#tweet");
  buttonTweet.on("click", function() {
    sendTweet();
  });

  function getQuote() {
    if ($("#longQuote").is(":visible")) {
      $("#longQuote").hide("fast");
    }
    $.ajax({
      url:
        "https://api.forismatic.com/api/1.0/?key=1&method=getQuote&format=jsonp&lang=en&jsonp=?",
      method: "GET",
      dataType: "jsonp",
      success: function(data) {
        $("#quote").hide("fast");
        $("#author").hide("fast");
        $("#quote").text(data.quoteText);
        $("#author").text(data.quoteAuthor);
        $("#quote").show("slow");
        $("#author").show("slow");
      },
      error: function(xhr, status, error) {
        console.log(
          "xhr: " + xhr + "\nStatus: " + status + "\nError: " + error
        );
        $("#quote").text(
          "I'm not sure what happened there. Click again and let's see if that does the trick!"
        );
        $("#author").text("Your Trusty Browser");
      }
    });
  }
  function sendTweet() {
    url = "https://twitter.com/intent/tweet?text=";

    var tweetText = "Quote of the day - " + $("#quote").text();
    if (!$("#author").text().length) {
      tweetText += "Unknown author";
    } else {
      tweetText += " Author: " + $("#author").text();
    }
    if (tweetText.length > 140) {
      $("#longQuote").show("fast");
    } else {
      var tweet = url + encodeURIComponent(tweetText);
      $("#tweet").attr("href", tweet);
    }
  }
});
