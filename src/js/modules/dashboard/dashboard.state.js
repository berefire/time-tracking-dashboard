export const state = {
    timeframe: 'weekly', // initial value
    data: []
};

//setters
export function setTimeFrame(timeframe) {
    state.timeframe = timeframe;
}

export function setData(data) {
    state.data = data;
}