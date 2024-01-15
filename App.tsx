import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react'

import Matter from 'matter-js'

export default function App() {

  const matterRef = useRef()

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies

    const engine = Engine.create({
    });

    //create renderer on screen
    const render = Render.create({
      element: matterRef.current,
      engine: engine,
      options: {
        width: 500,
        height: 500,
        wireframes: false,
      }
    });

    const ballA = Bodies.circle(180, 100, 40, 10);
    const ballB = Bodies.circle(230, 40, 40, 10);
    const ballC = Bodies.rectangle(260, 60, 80, 70, {
      //isStatic: true,
      restitution: 1,
      render: { fillStyle: 'blue' }
    })

    const ground = Bodies.rectangle(400, 480, 800, 70, { isStatic: true });
    World.add(engine.world, [ground, ballA, ballB, ballC]);
    Matter.Runner.run(engine);
    Render.run(render);

  })

  return (
    <>
      <StatusBar />
      <View style={styles.container} ref={matterRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
