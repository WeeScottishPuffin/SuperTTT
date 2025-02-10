window.addEventListener("keydown",kp)

function kp(e){
    switch (e.keyCode) {
        case 97:
            place(6);
            break;
        case 98:
            place(7);
            break;
        case 99:
            place(8);
            break;
        case 100:
            place(3);
            break;
        case 101:
            place(4);
            break;
        case 102:
            place(5);
            break;
        case 103:
            place(0);
            break;
        case 104:
            place(1);
            break;
        case 105:
            place(2);
            break;
        default:
            break;
    }
    console.log(e.keyCode);
}