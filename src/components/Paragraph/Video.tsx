import { absoluteUrl } from "@/src/lib/utils";

const ExternalVideo = (data:any) => {  
  
    return (
      <>
        {
          data && <video className="mb-8" src={absoluteUrl(data?.field_video_file?.uri?.url)} controls autoPlay />
        }
      </>
    )
  }
  
  export default ExternalVideo