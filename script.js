const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";///eur.json
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const result = document.querySelector(".msg");

const button = document.querySelector("button");
for(let select of dropdowns){
for(currCode in countryList){
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    if(select.name ==="from" && currCode==="USD"){
        newoption.selected = "selected";
    }
    select.append(newoption)
}
    //jokhn i select change hobe tokhn flag change hobe...to each select er jonne ekta kore event listener
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}
changeFlag = (element)=>{
    console.log(element.value);
    let currCode = element.value;
    let countrycode = countryList[currCode];
    console.log(`the country code is ${countrycode}`);
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newsrc;

};

button.addEventListener("click" ,async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal<0 || amountVal=="" ){
        amount.value ="1";
        amountVal=1;
    }
    
//     console.log(`input value : ${amount.value}`);
//     const url = `${base_url}/${currCode}.json`
//     console.log(fromCurr.value,toCurr.value);
// });
    let fromCode = fromCurr.value.toLowerCase();
    let toCode = toCurr.value.toLowerCase();
    const url = `${base_url}/${fromCode}.json`;
try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data[fromCode][toCode];

        if (rate) {
            let convertedAmount = (amountVal * rate).toFixed(2);
            result.innerText = `${amountVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        } else {
            result.innerText = "Exchange rate not available.";
        }
    } catch (error) {
        result.innerText = "Error fetching exchange rate.";
        console.error(error);
    }
});