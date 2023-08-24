import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PagninationItem } from './PagninationItem'

interface PagninationProps {
  totalCount: number
  currentPage?: number
  perPage?: number
  baseUrl: string
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagnination({
  baseUrl,
  totalCount,
  currentPage = 1,
  perPage = 10,
}: PagninationProps) {
  const lastPage = Math.ceil(totalCount / perPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
      {currentPage > 1 && (
        <PagninationItem href={`${baseUrl}=${currentPage - 1}`}>
          <ChevronLeft className="h-6 w-6 stroke-zinc-900" />
        </PagninationItem>
      )}

      {currentPage > 2 && (
        <>
          <PagninationItem href={`${baseUrl}=1`}>1</PagninationItem>

          {currentPage > 3 && (
            <p className="w-8 text-center text-gray-300">...</p>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => (
          <PagninationItem
            href={`${baseUrl}=${page}`}
            key={page}
            data-active={Number(currentPage) === page}
          >
            {page}
          </PagninationItem>
        ))}

      <PagninationItem href={`${baseUrl}=${currentPage}`} data-active={true}>
        {currentPage}
      </PagninationItem>

      {nextPages.length > 0 &&
        nextPages.map((page) => (
          <PagninationItem
            href={`${baseUrl}=${page}`}
            key={page}
            data-active={Number(currentPage) === page}
          >
            {page}
          </PagninationItem>
        ))}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <p className="w-8 text-center text-gray-300">...</p>
          )}

          <PagninationItem href={`${baseUrl}=${lastPage}`} key={lastPage}>
            {lastPage}
          </PagninationItem>
        </>
      )}

      {currentPage < lastPage && (
        <PagninationItem href={`${baseUrl}=${currentPage + 1}`}>
          <ChevronRight className="h-6 w-6 stroke-zinc-900" />
        </PagninationItem>
      )}
    </div>
  )
}
