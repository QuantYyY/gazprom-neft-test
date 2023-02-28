

const dataForCard = (params: any, condition1: string, condition2: string) => {
    let firstAmount: number = 0;
    let secondAmount: number = 0;


    params.filter((item: any) => item.name.includes(condition1))
        .forEach((element: any) => {
            firstAmount += element.value
        });

    params.filter((item: any) => item.name.includes(condition2))
        .forEach((element: any) => {
            secondAmount += element.value
        });

    let percentage: number = Math.round((firstAmount / (firstAmount + secondAmount)) * 100) 

    return {
        firstAmount,
        secondAmount,
        percentage
    }
};

export default dataForCard;