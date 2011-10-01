// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function search_from_twitter_id_joined(twitter_id){
  var URL = "http://api.atnd.org/events/";
  URL += "?format=jsonp";
  URL += "&callback=" + twitter_id + "_joined_callback";
  URL += "&twitter_id=" + twitter_id;
  URL += "&count=100";

  var callback_js = document.createElement('script');
  callback_js.charset = 'utf-8';
  callback_js.type = 'text/javascript';
  callback_js.text = 'function ' + twitter_id + '_joined_callback(data){ twi_callback("' + twitter_id + '", data);}';
  document.body.appendChild(callback_js);

  var ADDJS = document.createElement('script');
  ADDJS.charset = 'utf-8';
  ADDJS.src = URL;
  document.body.appendChild(ADDJS);
}

function twi_callback(twitter_id, data){
  var events_title = "<table>";
  for( i = 0; i < data.events.length; i++){
    if ( is_from_now(data.events[i].started_at) ) {
      events_title += '<tr><td>' + get_title_link( twitter_id, data.events[i]) + '</td>' + 
                      '<td align="right">' + get_capacity(data.events[i])  + '</td></tr>';
    }
  }
  events_title += "</table>";

  $("#" + twitter_id + "_joined_loading").hide();
  $("#" + twitter_id + "_joined").append(events_title);
  $("#" + twitter_id + "_joined").show('normal');
}

function get_title_link( twitter_id, event_data){
  var title = event_data.started_at.split("T")[0] + " : " + event_data.title;
  var admin_class = "joined";
  if (twitter_id == event_data.owner_twitter_id) {
    admin_class = "holded";
  }
  return '<span class="' + admin_class + '"><a href="' + event_data.event_url + '">' + title + '</a></span>'; 
}

function get_capacity( event_data ){
  var entry = parseInt(event_data.accepted) + parseInt(event_data.waiting);
  var limit = parseInt(event_data.limit);
  var capacity = "";
  if ( entry >= limit ){
    capacity = '<font color="red">' + entry + '/' + limit + '</font>';
  }else{
    capacity = '<font color="green">' + entry + '/' + limit + '</font>';
  }
  return capacity;
}

function is_from_now( target_time ){
  var now = new Date();
  var target_year  = parseInt(target_time.split("T")[0].split("-")[0]);
  var target_month = parseInt(target_time.split("T")[0].split("-")[1]);
  var target_day   = parseInt(target_time.split("T")[0].split("-")[2]);
  var target_date = new Date(target_year, target_month, target_day);
  if ( target_date >= now ){
    return true;
  }else{
    return false;
  }
}
