interface dataObject {
    period: string,
    name: string,
    value: number,
}


const dataFilter = (data: dataObject[], condition: string) => {
    return data.filter(item => {
        if (item.name === condition) return item.value;
    })
};

export default dataFilter;