import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ProductPreview } from './ProductPreview'

interface ProductsBarProps {
  products: {
    id: string
    image: string
    name: string
  }[]
  onChange: (value: string) => void
}

export function ProductsBar({ products, onChange }: ProductsBarProps) {
  return (
    <ToggleGroup.Root
      type="single"
      onValueChange={onChange}
      className="mt-2 flex flex-wrap items-center gap-2"
    >
      {products.map((product) => (
        <ProductPreview
          key={product.id}
          value={product.id}
          image={product.image}
          name={product.name}
        />
      ))}
    </ToggleGroup.Root>
  )
}
