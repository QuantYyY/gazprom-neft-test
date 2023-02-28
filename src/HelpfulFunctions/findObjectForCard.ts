
const findObjectForCard = (data: any, condition: number) => {
    return data.find((element: any) => element.seriesIndex === condition )
}

export default findObjectForCard;