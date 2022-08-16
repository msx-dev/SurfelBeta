export const averagePeriod = (swellPeriod) => {
    let sum = 0;

    const sliced = Object.fromEntries(
    Object.entries(swellPeriod).slice(0, 7)
    );

    const divider = Object.keys(sliced).length;


    for (const key in sliced) {
        if (sliced.hasOwnProperty(key)) {
            const value = sliced[key];
            sum += value;

        }
    }

    let actualSwell = sum/divider;
    actualSwell = Math.round(actualSwell * 10) / 10;

    return actualSwell;
}