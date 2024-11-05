import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export function ExampleForm() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked as boolean)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}