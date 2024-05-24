import { fetchSelectMovie } from "@/api/get/movie/select-movie-data"
import { fetchReviewData } from "@/api/get/review/review-data"
import { usePathname } from "next/navigation"

const Page = async ({ params } : {params : { id: string }}) => {
  const id = params.id
  const fetchMovie = await fetchSelectMovie(id)
  const fetchReview = await fetchReviewData(id)
  return (
    <main className="h-[81.2vh] w-full">
      <div>

      </div>
      <div>

      </div>
    </main>
  )
}

export default Page