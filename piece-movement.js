let alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
export let possibleblock = [];
export let kill_block_set = [];
let kill_block = [];
let rowMain
let row
let column
let pawn_hit = [];
let possibleRow1 = [];
let possibleRow2 = [];
let possibleColumn1 = [];
let possibleColumn2 = [];
export let hint = []
let newrow


//function to clear arrays and get initial variables
function initialization(element) {
    hint = []
    possibleblock = []
    kill_block = []
    kill_block_set = []
    possibleColumn1 = []
    possibleColumn2 = []
    possibleRow1 = []
    possibleRow2 = []
    rowMain = element.id[1];
    // rowMain = 3
    row = parseInt(rowMain)
    column = element.id[0];
    // column = "H"

}

// function for stopping the hint to recieve any id of squares which are blocking the path and to detect the opposite player's piece
function move_blocked(element) {
    let value = new Set(hint) // to avoid reptition
    outer: for (let id of value) {
        //if clicked on pawn and there is an enemy piece on the side then add that to the kill array
        if (element.childNodes[1].classList[0].includes("pawn")) {
            for (let i of pawn_hit) {
                if (document.getElementById(i).childNodes[1] && (element.childNodes[1].classList[2] !== document.getElementById(i).childNodes[1].classList[2])) {
                    possibleblock.push(document.getElementById(i))
                    kill_block.push(document.getElementById(i))
                }
            }
        }
        if (document.getElementById(id).childNodes[1]) {
            //if clicked on pawn and the path ahead is blocked by any piece, then stop adding blocks to the possibleblock array 
            if (element.childNodes[1].classList[0].includes("pawn")) {
                break outer;
            }
            //if clicked on any other piece and there is an enemy piece in the way then add it to the killblock and stop adding blocks to possible block anymore
            else if (element.childNodes[1].classList[2] !== document.getElementById(id).childNodes[1].classList[2]) {
                possibleblock.push(document.getElementById(id))
                kill_block.push(document.getElementById(id))
            }
            break outer;
        }
        //add the rest of the hint id blocks to the possibleblock
        else { possibleblock.push(document.getElementById(id)) }
    }
    kill_block_set = new Set(kill_block)// to avoid reptition
    hint = []
}
//functon to calculate all the possible diagonal possible movements(for bishop and queen)
function possible_diagonal(possiblediagonal_len, possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element) {
    // possible position for each diagonal
    // diagonal right bottom
    for (let i = 0; i < possiblediagonal_len; i++) {
        hint.push(possibleColumn1[i] + possibleRow1[i])
    }
    move_blocked(element)
    // get the length of the smaller value for the loop
    possiblediagonal_len = (possibleColumn1.length < possibleRow2.length) ? possibleColumn1.length : possibleRow2.length
    //diagonal right top
    for (let i = 0; i < possiblediagonal_len; i++) {
        hint.push(possibleColumn1[i] + possibleRow2[i])
    }
    move_blocked(element)
    // get the length of the smaller value for the loop
    possiblediagonal_len = (possibleColumn2.length < possibleRow2.length) ? possibleColumn2.length : possibleRow2.length
    // diagonal left top
    for (let i = 0; i < possiblediagonal_len; i++) {
        hint.push(possibleColumn2[i] + possibleRow2[i])
    }
    move_blocked(element)
    // get the length of the smaller value for the loop
    possiblediagonal_len = (possibleColumn2.length < possibleRow1.length) ? possibleColumn2.length : possibleRow1.length
    //diagonal left bottom
    for (let i = 0; i < possiblediagonal_len; i++) {
        hint.push(possibleColumn2[i] + possibleRow1[i])
    }
    move_blocked(element)
}
//functon to calculate all the possible straight possible movements(for rook and queen)
function possible_straight(column, rowMain, possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element) {
    let possibleRow_len = possibleRow1.length
    // vertical
        //loop to push id of each hint upto the length of the possiblerow array in one direction
    for (let i = 0; i < possibleRow_len; i++) {
        hint.push(column + possibleRow1[i])
    }
    move_blocked(element)
        //loop to push id of each hint upto the length of the possiblerow array in other direction
    possibleRow_len = possibleRow2.length
    for (let i = 0; i < possibleRow_len; i++) {
        // vertical
        hint.push(column + possibleRow2[i])
    }
    move_blocked(element)

    let possibleColumn_len = possibleColumn1.length
    //horizontal
        //loop to push id of each hint upto the length of the possiblecolmn array in one direction
        for (let i = 0; i < possibleColumn_len; i++) {
            hint.push(possibleColumn1[i] + rowMain)
        }
        move_blocked(element)
        //loop to push id of each hint upto the length of the possiblecolmn array in other direction
    possibleColumn_len = possibleColumn2.length
    for (let i = 0; i < possibleColumn_len; i++) {
        //horizontal
        hint.push(possibleColumn2[i] + rowMain)
    }
    move_blocked(element)
}

