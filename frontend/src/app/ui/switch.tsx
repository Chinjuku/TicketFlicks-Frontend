import React from 'react'
import {Switch} from "@nextui-org/switch";
import { SunIcon, MoonIcon } from '@/app/ui/Icons';

export const SwitchToggle = (props : {isSelected : boolean, setIsSelected : (isSelected: boolean) => void}) => {
  const { isSelected, setIsSelected } = props
  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onValueChange={() => setIsSelected(!isSelected)}
      className='fixed bottom-4 right-4'
    >
    </Switch>

  )
}
