import styled from "styled-components";
import { useState } from "react";
import { useEventListener } from "./useEventListener";
type WasdControlledProps = {
  speed?: number,
  children?: any
};
export const WasdControlled = ({ speed,children }: WasdControlledProps) => {
  const [position,setPosition]=useState({x:400,y:400})
  const [activeInterval,setActiveInterval]=useState<Record<string,number>>({})
  const userSpeed=speed || 1
  const move=(key:string) => {
    switch (key) {
      case 'w':
        setPosition((prev)=>({...prev,y:prev.y-userSpeed}))
        break;
      case 'a':
        setPosition((prev)=>({...prev,x:prev.x-userSpeed}))
        break;
      case 's':
        setPosition((prev)=>({...prev,y:prev.y+userSpeed}))
        break;
      case 'd':
        setPosition((prev)=>({...prev,x:prev.x+userSpeed}))
        break;
    }
  }
  const HandleKeyDown=(e:KeyboardEvent) => {
    if(e.repeat || activeInterval[e.key])return

    if(['w','a','s','d'].includes(e.key)){
      const intervalId=setInterval(()=>{
        move(e.key)
      },1000/120)
      setActiveInterval((prev)=>({...prev,[e.key]:intervalId}))
    }
  }
  const HandleKeyUp=(e:KeyboardEvent)=>{
    if(activeInterval[e.key]){
      clearInterval(activeInterval[e.key])
      setActiveInterval((prev)=>{
        const newObj=prev
        delete newObj[e.key]
        return newObj
      })
    }
  }
  useEventListener('keydown',HandleKeyDown)
  useEventListener('keyup',HandleKeyUp)
  return (
    <WasdDivWrapper style={{left:`${position.x}px`,top:`${position.y}px`}}>
      {children}
    </WasdDivWrapper>
  )

}


const WasdDivWrapper = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    position: absolute;
    background-color:darkcyan;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`