// a function to detect all the possible positions for a pawn
export function pawn_Move_locate(element) {
    initialization(element)
    pawn_hit = []; // an array for the blocks the pawn can kill from
    //pawn can move 1 block (black pawn)
    for (let i in alphabetArray) {
        if (column == alphabetArray[i] && element.childNodes[1].classList.contains("pawn-player1")) {
            let j = i;
            newrow = row
            --newrow
            if (j < 7) {
                j++
                pawn_hit.push(alphabetArray[j] + newrow)
            }
            move_blocked(element)
            if (i > 0) {
                i--
                pawn_hit.push(alphabetArray[i] + newrow)
            }
            move_blocked(element)
        }
    }
    //for pawn at initial position, it can move 2 blocks
    if (row === 7 && element.childNodes[1].classList.contains("pawn-player1")) {
        for (let i = 0; i < 2; i++) {
            newrow = --row
            hint.push(column + newrow)
        }
        move_blocked(element)
    }
    else if (element.childNodes[1].classList.contains("pawn-player1")) {
        for (let i = 0; i < 1; i++) {
            newrow = --row
            hint.push(column + newrow)
        }
        move_blocked(element)
    }
    
    for (let i in alphabetArray) {
            //pawn can move 1 block(white pawn)
        if (column == alphabetArray[i] && element.childNodes[1].classList.contains("pawn-player2")) {
            let j = i;
            newrow = row
            ++newrow
            if (j < 7) {
                j++
                pawn_hit.push(alphabetArray[j] + newrow)
            }
            move_blocked(element)
            if (i > 0) {
                i--
                pawn_hit.push(alphabetArray[i] + newrow)
            }
            move_blocked(element)
        }
    }
    //for pawn at initial position, it can move 2 blocks
    if (row === 2 && element.childNodes[1].classList.contains("pawn-player2")) {
        for (let i = 0; i < 2; i++) {
            newrow = ++row
            hint.push(column + newrow)
        }
        move_blocked(element)
    }
    else if (element.childNodes[1].classList.contains("pawn-player2")) {
        for (let i = 0; i < 1; i++) {
            newrow = ++row
            hint.push(column + newrow)
        }
        move_blocked(element)
    }
}


// a function to detect all the possible positions for a rook
export function rook_Move_locate(element) {
    initialization(element)

    for (let i in alphabetArray) {
        if (column == alphabetArray[i]) {
            //adding the possible column value for rook from left to right if possible (A->H)
            for (let j = i; j < 7;) {
                j++
                possibleColumn1.push(alphabetArray[j])
            }
            //adding the possible column value for rook from right to left if possibe (H->A)
            for (i; i > 0;) {
                i--
                possibleColumn2.push(alphabetArray[i])
            }
        }
    }
    //adding the possible row value for rook from top to bottom if possibe (8->0)
    for (row; row > 1;) {
        --row
        possibleRow1.push(row)
    }
    row = parseInt(rowMain)//to keep the value of row the same as the original, after the for loop above
    //adding the possible row value for rook from bottom to top if possibe (0->8)
    for (row; row < 8;) {
        ++row
        possibleRow2.push(row)
    }

    possible_straight(column, rowMain, possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element)
}

