import colorMap from "./colorMap.js";
let currentcolor = 0;
var Tasks = {};
let percentage = 0;

// setInterval(function(){
//     datasets[0].data = [Task[0].time,60];
//     myChart.update();
// },1000)
//タスクを配列化し、Task[0].timeみたいに秒数を取り出す。

let newtask = document.getElementById("newtask");

newtask.value = "New Task";
newtask.setAttribute("value", "akjfgi");
let tasks = document.getElementById("tasks");
let myChart;
let ctx = document.getElementById('myChart').getContext('2d');
addPiechart(ctx);




function addTask(){
    
    
    Tasks[colorMap(currentcolor)]




    let textvalue = newtask.value;
    let countdownID = 0;

    if(textvalue){
        let task = document.createElement("div");
        task.className = "task";

        let h2 = document.createElement("h2");
        h2.textContent = newtask.value;
        h2.setAttribute("style","display:inline;margin-right:8px;");

        let timer = document.createElement("div");
        timer.className = "timer";
        let text = document.createElement("input");
        text.type = "text";
        text.placeholder = "目標時間"
        let hidetext = document.createElement("input");
        hidetext.style.display = "none";
        hidetext.value = "none";


        let hidesecond = document.createElement("input");
        hidesecond.style.display = "none";
        hidesecond.value = "none";

        let hideminute = document.createElement("input");
        hideminute.style.display = "none";
        hideminute.value = "none";

        let hidehour = document.createElement("input");
        hidehour.style.display = "none";
        hidehour.value = "none";



        



        let count = document.createElement("p");
        count.textContent = "00:00:00";
        count.style.fontSize = 25;

        let startbutton = document.createElement("button");
        startbutton.innerHTML = "Start";
        startbutton.onclick= ()=>{countdownID = countdown(text,hidetext,hidesecond,hideminute,hidehour,count,countdownID,rate,number);}
        startbutton.onclick= ()=>{number + 1;}
        let stopbutton = document.createElement("button");
        stopbutton.innerHTML = "Stop";
        stopbutton.onclick= ()=>stopcount(countdownID);

        let rate = document.createElement("h2");
        
        

        timer.appendChild(text);
        timer.appendChild(hidetext);
        timer.appendChild(count);
        timer.appendChild(startbutton);
        timer.appendChild(stopbutton);
        timer.appendChild(rate);


        let deletebutton = document.createElement("button");
        deletebutton.innerHTML = "Delete";
        deletebutton.onclick= ()=>deleteTask(h2,deletebutton,timer);

        

        task.appendChild(h2);
        task.appendChild(deletebutton);
        task.appendChild(timer);
        task.id = "task";

        tasks.appendChild(task);
        
    }
}
function deleteTask(h2,deletebutton,timer){

    alert("Are you sure you want to delete this task?");
    h2.remove();
    deletebutton.remove();
    timer.remove();
}



function countdown(text,hidetext,hidesecond,hideminute,hidehour,count,countdownID,rate){
    let time;
    let second = 0;
    let minute = 0;
    let hour = 0;
    let nowdate = new Date();

    if(countdownID != 0){
        stopcount(countdownID);
    }
    if(hidetext.value != "none"){
        time = parseInt(hidetext.value);
    }
    else{
        time = 0;
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


    setInterval(function(){
        let datasets = myChart.data.datasets;
        

        datasets[0].data = [time[0],60];
        myChart.update();
    })
    

    countdownID = setInterval(function(){
        time++;
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
        
        
        

        // percentage = second/86400;
        // percentage = percentage * 10000;
        // percentage = Math.round(percentage);
        // percentage = percentage / 10000;
        
        // rate.textContent = percentage + "%";

        hidetext.value = time;
        hidesecond.value = second;
        hideminute.value = minute;
        hidehour.value = hour;
        if(time >= parseInt(text.value)){
            count.style.color = "green";
            count.style.fontWeight = 900;
        }
    },1000)
    return(countdownID);
}
function stopcount(countdownID){
    clearInterval(countdownID);
}




function addPiechart(ctx){
    myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['赤', '青', '黄'],
        datasets: [{
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
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

