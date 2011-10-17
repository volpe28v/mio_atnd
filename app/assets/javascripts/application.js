// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

//var pre_nickname = "";
var pre_regist_search_joined = function(){
  var pre_nickname = "";

  return function(){
    var nickname = $("#follower_nickname").val();
    if (nickname == "" || nickname == pre_nickname){ return };

    // 同一ニックネームでの重複検索を防ぐため、少し間をおいて再度入力チェックする
    setTimeout( function(){

      var nickname = $("#follower_nickname").val();
      if (nickname == "" || nickname == pre_nickname){ return };
      pre_nickname = nickname;

      put_placeholder_by( nickname );
      search_joined_by( nickname );
    }, 100);
  }
}();

function put_placeholder_by(nickname){
  $("#pre_regist_search_result").empty();

  var result_div = document.createElement('div');
  result_div.charset = 'utf-8';
  result_div.id = nickname + "_joined";
  $("#pre_regist_search_result").append(result_div);
  $("#" + nickname + "_joined").hide();

  var loading = document.createElement('img');
  loading.id = nickname + "_joined_loading";
  loading.src = '/assets/ajax-loader.gif'
  $("#pre_regist_search_result").append(loading);
}

function search_joined_by(nickname){
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
  var event_result = ""
  if ( Number(data.results_returned) == 0 ){
    event_result = '<em><font color="red">このユーザは存在しません</font></em>';
  }else{
    var event_array = []
    for(var i = 0; i < data.events.length; i++){
      if ( is_from_now(data.events[i].started_at) ) {
        event_array.push({
                           date: data.events[i].started_at, 
                           title: '<tr><td>' + get_title_link( nickname, data.events[i]) + '</td>' + 
                                  '<td align="right">' + get_capacity(data.events[i])  + '</td></tr>'
                         })
      }
    }
    if (event_array.length == 0){
      event_result = '<em><font color="#aaa">参加予定のイベントはありません</font></em>'
    }else{
      event_array.sort(function(a, b) {return b["date"] < a["date"] ? 1 : -1;});

      event_result = '<table width="100%">';
      for (var i = 0; i < event_array.length; i++) {
        event_result += event_array[i]["title"]
      }
      event_result += "</table>";
    }
  }

  $("#" + nickname + "_joined_loading").hide();
  $("#" + nickname + "_joined").append(event_result);
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
  var all_time = target_time.split("T")[0]
  var target_year  = Number(all_time.split("-")[0]);
  var target_month = Number(all_time.split("-")[1]) - 1 ;
  var target_day   = Number(all_time.split("-")[2]);
  var target_date = new Date(target_year, target_month, target_day);

  var now = new Date();
  var now_year = now.getYear();
  if ( now_year < 2000 ){ now_year += 1900 }
  var now_date = new Date(now_year, now.getMonth(), now.getDate());

  if ( target_date >= now_date ){
    //alert(target_date + "\n" + now_date + "\n" + all_time + " " + target_day)
    return true;
  }else{
    return false;
  }
}

function deleteFollower( id ){
  $("#follower_" + id).fadeOut();

}

