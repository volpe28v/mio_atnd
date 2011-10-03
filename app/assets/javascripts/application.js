// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var pre_nickname = "";
function pre_regist_search_joined(){
  var nickname = $("#follower_nickname").val();
  if (nickname == "" || nickname == pre_nickname){ return };

  // 同一ニックネームでの重複検索を防ぐため、少し間をおいて再度入力チェックする
  setTimeout("pre_regist_search_joined_impl()",500) 
}

function pre_regist_search_joined(){ 
  var nickname = $("#follower_nickname").val();
  if (nickname == "" || nickname == pre_nickname){ return };
  pre_nickname = nickname;

  $("#pre_regist_search_result").empty();

  var result_div = document.createElement('div');
  result_div.charset = 'utf-8';
  result_div.id = nickname + "_joined";
  $("#pre_regist_search_result").append(result_div);

  var loading = document.createElement('img');
  loading.id = nickname + "_joined_loading";
  loading.src = '/assets/ajax-loader.gif'
  $("#pre_regist_search_result").append(loading);

  search_joined(nickname);
}

function search_joined(nickname){
  var URL = "http://api.atnd.org/events/";
  URL += "?format=jsonp";
  URL += "&callback=" + nickname + "_joined_callback";
  URL += "&nickname=" + nickname;
  URL += "&count=100";

  var callback_js = document.createElement('script');
  callback_js.charset = 'utf-8';
  callback_js.type = 'text/javascript';
  callback_js.text = 'function ' + nickname + '_joined_callback(data){ twi_callback("' + nickname + '", data);}';
  document.body.appendChild(callback_js);

  var ADDJS = document.createElement('script');
  ADDJS.charset = 'utf-8';
  ADDJS.src = URL;
  document.body.appendChild(ADDJS);
}

function twi_callback(nickname, data){
  var events_title = "<table>";
  for( i = 0; i < data.events.length; i++){
    if ( is_from_now(data.events[i].started_at) ) {
      events_title += '<tr><td>' + get_title_link( nickname, data.events[i]) + '</td>' + 
                      '<td align="right">' + get_capacity(data.events[i])  + '</td></tr>';
    }
  }
  events_title += "</table>";

  $("#" + nickname + "_joined_loading").hide();
  $("#" + nickname + "_joined").append(events_title);
  $("#" + nickname + "_joined").show('normal');
}

function get_title_link( nickname, event_data){
  var title = event_data.started_at.split("T")[0] + " : " + event_data.title;
  var admin_class = "joined";
  if (nickname == event_data.owner_nickname) {
    admin_class = "holded";
  }
  return '<span class="' + admin_class + '"><a href="' + event_data.event_url + '">' + title + '</a></span>'; 
}

function get_capacity( event_data ){
  var entry = Number(event_data.accepted) + Number(event_data.waiting);
  var limit = Number(event_data.limit);
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
  var all_time = target_time.split("T")[0]
  var target_year  = Number(all_time.split("-")[0]);
  var target_month = Number(all_time.split("-")[1]) - 1 ;
  var target_day   = Number(all_time.split("-")[2]);
  var target_date = new Date(target_year, target_month, target_day);
  if ( target_date >= now ){
    //alert(target_date + "\n" + now + "\n" + all_time + " " + target_day)
    return true;
  }else{
    return false;
  }
}
