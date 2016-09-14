(function(){
    var clicks = 0, avgBPM = 0, BPM = 0;
    var state = false;
    var clicksArr = [];
    var startAnimation;
    var toggleCircle = false;
    var multCircle = 1;
    var colorCircle = true;

    var computeAvg = function(timeDiff){
            for(var i = 0; i < timeDiff.length; i++){
                avgBPM += timeDiff[i];
            }
            avgBPM = avgBPM / timeDiff.length;
            BPM = Math.floor(60000/avgBPM);
            showBPM(BPM);
            startBlip(BPM);
    }

    var showBPM = function(BPM){
        elBPM = document.querySelector('.bpm');
        textBPM = document.createTextNode(BPM);
        elBPM.innerText = textBPM.textContent;
    }

    var countBPM = function(){
        var timeDiff = [];
        clicksArr.push(Date.now());
        if(clicksArr.length == 10){
            for(var i = 0; i < clicksArr.length; i++){
                if(i != 0){
                    var diff = clicksArr[i]-clicksArr[i-1];
                    timeDiff.push(diff);
                    if(i == clicksArr.length - 1)
                        computeAvg(timeDiff);
                }
            }
        timeDiff = [];
        clicksArr = [];
        avgBPM = 0;
        }
    }

    var startBlip = function(BPM){
        clearInterval(startAnimation);
        document.getElementById('one').className = 'selected';
        startAnimation = setInterval(blip, 60000/BPM)
    }

    var blipScreen = function(state){
        if(state)
            document.body.style.backgroundColor = "#000";
        else
            document.body.style.backgroundColor = "#fff";
    }

    var blip = function(){
        state = !state;
        blipScreen(state);
    }
    var clearSelector = function(){
        els = document.querySelectorAll('.selected');
        for(var i = 0; i < els.length; i++){
            els[i].classList.remove('selected');
        }
    }
    var modCircle = function(mult){
        var circle = document.querySelector('.circle');
        circle.style.height = mult*200+'px';
        circle.style.width = mult*200+'px';
        circle.style.marginLeft = mult*(-100)+'px';
        circle.style.marginTop = mult*(-100)+'px';
        circle.style.borderRadius = mult*50+'px '+mult*50+'px '+mult*50+'px '+mult*50+'px';
    }
    //Event Listeners
    document.body.addEventListener('mouseup', countBPM);

    document.addEventListener('keydown', function(event){
        console.log(event.key);
        switch (event.key) {
            case 'c':
                colorCircle = !colorCircle;
                if(colorCircle)
                    document.querySelector('.circle').style.background = 'white';
                else
                    document.querySelector('.circle').style.background = 'black';
                break;
            case 'ArrowUp':
                multCircle += 0.1;
                modCircle(multCircle);
                break;
            case 'ArrowDown':
                multCircle -= 0.1;
                modCircle(multCircle);
                break;
            case ' ':
                toggleCircle = !toggleCircle;
                if(toggleCircle){
                    document.querySelector('.circle').classList.add('show');
                    document.querySelector('.circle').classList.remove('hide');
                }
                else{
                    document.querySelector('.circle').classList.add('hide');
                    document.querySelector('.circle').classList.remove('show');
                }
                break;
            case '1':
                startBlip(BPM);
                clearSelector();
                document.getElementById('one').className = 'selected';
                break;
            case '2':
                startBlip(BPM*2);
                clearSelector();
                document.getElementById('half').className = 'selected';
                break;
            case '3':
                startBlip(BPM*4);
                clearSelector();
                document.getElementById('quarter').className = 'selected';
                break;
            case '4':
                startBlip(BPM*8);
                clearSelector();
                document.getElementById('eigth').className = 'selected';
                break;
            case '5':
                startBlip(BPM*16);
                clearSelector();
                document.getElementById('six').className = 'selected';
                break;
            case '6':
                startBlip(BPM*32);
                clearSelector();
                document.getElementById('third').className = 'selected';
                break;
        }
    })

    if(document.location.hash.split("#")[1] != undefined){
        BPM = document.location.hash.split("#")[1];
        showBPM(BPM);
        startBlip(BPM);
    }

})();
