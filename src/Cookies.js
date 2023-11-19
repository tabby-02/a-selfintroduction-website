function setCookie(cname,cvalue,exdays)//对应cookie名，cookie值，cookie过期日
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));//单位转换（24h,60min,60s,1000ms）
  var expires = "expires="+d.toGMTString();//expires--到期
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');//ca以;划分成数组
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();//用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);//indexOf()返回某个指定的字符串值在字符串中首次出现的位置。substring()用于提取字符串中介于两个指定下标之间的字符。
  }//如果名对应，则返回名之后到结尾的cookie的value
  return "";
}
function scrollback(){
    if(getCookie("scroll")!=null){//如果存在名为"scroll"的cookie
        document.documentElement.scrollTop=getCookie("scroll");
    }
}