import dataFilter from "../../HelpfulFunctions/dataFilter";
import data from "../../data";
import dataForCard from "../../HelpfulFunctions/dataForCard";
import findObjectForCard from "../../HelpfulFunctions/findObjectForCard";
import availabilityCheck from "../../HelpfulFunctions/availabilityCheck";

let option = {
    legend: {
        orient: 'horizontal',
        bottom: '20',
        type: 'plain',
        icon: 'circle',
        selected: {
            'В программе ИТ': true,
            'В программе ЦП': true,
            'Вне программ ИТ': true,
            'Вне программ ЦП': true,
        }
    },

    title: {
        text: 'Проекты в программах и вне программ',
        top: 0,
        textStyle: {
            color: '#002033',
            fontWeight: 600,
            fontSize: 16,
        },
        subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
        subtextStyle: {
            color: '#00203399',
            fontWeight: 400,
            fontSize: 14,
        },
    },

    grid: {
        top: '20%',
        left: '6%',
        height: '365px',
    },

    xAxis: {
        data: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        }

    },

    yAxis: {
        type: 'value',

    },


    tooltip: {
        trigger: 'axis',

        formatter: (params: any) => {

            const amountObject = dataForCard(params, 'В программе', 'Вне программ');
            return `
            <div class='infoCard'>
                <div class='strong title'>${params[0].axisValue} 2022</div>
                <div class='strong'>${amountObject.percentage !== 0 ? 'В программе <div class="amount">' + amountObject.percentage + '% | ' + amountObject.firstAmount + 'шт.</div>' : ''}</div>
                <div class='valueArea'>${availabilityCheck(params, 0) ? findObjectForCard(params, 0).marker + 'Проекты ИТ' : ''} <div class='strong amount'> ${availabilityCheck(params, 0) ? findObjectForCard(params, 0).value + ' шт.' : ''}</div></div>
                <div class='valueArea'>${availabilityCheck(params, 1) ? findObjectForCard(params, 1).marker + 'Проекты ЦП' : ''} <div class='strong amount'> ${availabilityCheck(params, 1) ? findObjectForCard(params, 1).value + ' шт.' : ''}</div></div>
                
                <div class='strong'>${(100 - amountObject.percentage) !== 0 ? 'Вне программ <div class="amount">' + (100 - amountObject.percentage) + '% | ' + amountObject.secondAmount + 'шт.</div>' : ''}</div>
                <div class='valueArea'>${availabilityCheck(params, 2) ? findObjectForCard(params, 2).marker + 'Проекты ИТ' : ''} <div class='strong amount'> ${availabilityCheck(params, 2) ? findObjectForCard(params, 2).value + ' шт.' : ''}</div></div>
                <div class='valueArea'>${availabilityCheck(params, 3) ? findObjectForCard(params, 3).marker + 'Проекты ЦП' : ''} <div class='strong amount'> ${availabilityCheck(params, 3) ? findObjectForCard(params, 3).value + ' шт.' : ''}</div></div>
            </div>      
            `;
        },

    },

    series: [
        {
            name: 'В программе ИТ',
            data: dataFilter(data, 'В программе ИТ'),
            type: 'bar',
            stack: 'x',
            color: '#56B9F2',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;

                    if (!option.legend.selected['В программе ЦП']) {
                        total = params.value
                        return total
                    } else return ''
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        },

        {
            name: 'В программе ЦП',
            data: dataFilter(data, 'В программе ЦП'),
            type: 'bar',
            stack: 'x',
            color: '#0078D2',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;
                    if (option.legend.selected['В программе ИТ']) {
                        total = params.value + option.series[0].data[params.dataIndex].value
                        return total
                    }
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,

            }
        },

        {
            name: 'Вне программ ИТ',
            data: dataFilter(data, 'Вне программ ИТ'),
            type: 'bar',
            stack: 'y',
            color: '#22C38E',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;

                    if (!option.legend.selected['Вне программ ЦП']) {
                        total = params.value
                        return total
                    } else return ''
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        },

        {
            name: 'Вне программ ЦП',
            data: dataFilter(data, 'Вне программ ЦП'),
            type: 'bar',
            stack: 'y',
            color: '#00724C',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;
                    if (option.legend.selected['Вне программ ИТ']) {
                        total = params.value + option.series[2].data[params.dataIndex].value
                        return total
                    }
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        }
    ]
};


export default option;