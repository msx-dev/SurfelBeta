export const CalculateGrowth = (listedNumbers) => {
    const d = new Date();
    let month = d.getMonth();

    const current_month = listedNumbers[month]
    const past_month = listedNumbers[month-1]

    let percent_growth = (current_month - past_month) / past_month * 100; 
    percent_growth = Math.round(percent_growth * 100) / 100
    return percent_growth;

}