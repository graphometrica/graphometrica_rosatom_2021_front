import { Button, Space } from 'antd';
import { useStore } from 'effector-react';
import ParticlesBg from 'particles-bg';
import React from 'react';
import Typed from 'react-typed';

const textLines = [
  'Офигенный',
  'Умный',
  'Опимальный',
]

export const HomePage = () => {


  return (
    <header style={{ height: '100vh', }}>
      <ParticlesBg type="cobweb" num={300} color="#1890ff" bg={true} />
      <div className="center" style={{
        textAlign: 'center'
        // border: 'solid 5px #753a88',

      }}>
        <h1 style={{ fontSize: 48, lineHeight: 1.4, marginBottom: 12 }}>
          <Typed strings={textLines} typeSpeed={120} loop /> маршрут по Москве<br />для&nbsp;крутых фото в инстаграм</h1>
        <h2 style={{ marginBottom: 32, fontWeight: 700, color: '#753a88', fontSize: 28 }}>с помощью квантового компьютера</h2>

        <p>
          <a
            href="/#/create"
            className="ant-btn ant-btn-primary" style={{ background: "#753a88" }}>Проложить маршрут</a>
        </p>

      </div>

    </header>
  )
}
