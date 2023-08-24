'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { CategoryData } from '../page'
import { Badge } from './Badge'

interface CategoriesSliderProps {
  categories: CategoryData[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
  onGetAllProducts: () => void
}

export function CategoriesSlider({
  categories,
  selectedCategory,
  onSelectCategory,
  onGetAllProducts,
}: CategoriesSliderProps) {
  const [width, setWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWidth(
      (sliderRef.current?.scrollWidth ?? 0) -
        (sliderRef.current?.offsetWidth ?? 0),
    )
  }, [])

  return (
    <div className="max-w-10/12 h-10 w-[250px] lg:w-full lg:max-w-[1024px] lg:flex-1">
      <motion.div
        ref={sliderRef}
        whileTap={{ cursor: 'grabbing' }}
        className="overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex items-center gap-4"
        >
          <motion.div className="lg:min-w-[150px]">
            <Badge
              isActive={selectedCategory === ''}
              onClick={onGetAllProducts}
            >
              Todos
            </Badge>
          </motion.div>

          {categories.map((category) => (
            <motion.div key={category.id} className="min-w-[150px]">
              <Badge
                isActive={selectedCategory === category.id}
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