// a function to detect all the possible positions for a knight
export function knight_Move_locate(element) {
    initialization(element)

    for (let i in alphabetArray) {
        if (column == alphabetArray[i]) {
            //adding the possible column value for knight's left
            i = parseInt(i)
            if (!(i >= 6)) {
                possibleColumn1.push(alphabetArray[i + 2]) 
                //now adding the actual possible block around the value
                if (!(row > 7)) { hint.push(possibleColumn1[0] + (row + 1)) }
                if (!(row < 2)) { hint.push(possibleColumn1[0] + (row - 1)) }
            }
            
            //adding the possible column value for knight's right
            if (!(i <= 1)) {
                possibleColumn2.push(alphabetArray[i - 2])
                //now adding the actual possible block around the value
                if (!(row > 7)) { hint.push(possibleColumn2[0] + (row + 1)) }
                if (!(row < 2)) { hint.push(possibleColumn2[0] + (row - 1)) }
            }
        }
    }
    
    //adding the possible column value for knight's top
    if (!(row > 6)) {
        possibleRow1.push(row + 2)
        for (let i in alphabetArray) {
            if (column == alphabetArray[i]) {
                i = parseInt(i)
                //now adding the actual possible block around the value
                if (!(i > 6)) { hint.push(alphabetArray[(i + 1)] + possibleRow1[0]) }
                if (!(i < 1)) { hint.push(alphabetArray[(i - 1)] + possibleRow1[0]) }
            }
        }
    }
    
    //to keep the value of row the same as the original, after the for loop above
    row = parseInt(rowMain)
    //adding the possible column value for knight's bottom
    if (!(row <= 2)) {
        possibleRow2.push(row - 2)
        for (let i in alphabetArray) {
            if (column == alphabetArray[i]) {
                i = parseInt(i)
                //now adding the actual possible block around the value
                if (!(i > 6)) { hint.push(alphabetArray[(i + 1)] + possibleRow2[0]) }
                if (!(i < 1)) { hint.push(alphabetArray[(i - 1)] + possibleRow2[0]) }
            }
        }
    }

    //to remove the id of the main element from the hint
    let arr_remove = (arr, value) => {
        return arr.filter(function (id) {
            return id != value;
        })
    }
    hint = arr_remove(hint, element.id);

    //to prevent any repetition
    let value = new Set(hint)
    //adding each possible div accordng to the hint id
    outer: for (let id of value) {
        if (document.getElementById(id).childNodes[1]) {
            if (element.childNodes[1].classList[2] !== document.getElementById(id).childNodes[1].classList[2]) {
                possibleblock.push(document.getElementById(id))
                kill_block_set.push(document.getElementById(id))
            }
            continue outer;
        }
        else { possibleblock.push(document.getElementById(id)) }
    }
}

// a function to detect all the possible positions for a bishop
export function bishop_Move_locate(element) {
    initialization(element)

    for (let i in alphabetArray) {
        if (column == alphabetArray[i]) {
            //adding the possible column value for bishop from left to right if possible (A->H)
            for (let j = i; j < 7;) {
                j++
                possibleColumn1.push(alphabetArray[j])
            }
            //adding the possible column value for bishop from right to left if possibe (H->A)
            for (i; i > 0;) {
                i--
                possibleColumn2.push(alphabetArray[i])
            }
        }
    }
    //adding the possible row value for bishop from top to bottom if possibe (8->0)
    for (row; row > 1;) {
        --row
        possibleRow1.push(row)
    }
    //to keep the value of row the same as the original, after the for loop above
    row = parseInt(rowMain)
    //adding the possible row value for bishop from bottom to top if possibe (0->8)
    for (row; row < 8;) {
        ++row
        possibleRow2.push(row)
    }
    // get the length of the smaller value for the loop
    let possiblediagonal_len = (possibleColumn1.length < possibleRow1.length) ? possibleColumn1.length : possibleRow1.length

    possible_diagonal(possiblediagonal_len,possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element)
}

