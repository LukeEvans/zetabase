fetchHtml = function(url, callback) {
   var result = HTTP.get(url);
   callback(result);
}
