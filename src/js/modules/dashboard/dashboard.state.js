export const state = Object.seal({
    timeframe: "weekly",
    data: [],
});

//setters
export function setData(data) {
    state.data = data;
}

export function setTimeframe(timeframe) {
    state.timeframe = timeframe;
}