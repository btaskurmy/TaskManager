
let myChart;

let t = [0,0,0,0,0];
let taskindex = -1;

let contents = ["残り時間"];
let colors = [];

let ctx = document.getElementById('myChart').getContext('2d');
addPiechart(ctx);

let taskcount = -1;
let tasks = document.getElementById("tasks");


let newtask = document.getElementById("newtask");



newtask.setAttribute("value", "New Task");

function addPiechart(ctx){
    myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: contents,
        datasets: [{
            data: [60],
            backgroundColor: [
                "rgba(128, 128, 128, 0.2)"
            ],
            borderColor: [
                "rgba(128, 128, 128, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            animateScale: true
        },
    }
    });

}

setInterval(function(){
    myChart.data.datasets[0].data = [60];
    myChart.update();
},1000);


function addTask(){
    
    let textvalue = newtask.value;
    taskcount ++;

    if(!textvalue){return;}

    let task = document.createElement("div");
    task.className = "task";


    //タイトル作成
    let h2 = document.createElement("h2");
    h2.innerHTML = textvalue;
    h2.setAttribute("style","display:inline;margin-right:8px;");
    task.appendChild(h2);



    //削除ボタン
    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = "Delete";
    deletebutton.onclick= ()=>deleteTask(h2,deletebutton,timer);
    task.appendChild(deletebutton);

    //タイマー追加
    let timer = createTimer();
    task.appendChild(timer);


    //グラフ更新
    contents.push(newtask.value);
    colors.push(colormap[taskindex]);
    myChart.data.labels.push(contents[taskindex]); // ラベルを追加
    myChart.data.datasets[0].backgroundColor.push(colors[taskindex]); // 色を追加
    myChart.update();


    tasks.appendChild(task);
    taskindex++;
}


function createTimer(){
    let countdownID = 0;
    //タイマー作成
    let timer = document.createElement("div");
    timer.className = "timer";
    let text = document.createElement("input");
    text.type = "text";
    text.placeholder = "目標時間"
    timer.appendChild(text);


    //現在の時間
    let hidesecond = document.createElement("input");
    hidesecond.style.display = "none";
    hidesecond.value = "none";

    let hideminute = document.createElement("input");
    hideminute.style.display = "none";
    hideminute.value = "none";

    let hidehour = document.createElement("input");
    hidehour.style.display = "none";
    hidehour.value = "none";



    //カウント表示用
    let count = document.createElement("p");
    count.textContent = "00:00:00";
    count.style.fontSize = 25;
    timer.appendChild(count);

    //スタートボタン
    let startbutton = document.createElement("button");
    startbutton.innerHTML = "Start";
    startbutton.onclick= ()=>{countdownID = countdown(text,hidesecond,hideminute,hidehour,count,countdownID,taskindex);}
    timer.appendChild(startbutton);

    //ストップボタン
    let stopbutton = document.createElement("button");
    stopbutton.innerHTML = "Stop";
    stopbutton.onclick= ()=>stopcount(countdownID);
    timer.appendChild(stopbutton);
    

    return timer;
}



function deleteTask(h2,deletebutton,timer){

    let confirm = window.confirm("Are you sure you want to delete this task?");
    if(confirm){
        h2.remove();
        deletebutton.remove();
        timer.remove();
        taskcount --;
    }
}



function countdown(text,hidesecond,hideminute,hidehour,count,countdownID,taskindex){
    
    
    let second = 0;
    let minute = 0;
    let hour = 0;

    if(countdownID != 0){
        stopcount(countdownID);
    }
    if(hidesecond.value != "none"){
        second = parseInt(hidesecond.value);
    }
    else{
        second = 0;
    }
    
    if(hideminute.value != "none"){
        minute = parseInt(hideminute.value);
    }
    else{
        minute = 0;
    }
    if(hidehour.value != "none"){
        hour = parseInt(hidehour.value);
    }
    else{
        hour = 0;
    }


    
    

    countdownID = setInterval(function(){
        t[taskindex]++;

        second++;
        if(second>59){
            second = 0;
            minute++;
        }
        if(minute>59){
            minute = 0;
            hour++;
        }
        
        count.textContent =  `${( '00' + hour ).slice( -2 )}:${( '00' + minute ).slice( -2 )}:${( '00' + second ).slice( -2 )}` 
        

        hidesecond.value = second;
        hideminute.value = minute;
        hidehour.value = hour;

        if(t[taskindex] >= parseInt(text.value)){
            count.style.color = "green";
            count.style.fontWeight = 900;
        }
    },1000)
    return(countdownID);
}
function stopcount(countdownID){
    clearInterval(countdownID);
}