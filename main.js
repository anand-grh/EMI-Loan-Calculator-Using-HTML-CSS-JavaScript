const loanAmountInput = document.querySelector(".loan-amount");
const intrestRateInput = document.querySelector(".intrest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalIntrestValue = document.querySelector(".loan-intrest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-button");

let loanAmount = parseFloat( loanAmountInput.value);
let intrestRate = parseFloat(intrestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let intrest = intrestRate / 12 / 100;
let myChart;
const displayChart = (totalIntrestPayable) => {
    const ctx = document.getElementById('myChart');

   myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Intrest', 'Principle Loan Amount'],
        datasets: [{
          data: [totalIntrestPayable, loanAmount],
          backgroundColor: ['#e63946','#14213d'],
          borderWidth: 1
        }]
      },
    });
}

const updateChart = (totalIntrestPayable)=> {
    myChart.data.datasets[0].data[0] = totalIntrestPayable;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
}
const calculateEMI = () => {
    let emi = 
        (loanAmount * 
        intrest *
        (Math.pow(1 + intrest, loanTenure)) / 
        (Math.pow(1 + intrest, loanTenure) - 1));

        return emi;
};

const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount =   Math.round(loanTenure * emi);
        totalAmountValue.innerHTML = totalAmount;

    let totalIntrestPayable = Math.round(totalAmount - loanAmount);
    totalIntrestValue.innerHTML = totalIntrestPayable;
    if (myChart) {
        updateChart(totalIntrestPayable);
    } else {
        displayChart(totalIntrestPayable,loanAmount);
    }
};
const refreshInputValue = () => {
    loanAmount = parseFloat( loanAmountInput.value);
    intrestRate = parseFloat(intrestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    intrest = intrestRate / 12 / 100; 
};
const init = () => {
    refreshInputValue();
    let emi = calculateEMI();
    updateData(emi);
} 

init();



calculateBtn.addEventListener("click", init);



