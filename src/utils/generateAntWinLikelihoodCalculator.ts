import INFO_ANT from "../querys/ant-query";

export function generateAntWinLikelihoodCalculator() {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();

    return function(callback:any) {
        setTimeout(function() {
            callback(likelihoodOfAntWinning);
        }, delay);
    };
}
export default generateAntWinLikelihoodCalculator;