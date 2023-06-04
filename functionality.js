const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}
let storedVal = 0.0;
let lastTotal = 0.0;
let oper = "";
let num2 = 0.0;
let operSwitch = false;
let decimalPresent = false;


function operate(num1, num2, oper) {
    return oper(num1, num2);
}


function isInteger(value) {
    if(Number(value) != NaN) {
        return true;
    }
    
    return false;
  }

function lastCharacterRemover(str) {
    str = str.substring(0, str.length - 1);
    return str;
}

function lastCharacterChecker(str) {
    if (str.slice(-1) == ".") {
        return true
    }
    return false;
}



document.querySelectorAll('#clickable').forEach(item => {
    // Hover Colour Functionality
    let itemColour = window.getComputedStyle(item).backgroundColor;
    item.addEventListener('mouseover', event => {
        item.style.backgroundColor = pSBC (-0.20, itemColour);
    })
    item.addEventListener('mouseout', event => {
        item.style.backgroundColor = itemColour;
    })

    // Click Functionality
    
    item.addEventListener('mousedown', event => {
        item.style.backgroundColor = pSBC (-0.4, itemColour)

        const display = document.querySelector('.display');
        let displayInfoBeforeClick = parseFloat(display.textContent);
        let buttonPressed = item.textContent;



        if (item.classList.contains("equals")) {
            num2 = Number(display.textContent);
            let toDisplay = oper(storedVal, num2)
            storedVal = toDisplay;
            if (storedVal % 1 == 0) {
                display.textContent = storedVal
            } else {
                display.textContent = storedVal.toFixed(2);
        }


        } else if (item.classList.contains("addition")) {
            decimalPresent = false;
            operSwitch = true;
            oper = add;

        } else if (item.classList.contains("minus")) {
            decimalPresent = false;
            operSwitch = true;
            oper = subtract

        } else if (item.classList.contains("multiply")) {
            decimalPresent = false;
            operSwitch = true;
            oper = multiply

        } else if (item.classList.contains("divide")) {
            decimalPresent = false;
            operSwitch = true;
            oper = divide;


        } else if (item.classList.contains("backspace")) {

            if (lastCharacterChecker(".")) {
                decimalPresent = false;
            }
            if (display.textContent.length > 1) {
                display.textContent = lastCharacterRemover(display.textContent);
            } else {
                display.textContent = 0;
            }

        } else if (item.classList.contains("CE")) {
            display.textContent = "0";
            lastTotal = 0.0;
            oper = "";
            num2 = 0.0;
            decimalPresent = false;

        } else {

            if (decimalPresent) {
                if (item.classList.contains('decimalPoint')) {
                    display.textContent = lastCharacterRemover(display.textContent);
                }
            }

            if (display.textContent == 0 && operSwitch == false && decimalPresent == false) {
                if (!item.classList.contains("decimalPoint")) {
                    display.textContent = buttonPressed;
                } else {
                    display.textContent = display.textContent + buttonPressed;
                    decimalPresent = true;
                }
            } else {
                display.textContent = display.textContent + buttonPressed;
            }

            if (operSwitch) {
                storedVal = displayInfoBeforeClick;
                display.textContent = buttonPressed
                operSwitch = false;
            }

            
        }

    })
    item.addEventListener('mouseup', event => {
        item.style.backgroundColor = pSBC (-0.2, itemColour);
    })
  })


