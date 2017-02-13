var http = require('http')
var url = 'http://www.imooc.com/learn/384'

http.get(url, function(res){
    var html = ''

    res.on('data', function(data){
        html += data
    })

    res.on('end', function(){
        console.log(html)
    })
}).on('error', function(){
    console.error('获取数据出错！')
})
