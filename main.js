import { possibleblock, kill_block_set } from "./piece-movement.js";
import { pawn_Move_locate } from "./piece-movement.js";
import { rook_Move_locate } from "./piece-movement.js";
import { knight_Move_locate } from "./piece-movement.js";
import { bishop_Move_locate } from "./piece-movement.js";
import { queen_Move_locate } from "./piece-movement.js";
import { king_Move_locate } from "./piece-movement.js";


// rgb(255, 255, 255) white
// rgb(0, 0, 0) black

let side_1 = document.getElementsByClassName("side_1")[0];
let side_2 = document.getElementsByClassName("side_2")[0];
let win_box = document.getElementsByClassName("win")[0];
let side_box_1 = document.getElementsByClassName("box1");
let side_box_2 = document.getElementsByClassName("box2");
let reset = document.getElementsByTagName("button")[0];
let chess = document.getElementsByClassName("chess")[0];
let turn = Math.floor(Math.random() * 100);
let player_turn = (turn < 50) ? "black" : "white"
console.log(player_turn)

let alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
let eliminated = [];
let chessmap = [];
let filemap = [];
let previous_block = [];
let common_block_array = [];

let gameOver = false
let lower_text = side_1.childNodes[0].innerHTML.toLowerCase()
let on_icon = document.createElement("ion-icon")
on_icon.setAttribute("name", "radio-button-on-outline")
{/* <ion-icon name="radio-button-on-outline"></ion-icon> */ }

//class for each block of chess
class blocks {
    id;
    color;
    piece;
}

//creation of each block with properties

