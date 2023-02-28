import React, { FC, useEffect, useRef } from "react";
import './App.css'

import * as echarts from 'echarts';

import option from "./ChartOptions/BarOpt/BarOptions";


const App: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderArea = echarts.init(divRef.current as HTMLDivElement);
    renderArea.on('legendselectchanged', (params: any) => {
      option.legend = {
        orient: 'horizontal',
        bottom: '20',
        type: 'plain',
        icon: 'circle',
        selected: params.selected
      }
      renderArea.setOption(option);
    });

    renderArea.setOption(option);
  }, [])

  return (
    <>
      <div ref={divRef} className='barArea' ></div>
    </>)
};

export default App;