// a function to detect all the possible positions for a queen
export function queen_Move_locate(element) {
    initialization(element)
    for (let i in alphabetArray) {
        if (column == alphabetArray[i]) {
            //adding the possible column value for queen from left to right if possible (A->H)
            for (let j = i; j < 7;) {
                j++
                possibleColumn1.push(alphabetArray[j])
            }
            //adding the possible column value for queen from right to left if possibe (H->A)
            for (i; i > 0;) {
                i--
                possibleColumn2.push(alphabetArray[i])
            }
        }
    }
    //adding the possible row value for queen from top to bottom if possibe (8->0)
    for (row; row > 1;) {
        --row
        possibleRow1.push(row)
    }
    //to keep the value of row the same as the original, after the for loop above
    row = parseInt(rowMain)
    //adding the possible row value for queen from bottom to top if possibe (0->8)
    for (row; row < 8;) {
        ++row
        possibleRow2.push(row)
    }
    // get the length of the smaller value for the loop
    let possiblediagonal_len = (possibleColumn1.length < possibleRow1.length) ? possibleColumn1.length : possibleRow1.length
    possible_diagonal(possiblediagonal_len, possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element)

    possible_straight(column, rowMain, possibleColumn1, possibleColumn2, possibleRow1, possibleRow2, element)
}

// a function to detect all the possible positions for a king
export function king_Move_locate(element) {
    initialization(element)
    for (let i in alphabetArray) {
        if (column == alphabetArray[i]) {
            //adding the possible column value for king's left
            i = parseInt(i)
            if (!(i >= 7)) {
                possibleColumn1.push(alphabetArray[i + 1])
                hint.push(possibleColumn1[0] + rowMain)
            }

            //adding the possible column value for king's right
            if (!(i < 1)) {
                possibleColumn2.push(alphabetArray[i - 1])
                hint.push(possibleColumn2[0] + rowMain)
            }

        }
    }
    //adding the possible column value for king's top
    if (!(row > 7)) {
        possibleRow1.push(row + 1)
        hint.push(column + possibleRow1[0])
    }
    //to keep the value of row the same as the original, after the for loop above
    row = parseInt(rowMain)
    //adding the possible column value for king's bottom
    if (!(row <= 1)) {
        possibleRow2.push(row - 1)
        hint.push(column + possibleRow2[0])
    }
    //diagonal right bottom
    if (possibleColumn1[0] && possibleRow1[0]) { hint.push(possibleColumn1[0] + possibleRow1[0]) }
    //diagonal right top
    if (possibleColumn1[0] && possibleRow2[0]) { hint.push(possibleColumn1[0] + possibleRow2[0]) }
    // diagonal left top
    if (possibleColumn2[0] && possibleRow2[0]) { hint.push(possibleColumn2[0] + possibleRow2[0]) }
    //diagonal left bottom
    if (possibleColumn2[0] && possibleRow1[0]) { hint.push(possibleColumn2[0] + possibleRow1[0]) }

    //to remove the id of the main element from the hint
    let arr_remove = (arr, value) => {
        return arr.filter(function (id) {
            return id != value;
        })
    }
    hint = arr_remove(hint, element);

    //to prevent any repetition
    let value = new Set(hint)
    //adding each possible div accordng to the hint id
    outer: for (let id of value) {
        if (document.getElementById(id).childNodes[1]) {
            if (element.childNodes[1].classList[2] !== document.getElementById(id).childNodes[1].classList[2]) {
                possibleblock.push(document.getElementById(id))
                kill_block_set.push(document.getElementById(id))
            }
            continue outer;
        }
        else { possibleblock.push(document.getElementById(id)) }
    }
}

