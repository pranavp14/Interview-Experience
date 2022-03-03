var i = 1;

function render() {

    document.getElementById("demo").remove();
    addRound = document.getElementById("rounds");
    var e = document.createElement('div');
    let myhtml = `  <div class="form-row" >
        <div class="form-group">
            <label>Round ${i+1}</label>
            <input type="text" class="form-input" name="round${i+1}" />
        </div>
    </div>
    <div class="form-row">
        <div class="form-group">
            <label for="experience${i+1}">Experience</label>
            <textarea  class="form-control" id="textAreaExample1" rows="9" cols="65" name="experience${i+1}">
                </textarea>
        </div>
    </div>
    <button onclick="render()" id="demo"style="background-color: #00B4D8;
    border: none;
    color: white;
    margin-left: 0%;
    padding: 2.5% 4%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 162%;
    cursor: pointer;
    border-radius: 4%;
}">Add Round</button>

     `;

    e.innerHTML = myhtml;
    addRound.appendChild(e);
    i = i + 1;


}