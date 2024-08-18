auto();
history={};
console.show(true);

while(true){
    listBox=className("androidx.recyclerview.widget.RecyclerView").findOne(2000);
    if(!listBox){
        continue;
    }
    allList=listBox.children();
    for (var i = 0; i < allList.length; i++) {
       
        var user = allList[i];
        if(!user) continue;
        var content = user.text();
        if(!content) continue;
        content=content.replace(/\u200E/g, '').replace(/^[\*\s]+/,"").trim();
        if(history[content]) continue;
        //打印内容
        console.log(content);
        history[content]=1;
        if(history.length>200){
            history.pop();
        }
    }
    sleep(1000);
}