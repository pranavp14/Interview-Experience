var i = 1;

function render() {

    document.getElementById("demo").remove();
    addRound = document.getElementById("rounds");
    var e = document.createElement('div');
    let myhtml = `  <div class="form-row" >
        <div class="form-group">
            <label>Round ${i+1}</label>
            <input type="text" class="form-input" name="round${i+2}" />
        </div>
    </div>
    <div class="form-row">
        <div class="form-group">
            <label for="experience${i+1}">Experience</label>
            <textarea  class="form-control" id="textAreaExample1" rows="9" cols="65" name="experience${i+1}">
                </textarea>
        </div>
    </div>
    <button onclick="render()" id="demo"style="background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    margin-left:60%;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;">Add Round</button>

     `;

    e.innerHTML = myhtml;
    addRound.appendChild(e);
    i = i + 1;


}