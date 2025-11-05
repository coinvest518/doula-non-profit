"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="templates" />
            <Label htmlFor="templates" className="text-sm font-normal">
              Templates
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="guides" />
            <Label htmlFor="guides" className="text-sm font-normal">
              Guides
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="business" />
            <Label htmlFor="business" className="text-sm font-normal">
              Business Tools
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="resources" />
            <Label htmlFor="resources" className="text-sm font-normal">
              Resources
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">File Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="pdf" />
            <Label htmlFor="pdf" className="text-sm font-normal">
              PDF
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="docx" />
            <Label htmlFor="docx" className="text-sm font-normal">
              Word Document
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="xlsx" />
            <Label htmlFor="xlsx" className="text-sm font-normal">
              Spreadsheet
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
