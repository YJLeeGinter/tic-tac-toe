var body = document.body;
var table = document.createElement('table');
// 배열이나 객체는 데이터를 표현할 때 많이 사용한다

var colArr = [];
var rowArr = []; 
var turn = 'X';
var result = document.createElement('div');

var victory;

function checkResult(whichRow, whichCol){
   // 세칸 다 채워졌나?
    var victory = false;
   // check row
   if(colArr[whichRow][0].textContent === turn && 
     colArr[whichRow][1].textContent === turn && 
     colArr[whichRow][2].textContent === turn ){
     victory = true;
   }
   // check col
   if(colArr[0][whichCol].textContent === turn && 
     colArr[1][whichCol].textContent === turn && 
     colArr[2][whichCol].textContent === turn){
     victory = true;
   }
   // 대각선 검사

   if(colArr[0][0].textContent === turn &&
         colArr[1][1].textContent === turn &&
         colArr[2][2].textContent === turn ) 
        victory = true;

   if(colArr[0][2].textContent === turn &&
     colArr[1][1].textContent === turn &&
     colArr[2][0].textContent === turn) { // 대각선 검사 필요한 경우
    
        victory = true;
   }

   return victory;

}

function initialize(draw){
  
  if(draw){
    result.textContent = 'It\'s a draw';
  }else{
    result.textContent = turn + '님이 승리!';
  }
  // 초기화

  setTimeout(function(){
    result.textContent = '';
    colArr.forEach(function (row){
      row.forEach(function (col){
        col.textContent = '';
      } );
  });
  turn = 'X';
  }, 2000)
}

