const Text = (data: any) => {
  return (
    <div className="body-text mb-8" dangerouslySetInnerHTML={{ __html: data?.field_description?.value }} />
  )
}

export default Text