//for loop of files(columns{A-H})
for (let i in alphabetArray) {

    //create a div variable as files
    let files = document.createElement("div");
    //set properties of the files
    files.setAttribute("id", "files-" + alphabetArray[i])
    files.setAttribute("class", "file")
    //add the files in the chess div
    chess.appendChild(files)

    //for loop for each block
    for (let j = 8; j > 0; j--) {
        //create 64 blocks from the class
        let block = new blocks()
        //add properties
        // 1st id
        block.id = alphabetArray[i] + j
        //2nd color
        //even even = white
        //even odd = black
        if (i % 2 == 0) {
            block.color = (j % 2 == 0) ? "rgb(255, 255, 255)" : "rgb(9, 255, 60)"
        }
        //odd odd = white
        //odd even = black
        else {
            block.color = !(j % 2 == 0) ? "rgb(255, 255, 255)" : "rgb(9, 255, 60)"
        }

        //function for the initial position
        let initialposition = function () {
            //player 1 (black)
            //pawn
            if (j == 7) {
                block.piece = "black"
                pawn1.setAttribute('class', `pawn-player1 piece ${block.piece}`)
                Htmlblock.appendChild(pawn1)
            }
            //rook
            if (j == 8 && (i == 0 || i == 7)) {
                block.piece = "black"
                rook1.setAttribute('class', `rook-player1 piece ${block.piece}`)
                rook1.setAttribute("id", `rook1${i + j}`)
                Htmlblock.appendChild(rook1)
            }
            //knight
            if (j == 8 && (i == 1 || i == 6)) {
                block.piece = "black"
                knight1.setAttribute('class', `knight-player1 piece ${block.piece}`)
                knight1.setAttribute("id", `knight1${i + j}`)
                Htmlblock.appendChild(knight1)
            }
            //bishop
            if (j == 8 && (i == 2 || i == 5)) {
                block.piece = "black"
                bishop1.setAttribute('class', `bishop-player1 piece ${block.piece}`)
                bishop1.setAttribute("id", `bishop1${i + j}`)
                Htmlblock.appendChild(bishop1)
            }
            //queen
            if (j == 8 && i == 3) {
                block.piece = "black"
                queen1.setAttribute('class', `queen-player1 piece ${block.piece}`)
                queen1.setAttribute("id", `queen1${i + j}`)
                Htmlblock.appendChild(queen1)
            }
            //king
            if (j == 8 && i == 4) {
                block.piece = "black"
                king1.setAttribute('class', `king-player1 piece ${block.piece}`)
                king1.setAttribute("id", `king1${i + j}`)
                Htmlblock.appendChild(king1)
            }


            //player 2 (white)
            //pawn
            if (j == 2) {
                block.piece = "white"
                pawn2.setAttribute('class', `pawn-player2 piece ${block.piece}`)
                Htmlblock.appendChild(pawn2)
            }
            //rook
            if (j == 1 && (i == 0 || i == 7)) {
                block.piece = "white"
                rook2.setAttribute('class', `rook-player2 piece ${block.piece}`)
                rook2.setAttribute("id", `rook2${i + j}`)
                Htmlblock.appendChild(rook2)
            }
            //knight
            if (j == 1 && (i == 1 || i == 6)) {
                block.piece = "white"
                knight2.setAttribute('class', `knight-player2 piece ${block.piece}`)
                knight2.setAttribute("id", `knight2${i + j}`)
                Htmlblock.appendChild(knight2)
            }
            //bishop
            if (j == 1 && (i == 2 || i == 5)) {
                block.piece = "white"
                bishop2.setAttribute('class', `bishop-player2 piece ${block.piece}`)
                bishop2.setAttribute("id", `bishop2${i + j}`)
                Htmlblock.appendChild(bishop2)
            }
            //queen
            if (j == 1 && i == 3) {
                block.piece = "white"
                queen2.setAttribute('class', `queen-player2 piece ${block.piece}`)
                queen2.setAttribute("id", `queen2${i + j}`)
                Htmlblock.appendChild(queen2)
            }
            //king
            if (j == 1 && i == 4) {
                block.piece = "white"
                king2.setAttribute('class', `king-player2 piece ${block.piece}`)
                king2.setAttribute("id", `king2${i + j}`)
                Htmlblock.appendChild(king2)
            }
        }
        //creating the board from data
        //create a div variable as Htmlblock
        let Htmlblock = document.createElement('div')
        //give properties
        Htmlblock.setAttribute('id', block.id)
        Htmlblock.setAttribute('class', "block")
        Htmlblock.style.background = block.color
        //add blocks to each files
        files.appendChild(Htmlblock)

        //add id name to each block as a span
        let span = document.createElement("span");
        let idInSpan = document.createTextNode(alphabetArray[i] + j)
        span.append(idInSpan)
        Htmlblock.appendChild(span)

        //add pawns as a div --> all of these are being used in the initial position function
        let pawn1 = document.createElement("div")
        pawn1.setAttribute("id", `pawn1${8 - i}`)
        let pawn2 = document.createElement("div")
        pawn2.setAttribute("id", `pawn2${8 - i}`)

        //add rooks as a div --> all of these are being used in the initial position function
        let rook1 = document.createElement("div")
        let rook2 = document.createElement("div")

        //add knights as a div --> all of these are being used in the initial position function
        let knight1 = document.createElement("div")
        let knight2 = document.createElement("div")

        //add bishops as a div --> all of these are being used in the initial position function
        let bishop1 = document.createElement("div")
        let bishop2 = document.createElement("div")

        //add queen as a div --> all of these are being used in the initial position function
        let queen1 = document.createElement("div")
        let queen2 = document.createElement("div")

        //add king as a div --> all of these are being used in the initial position function
        let king1 = document.createElement("div")
        let king2 = document.createElement("div")

        initialposition()


        filemap.push(block)
    }
    //adding each file to the chessmap array
    chessmap.push(filemap)
    filemap = [];

}
// creating an array for all the square divs, divs which has a piece, and for the rest of the blank blocks
let squares = Array.from(document.getElementsByClassName("block"));
let piece_Array = Array.from(document.getElementsByClassName("piece"));
let blank_block = []

// adding the active class to the pieces who's turn it is
Array.from(document.getElementsByClassName(player_turn)).forEach(element => {
    element.classList.add("active")
});
// an array containing all the square objects
let chess_array = []
for (let i of chessmap) {
    for (let j of i) {
        chess_array.push(j)
    }
}

//all the functions related to the movement of the pieces
//function for the movement of the piece after clicking on the possible block, and to declare win
function piece_place_change(element, clicked_block) {

    //checking if clicked on enemy's piece, if it is king the gameover else eliminate the piece
    for (let block of kill_block_set) {
        // console.log(clicked_block.childNodes[1], clicked_block)
        if (block == clicked_block) {
            if (clicked_block.childNodes[1].classList[0].includes("king")) {
                gameOver = true
            }
            eliminated.push(clicked_block.childNodes[1])
            console.log("removed", clicked_block.childNodes[1])
            clicked_block.childNodes[1].remove()
        }
    }
    clicked_block.appendChild(element.childNodes[1])
    //updating the piece array, and the active class
    piece_Array = Array.from(document.getElementsByClassName("piece"));
    piece_Array.forEach(el => {
        el.classList.toggle("active")
    })
    squares.forEach(block => {
        block.classList.remove("hint")
    })
    // when game is over
    if (gameOver) {
        piece_Array.forEach(All_piece => {
            All_piece.classList.remove("active")
        })
        win_box.style.visibility = "visible"
        let text = `${clicked_block.childNodes[1].classList[2]}`
        text = text.toUpperCase()
        console.log(text)
        win_box.innerHTML = `${text} WON`
    }
    //adding the On icon on the active player
    let reference_piece = document.getElementsByClassName("king-player1")[0];
    if (reference_piece.classList.contains("active")) {
        side_1.childNodes[0].appendChild(on_icon)
    }
    else {
        side_2.childNodes[0].appendChild(on_icon)
    }
}

