'use client'
import React, { useLayoutEffect, useState } from 'react'
import {createPortal} from 'react-dom'

const createWrapperElementandAppendToBody=(wrapperId:string)=>{
    if(!document) return null
const wrapperElement=document.createElement('div')
wrapperElement.setAttribute('id',wrapperId)
document.body.appendChild(wrapperElement)
return wrapperElement
}
const ReactPortal = ({children, wrapperId}:any) => {
    const [wrapperElement,setWrapperElement] = useState()
    useLayoutEffect(() => {
      let element=document.getElementById(wrapperId)
        let systemcreated=false
      if(!element){
        systemcreated=true
        element=createWrapperElementandAppendToBody(wrapperId)
      }
      setWrapperElement(element!)
    
      return () => {
        if(systemcreated && element?.parentNode){
          element.parentNode.removeChild(element)
        }
      };
    }, [wrapperId])
    if(!wrapperElement) return null
  return createPortal(children, wrapperElement)
}

export default ReactPortal