//set all wining position
const win_position = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// set whos player turn
let player_O = true;
let player_X = false;
let wining = false; // no one win now

// access all boxes by the help of queay selectors 0th ,1st, 2nd......
let all_boxes = document.querySelectorAll(".box");

//access all boxes by the help of forEach loop
all_boxes.forEach((box)=>{
    box.addEventListener('click',()=>{     //add click event
        if(player_O == true){
            box.style.color="rgb(11, 207, 11)";
            box.innerHTML="〇";
            player_O = false;
            player_X = true;
        }
        else{
            box.style.color="red";
            box.innerHTML="✖";
            player_X = false;
            player_O = true;
        }
        box.disabled=true;   // make the box disabled because we don't want to override the symbol on second click
        check_win();
        check_draw();
    })
})

//check winner
let check_win=()=>{
    for(posintion of win_position){
        if(all_boxes[posintion[0]].innerHTML !="" && all_boxes[posintion[1]].innerHTML !="" && all_boxes[posintion[2]].innerHTML !=""){
            if(all_boxes[posintion[0]].innerHTML === all_boxes[posintion[1]].innerHTML && all_boxes[posintion[1]].innerHTML === all_boxes[posintion[2]].innerHTML){
                all_boxes[posintion[0]].style.background="rgba(255, 78, 243, 0.625)";
                all_boxes[posintion[1]].style.background="rgba(255, 78, 243, 0.625)";
                all_boxes[posintion[2]].style.background="rgba(255, 78, 243, 0.625)";
                document.getElementById("t_score").innerHTML="Hurray! player "+all_boxes[posintion[0]].innerHTML+" win";
                wining=true;
                document.getElementById("new-game").style.display="block";  // enable the button  
                all_boxes.forEach((box)=>{  // after any one winning remaining box will be block or disabled
                    box.disabled=true;
                })
            }
        }
    }
}

//check_draw
let check_draw=()=>{
    let c=0;
    all_boxes.forEach((box)=>{
        if(box.innerHTML!=""){
            c+=1;
        }
    })
    if(c==9 && wining == false){
        document.getElementById("t_score").innerHTML="Match Draw ✖〇";
        document.getElementById("new-game").style.display="block";  // enable the button
    }
}

// reset the game
document.getElementById("new-game").addEventListener('click',()=>{
    player_O = true;
    player_X = false;
    wining=false;
    all_boxes.forEach((box)=>{
        box.disabled=false;
        box.innerHTML="";
        document.getElementById("t_score").innerHTML="Let's Start";  // return player turn
    })
    document.getElementById("new-game").style.display="none";

    // set default background color of the box
    all_boxes.forEach((box)=>{
        box.style.background="rgba(245, 245, 245, 0.89)";
    })
})