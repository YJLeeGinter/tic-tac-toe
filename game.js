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

function checkXandO(arr){
  var emptyCol;
  var emptyColIndex;
  var twoXsRow ;
  var oneORow;
  var twoOxRow ;

  console.log(arr);

  emptyCol = arr.filter((ele) => ele.textContent === '').length;
  // console.log(emptyCol);
  if(emptyCol === 1){
    emptyColIndex = arr.findIndex((ele)=> ele.textContent === '' );
    // console.log(emptyColIndex);
    twoOxRow = arr.filter(function(ele){
      return ele.textContent === 'O';
    }).length;

    twoXsRow = arr.filter(function(ele){
      return ele.textContent === 'X';
    }).length;
      
    if(twoOxRow === 2){
      console.log('O 인덱스 반환');
      return emptyColIndex;
    }  

    if(twoXsRow === 2){
        console.log('X 인덱스 반환');
        return emptyColIndex;
      } // O와 X가 둘다 2일때 버그 발생!     
    }   
}

function checkO (arr){
  var emptyCol;
  var emptyColIndex;
  var oneORow;

  console.log(arr);

  emptyCol = arr.filter((ele) => ele.textContent === '').length;
  // console.log(emptyCol);
  if(emptyCol === 2){
    oneORow = arr.filter(function(ele){
      return ele.textContent === 'O';
    }).length;    

    emptyColIndex = arr.findIndex((ele)=> ele.textContent === '' );
    // console.log(emptyColIndex);
    
      
    if(twoOxRow === 1){
      console.log('O 인덱스 반환');
      return emptyColIndex;
    }  
     
    }  
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
        
     /*   candidateColArr.forEach(function(row, index){
          candidateColArr[index] = candidateColArr[index].filter(function (col) { return !col.textContent }); 
                })*/

      //  console.log(candidateColArr);

        if(victory){ // 다 찼으면
          
          initialize();

        } else if(candidateColArr.length ===0){ // can't select a colum anymore
        
        initialize(true);

        }else{ // 다 안 찼으면

          setTimeout(function(){
          console.log('computer\'s turn');
            // select one empty colum  
            var flag = true;
            var slectedCol;
            var whichRow;
            var whichCol; 
            var order;
            var checkArr =[];
            var leftDiagonalLine = [];
            var rightDiagonalLine = [];

          for(var n =0; n <3; n +=1){
            leftDiagonalLine.push(colArr[n][n]);
            rightDiagonalLine.push(colArr[n][2-n]);
          }
          checkObject.left = leftDiagonalLine;
          console.log(checkObject);

          var tempArrForCheckCol = [];
          var tempArr;
          for(var p=0; p <3; p +=1){
             tempArr=[];
            for(var q=0; q <3; q +=1){
              tempArr.push(colArr[q][p]);
            }
            tempArrForCheckCol.push(tempArr);
          }
        // 행체크하고 나서 O가 2개 있으면 

        if(flag){ // 행 체크
           for(var s =0; s <3; s +=1){
            var rowColIndex = checkXandO(colArr[s]);
            if(rowColIndex || rowColIndex === 0){
            flag = false;              
            slectedCol = colArr[s][rowColIndex];
            slectedCol.textContent = 'O';
            victory = checkResult(s, rowColIndex);
            console.log('행 체크');
            break;
           }
         }
        }

        if(flag){ // 열 체크         
          
          for(var z =0; z <3; z +=1){
            var colRowIndex = checkXandO(tempArrForCheckCol[z]);
              if(colRowIndex || colRowIndex === 0){
              flag = false;              
              slectedCol = colArr[colRowIndex][z];
              slectedCol.textContent = 'O';
              victory = checkResult(colRowIndex, z);
              console.log('열 체크');
              break;
              }  
          }           
        }

        
        if(flag){ // 왼쪽 대각선 체크
          
          var leftIndexRowCol = checkXandO(leftDiagonalLine);

          if(leftIndexRowCol || leftIndexRowCol === 0){ // 0은 거짓 값이라서 0인 경우 작동 안함
            flag = false;   
            slectedCol = colArr[leftIndexRowCol][leftIndexRowCol];
            slectedCol.textContent = 'O';
            victory = checkResult(leftIndexRowCol, leftIndexRowCol);
            console.log('대각선 체크');
          } 
        }

        if(flag){ // 오른쪽 대각선 체크
          var rightIndexRow = checkXandO(rightDiagonalLine);

          if(rightIndexRow || rightIndexRow === 0){
            flag = false;                     
            var rightIndexCol = 2-rightIndexRow;
            slectedCol = colArr[rightIndexRow][rightIndexCol];
            slectedCol.textContent = 'O';
            victory = checkResult(rightIndexRow, rightIndexCol);
            console.log('대각선 체크');
          }

        }
                    
        if(flag) { // random
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

