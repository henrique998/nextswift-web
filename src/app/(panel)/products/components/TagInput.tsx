import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { Category } from '../add/components/ProductForm'

interface TagInputProps {
  selectedCategories: Category[]
  onChange: (tags: Category[]) => void
  categoryContent: string
  onCategoryContentChange: (value: string) => void
}

export function TagInput({
  selectedCategories,
  onChange,
  categoryContent,
  onCategoryContentChange,
}: TagInputProps) {
  function handleRemoveTag(i: number) {
    onChange(selectedCategories.filter((_, index) => index !== i))
  }

  return (
    <>
      <div className="mt-1 flex flex-col gap-2 rounded-md border-2 border-gray-200 p-2 transition-colors focus-within:border-purple-700">
        {selectedCategories?.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2">
            {selectedCategories.map((categoryData, i) => (
              <motion.li
                key={i}
                className="flex h-8 items-center justify-center gap-2 rounded-md bg-gray-50 px-3"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <span className="text-xs">{categoryData.label}</span>
                <button type="button" onClick={() => handleRemoveTag(i)}>
                  <XCircle className="h-5 w-5 fill-purple-700 stroke-white" />
                </button>
              </motion.li>
            ))}
          </ul>
        )}

        <input
          type="text"
          value={categoryContent}
          onChange={(e) => onCategoryContentChange(e.target.value)}
          placeholder="Adicione uma categoria"
          className="h-full flex-1 focus:outline-none"
        />
      </div>
    </>
  )
}
