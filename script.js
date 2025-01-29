let boxes =document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let gameContainer = document.querySelector(".new-game")
let msg = document.querySelector("#msg");
let player = document.querySelector("#player1")
let score1 =document.querySelector(".score1");
let score2 =document.querySelector(".score2");
let box5 = document.querySelector("#box5")
let turnO =true;
let sc1=0.5;
let sc2=1;

const board=["","","","","","","","",""];

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO=true;
    enableBoxes(); 
    msgContainer.classList.add("hide");
    gameContainer.classList.add("hide");
    for(let i=0;i<9;i++){
      board[i]="";
    }
}

const computer=()=>{
    

     // 1. Check if AI can win in one move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = ai;
      if (checkWinner2(board) === ai) return i; // If AI can win, take the move
      board[i] = ""; // Undo move
    }
  }

  // 2. Check if the human can win in their next move, and block it
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = human;
      if (checkWinner2(board) === human) {
        board[i] = ai; // Block the human
        return i;
      }
      board[i] = ""; // Undo move
    }
  }

  // 3. Take the center if available
  if (board[4] === "") {
    board[4] = ai;
    return 4;
  }

  // 4. Take any available corner
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === "") {
      board[corner] = ai;
      return corner;
    }
  }

  // 5. Take any available side
  const sides = [1, 3, 5, 7];
  for (let side of sides) {
    if (board[side] === "") {
      board[side] = ai;
      
      return side;
    }
  }


  
}
boxes.forEach((box,index)=>{
    
    box.addEventListener("click",()=>{
    if(turnO){
        box.innerText="O";
        board[index]="O";
        turnO=false;
        box.style.color="red"; 
        box.disabled=true;
        let w=checkWinner();
        if(w!="O"){
            let a=computer();
        
            let c=0;
            boxes.forEach((box)=>{
                if(c==a){
                    box.innerText=ai;
                    box.style.color="green";
                    turnO=true;
                    box.disabled=true;
                   
                }
                c++;
            });
        }
          
    }
    else{
    }

    let t=checkWinner();
    if(t=="T"){
        msgContainer.classList.remove("hide");
    gameContainer.classList.remove("hide");
    }

    })


});


const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}


function showWinner(winner){
    if(winner=="O"){
        score1.innerText=sc1;
        sc1+=0.5;
    }
    if(winner=="X"){
        score2.innerText=sc2;
        sc2++;
    }
    msgContainer.classList.remove("hide");
    gameContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner=()=>{

for(let pattern of winPatterns){
let pos1Val=boxes[pattern[0]].innerText;
let pos2Val=boxes[pattern[1]].innerText;
let pos3Val=boxes[pattern[2]].innerText;
if(pos1Val!="" && pos2Val != "" && pos3Val !=""){
    if(pos1Val=== pos2Val && pos2Val === pos3Val){

        showWinner(pos1Val);
        return pos1Val;
    }
}
}
return board.includes("") ? null : "T";

};

newGameBtn.addEventListener("click",resetGame);
function checkWinner2(board) {
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let combo of winCombos) {
      if (
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        return board[combo[0]]; // Return the winner ('X' or 'O')
      }
    }
    return board.includes("") ? null : "tie"; // Return "tie" if no spaces left
  }


const getName = () => {
    let name = prompt("Please enter your name:");
    if (name) {
        alert(`Hello, ${name}!`);
        player.innerText=`${name} O sc1`;
        
    } else {
        alert("No name entered.");
    }
};

getName();



const human = "O"; // Human player symbol
const ai = "X";    // AI player symbol






