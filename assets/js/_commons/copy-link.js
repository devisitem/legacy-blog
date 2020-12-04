/*
* Copy current page url to clipboard.
* v2.1
* https://github.com/cotes2020/jekyll-theme-chirpy
* © 2020 Cotes Chung
* MIT License
*/

function copyLink(url) {
  if (!url || 0 === url.length)
  url = window.location.href;
  var $temp = $("<input>");

  $("body").append($temp);
  $temp.val(url).select();
  document.execCommand("copy");
  $temp.remove();

  alert("링크복사해줘서 고마워요~\r\n클립보드에 복사했어요.");
}
