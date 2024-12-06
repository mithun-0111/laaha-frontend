const Tags = ({tags}:any) => {
  return (
    <>
      <div className="tags pb-8 border-b border-shadow-dark-gray mb-8">
        Tags: {
          tags.map((item:any, index:number) => (
            <span className="underline" key={index}>
              {item.name}
              {
                (index + 1) != tags.length ? ', ' : ''
              }
            </span>
          ))
        }
      </div>
    </>
  )
}

export default Tags