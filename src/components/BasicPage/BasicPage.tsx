import { Breadcrumbs } from "../Breadcrumb"
import DetailPageParagraph from "../Paragraph/DetailPageParagraph"

const BasicPage = ({ data }: any) => {
  return (
    <div className="video-page">
      <Breadcrumbs items={[{title: data?.title?.[0]?.value}]} />
      <DetailPageParagraph data={data} />
    </div>
  )
}

export default BasicPage
