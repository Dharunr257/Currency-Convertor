const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const Dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button ")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")



for (let select of Dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}



const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    console.log(fromcurr.value.toLowerCase(), " to ", tocurr.value.toLowerCase())
    const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    const fromcurruncy = fromcurr.value.toString().toLowerCase()
    const tocurruncy = tocurr.value.toString().toLowerCase()
    const exchangeRate = data[fromcurruncy][tocurruncy];
    console.log("Exchange Rate:", exchangeRate)
    const convertedAmount = amtval * exchangeRate;
    console.log(convertedAmount);
    //const msg = `${amtval}${fromcurr} = ${convertedAmount}${tocurr}`
    msg.innerText = `${amtval} ${fromcurr.value} = ${convertedAmount} ${tocurr.value}`;

}
const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode]
    let srclink = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = srclink;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
});

window.addEventListener("load", () => {
    updateexchangerate();
});    