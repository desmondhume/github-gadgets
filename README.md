github-gadgets
==============

###This readme is already out of date, will be updated asap.

Simple proxy for ajax calls to github contributions api.
The app is now deployed on heroku at:
[http://vast-meadow-7354.herokuapp.com](http://vast-meadow-7354.herokuapp.com)

It only accepts OPTIONS call to "/:username" route, where :username is your github username.

##Example
```
$.ajax({
  type: "OPTIONS",
  url: "http://vast-meadow-7354.herokuapp.com/desmondhume",
  success: function( response ){
    console.log(response)
  }
});

// returns array containing an array for each day of the year, in the format [date,total_contributions]

[["2013/04/19",0],["2013/04/20",0],["2013/04/21",0], ...]
```

The intention is to return a full-crafted html containing interactive calendar graph, like the github's one.