// an array when two pieces have any common possible blocks
function common_block_detection() {
    common_block_array = [];
    if (possibleblock.length > previous_block.length) {
        possibleblock.forEach(element => {
            if (previous_block.includes(element)) {
                common_block_array.push(element)
            }
        })
    }
    else {
        previous_block.forEach(element => {
            if (possibleblock.includes(element)) {
                common_block_array.push(element)
            }
        })
    }
}
//adding hint only to the possible block
function Adding_hints() {
    squares.forEach(square => {
        square.classList.remove("hint")
    })
    possibleblock.forEach(element => {
        element.classList.add("hint")

    })
}
//function to update which block is empty
function blank_block_setup() {
    blank_block = []
    squares.forEach(element => {
        if (!(element.childNodes[1])) {
            blank_block.push(element)
        }
    })
    blank_block = blank_block.filter(element => { !possibleblock.includes(element) })
}
blank_block_setup()

//game start


//click related code
squares.forEach(element => {
    element.addEventListener("click", () => {
        //function to remove the click event listener for all the empty blocks, and the possible block of the previous piece clicked
        function piece_handle_1(el) {
            previous_block.forEach(element => {
                element.removeEventListener("click", piece_handle_2)
            })
            blank_block.forEach(elm => {
                elm.removeEventListener("click", piece_handle_2)
            })
        }
        //function to remove the click event listener from the current possible block after clicking on it once
        function piece_handle_2(el) {
            piece_place_change(element, el.target)
            possibleblock.forEach(ele => {
                ele.removeEventListener("click", piece_handle_2)
            })
        }
        if (element.childNodes[1]) {
            // selecting black/white pawn from the html elements which are active
            if ((element.childNodes[1].classList.contains("pawn-player1") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].classList.contains("pawn-player2") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                pawn_Move_locate(element)

                common_block_detection()
                Adding_hints()
                blank_block_setup()

                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }
            // selecting black/white rook from the html elements which are active
            if ((element.childNodes[1].classList.contains("rook-player1") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].classList.contains("rook-player2") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                rook_Move_locate(element)

                common_block_detection()
                Adding_hints()
                blank_block_setup()

                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }
            // selecting black/white knight from the html elements which are active
            if ((element.childNodes[1].classList.contains("knight-player1") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].classList.contains("knight-player2") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                knight_Move_locate(element)


                common_block_detection()
                Adding_hints()
                blank_block_setup()


                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }

            // selecting black/white bishop from the html elements which are active
            if ((element.childNodes[1].classList.contains("bishop-player1") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].classList.contains("bishop-player2") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                bishop_Move_locate(element)

                common_block_detection()
                Adding_hints()
                blank_block_setup()

                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }
            // selecting black/white queen from the html elements which are active
            if ((element.childNodes[1].classList.contains("queen-player1") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].classList.contains("queen-player2") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                queen_Move_locate(element)

                common_block_detection()
                Adding_hints()
                blank_block_setup()

                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }

            // selecting black/white king from the html elements whch are active
            if ((element.childNodes[1].id.includes("king148") && element.childNodes[1].classList.contains("active")) || (element.childNodes[1].id.includes("king241") && element.childNodes[1].classList.contains("active"))) {
                previous_block = possibleblock // uptil here possible block is of the previous piece
                // function from piece-movement.js
                king_Move_locate(element)

                common_block_detection()
                Adding_hints()
                blank_block_setup()

                common_block_array.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_1)
                })
                possibleblock.forEach(el => {
                    el.addEventListener("click", piece_handle_2)
                })
            }
        }
        //adding eliminated pieces to the side boxes
        setTimeout(() => {
            eliminated.forEach(element => {
                element.classList.remove("active")
                if (element.classList.contains("black")) {
                    (element.id.includes("pawn")) ? side_box_1[0].appendChild(element) : side_box_2[0].appendChild(element)

                }
                if (element.classList.contains("white")) {
                    (element.id.includes("pawn")) ? side_box_1[1].appendChild(element) : side_box_2[1].appendChild(element)

                }
            })
        }, 200);
    })
})
//Adding ON icon at the start
if (player_turn == lower_text) {
    side_1.childNodes[0].appendChild(on_icon)
}
else { side_2.childNodes[0].appendChild(on_icon) }