import './../../styles/shimmer.scss';

export const ListingShimmer = () => (
  <div className="shimmer-wrapper">
    <div className="shimmer-item"></div>
    <div className='content-items flex gap-4 flex-wrap my-10'>
        <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
    </div>
  </div>
);

export const ResourceListingShimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-item"></div>
      <div className='content flex gap-4 flex-wrap mt-10'>
        <div className='sidebar w-full lg:max-w-[calc(25%-1rem)]'>
          <div className="shimmer-item"></div>
        </div>
        <div className='content-items w-full flex gap-4 lg:max-w-[calc(75%-1rem)] flex-wrap mb-10'>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
        </div>
      </div>
    </div>
  )
}

export const ListingShimmer3col = () => {
  return (
    <div className="shimmer-wrapper">
      <div className='content-items w-full flex gap-4 flex-wrap mb-10'>
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
      </div>
    </div>
  )
}

export const ViewCountShimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-effect h-6 max-w-24"></div>
    </div>
  )
}