var callBack = function (event){ // when the colum is clicked
  if(turn === 'O'){ // when it is the computer's turn, the user can't click
    return;
  }
   
    // console.log(event.target); // col
    // console.log(event.target.parentNode); // row
    // console.log(event.target.parentNode.parentNode); // table

    var whichRow = rowArr.indexOf(event.target.parentNode);
    console.log('which row: ',whichRow);

    var whichCol = colArr[whichRow].indexOf(event.target);
    console.log('which col:', whichCol);

    if(colArr[whichRow][whichCol].textContent !== ''){ // 칸이 이미 채워져 있는가?
        console.log('빈칸이 아닙니다.');
        
    } 
    else { 
        console.log('빈칸입니다');
        colArr[whichRow][whichCol].textContent = turn;

        // to check whether every colum is full
       var victory = checkResult(whichRow, whichCol);

       var candidateColArr = [];

           colArr.forEach(function (row){
               row.forEach(function (col){
                candidateColArr.push(col);
                
              } );
          });
        
       candidateColArr = candidateColArr.filter(function (col) { return !col.textContent });  

        if(victory){ // 다 찼으면
          
          initialize();

        } else if(candidateColArr.length ===0){ // can't select a colum anymore
        
        initialize(true);

        }else{ // 다 안 찼으면

          setTimeout(function(){
          console.log('computer\'s turn');
            // select one empty colum  
            var random = true;
            var slectedCol;
            var whichRow;
            var whichCol; 
          
            var leftDiagonalLine = [];       
            var rightDiagonalLine = [];

            var tempArrForCheckCol = [];
            var tempArr;
          for(var p=0; p <3; p +=1){
             tempArr=[];
            for(var q=0; q <3; q +=1){
              tempArr.push(colArr[q][p]);
            }
            tempArrForCheckCol.push(tempArr);
          }       

          for(var n =0; n <3; n +=1){
            leftDiagonalLine.push(colArr[n][n]);
            rightDiagonalLine.push(colArr[n][2-n]);
          }        
          
          var lineObj ={
            row1 : colArr[0],
            row2 : colArr[1],
            row3 : colArr[2],
            col1 : tempArrForCheckCol[0],
            col2 : tempArrForCheckCol[1],
            col3 : tempArrForCheckCol[2],
            left : leftDiagonalLine,
            right : rightDiagonalLine,
          };   
          
          function checkObject(turn, num, emptyColNum){
            var filteredObj ={};
             Object.keys(lineObj).forEach(function(key) {
              var turnChecked = lineObj[key].filter((ele) => ele.textContent === turn);
              var emptyColChecked = lineObj[key].filter((ele) => ele.textContent === '');

              if(turnChecked.length === num && emptyColChecked.length === emptyColNum){ 
                  filteredObj[key] = lineObj[key];   
                }                              
            })
            console.log(filteredObj);
            return filteredObj;
          }
          
          var twoOsObj = checkObject('O', 2, 1);
          console.log('two OO : ', twoOsObj);
          var twoXsObj = checkObject('X', 2, 1);
          console.log('two XX : ', twoXsObj);
          var oneOObjet = checkObject('O', 1, 2);
          console.log('one O : ', oneOObjet);


          function checkRow(rowIndex, emptyColIndex){
              slectedCol = colArr[rowIndex][emptyColIndex];
              slectedCol.textContent = 'O';
              victory = checkResult(rowIndex, emptyColIndex);
              console.log('행 체크');
          }

          function checkCol(emptyColIndex, colIndex){
              slectedCol = colArr[emptyColIndex][colIndex];
              slectedCol.textContent = 'O';
              victory = checkResult(emptyColIndex, colIndex);
              console.log('열 체크');
          }

          function checkLeft(emptyColIndex, emptyColIndex){
            slectedCol = colArr[emptyColIndex][emptyColIndex];
            slectedCol.textContent = 'O';
            victory = checkResult(emptyColIndex, emptyColIndex);
            console.log('대각선 체크');
          }

          function checkRight(emptyColIndex, emptyColIndex){
            var rightIndexCol = 2-emptyColIndex;
            slectedCol = colArr[emptyColIndex][rightIndexCol];
            slectedCol.textContent = 'O';
            victory = checkResult(emptyColIndex, rightIndexCol);
            console.log('대각선 체크');
          }

          function checkPos(randomKey, emptyColIndex){
            switch(randomKey){
              case 'row1' : checkRow(0, emptyColIndex);
              break;
              case 'row2' : checkRow(1, emptyColIndex);
              break;
              case 'row3' : checkRow(2, emptyColIndex);
              break;
              case 'col1' : checkCol(emptyColIndex, 0);
              break;
              case 'col2' : checkCol(emptyColIndex, 1);
              break;
              case 'col3' : checkCol(emptyColIndex, 2);
              break;
              case 'left' : checkLeft(emptyColIndex, emptyColIndex);
              break;
              case 'right' : checkRight(emptyColIndex, emptyColIndex);
              break;
            }
          }

          function startCheck(objElement){
            var indicator = Object.getOwnPropertyNames(objElement); 
            var randomKey = indicator[Math.floor(Math.random() * indicator.length)]; 
            console.log(randomKey);     

            var emptyColIndex = lineObj[randomKey].findIndex((ele) => ele.textContent === '');
                      
            checkPos(randomKey, emptyColIndex);    
          }

          if(Object.keys(twoOsObj).length !== 0){
               
            startCheck(twoOsObj);
            twoXsObj = {};
            oneOObjet = {};  
            random = false;          
          }

          if(Object.keys(twoXsObj).length !== 0 ){
           
            startCheck(twoXsObj);
            oneOObjet = {};   
            random = false;         
          }

          if(Object.keys(oneOObjet).length !== 0 ){
            
            random = false;                       
          }         
                 
        if(random) { // random
        slectedCol = candidateColArr[Math.floor(Math.random() * candidateColArr.length )];
        slectedCol.textContent = 'O'; 
        whichRow = rowArr.indexOf(slectedCol.parentNode);
        whichCol = colArr[whichRow].indexOf(slectedCol);
        
        victory = checkResult(whichRow, whichCol);
        }           
          
          // to check whether the computer won!

        if(victory){ // 다 찼으면
         initialize();
        }

          // give over the turn to the user. 
          turn = 'X';
          },1000); // 컴퓨터의 턴

           if(turn === 'X'){
                turn = 'O';
            }else if(turn === 'O'){
                turn = 'X';
            } 
        }    
    }
}

// 표를 프로그래밍의 데이터로 시뮬레이션을 한다
// 코드랑 화면이랑 매치
// 코드랑 화면 쌍방향 대응. 조작했을때
for(var i =0; i<3; i +=1){
    var row = document.createElement('tr');
    rowArr.push(row);
    colArr.push([]);

    for(var j =0; j <3; j +=1){
        var col = document.createElement('td');
        col.addEventListener('click', callBack);

        colArr[i].push(col);
        row.appendChild(col);
    }
    table.appendChild(row); 
}

body.append(table);
body.append(result);

console.log('row: ',rowArr);
console.log('colums: ',colArr);

