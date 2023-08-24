interface ExcerptProps {
  content: string
}

export function Excerpt({ content }: ExcerptProps) {
  return (
    <div className="desc-container mt-2 flex-1 overflow-hidden">
      <p className="line-clamp-3 text-sm text-gray-300">{content}</p>
    </div>
  )
}
