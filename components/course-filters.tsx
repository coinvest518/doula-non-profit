"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="beginner" />
            <Label htmlFor="beginner" className="text-sm font-normal">
              Beginner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="intermediate" />
            <Label htmlFor="intermediate" className="text-sm font-normal">
              Intermediate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="advanced" />
            <Label htmlFor="advanced" className="text-sm font-normal">
              Advanced
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="text-sm font-normal">
                All Durations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short" className="text-sm font-normal">
                Under 20 hours
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-sm font-normal">
                20-40 hours
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long" className="text-sm font-normal">
                40+ hours
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="certification" defaultChecked />
            <Label htmlFor="certification" className="text-sm font-normal">
              Certification Included
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lifetime" />
            <Label htmlFor="lifetime" className="text-sm font-normal">
              Lifetime Access
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
