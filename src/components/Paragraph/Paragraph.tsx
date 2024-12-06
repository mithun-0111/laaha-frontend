import Text from "./Text";
import Layout from "./Layout";
import ImageComponent from "./Image";
import Accordion from "./Accordion";
import Video from "./Video";
import ExternalVideo from "./ExternalVideo";
import Audio from "./Audio";
import './paragraph.scss';

const Paragraph = ({ data }: { data: any }) => {
  const layoutData = data.layout_structure;
  const content = data.field_content;

  const paragraphTypes: { [key: string]: React.ElementType } = {
    "paragraph--wysiwyg_editor": Text,
    "paragraph--image": ImageComponent,
    "paragraph--faq": Accordion,
    "paragraph--external_videos": ExternalVideo,
    "paragraph--video": Video,
    "paragraph--podcast_audio": Audio
  };

  if (!Array.isArray(layoutData)) {
    console.error("Expected 'layout_structure' to be an array.");
    return null;
  }

  const getContentById = (uuid: string) => {
    return content.find((item: any) => item.id === uuid);
  };

  const renderLayout = (layoutData: any) => {
    return layoutData?.map((layout: any) => {
      const LayoutComponent = Layout;
      if (layout.type !== 'layout' || Object.keys(layout.regions).length === 0) {
        return null; // Skip rendering if it's not a layout or has no regions
      }

      return (
        <LayoutComponent key={layout.layout_id} layout_id={layout.layout_id}>
          {Object.keys(layout.regions).map((regionKey) => {
            const region = layout.regions[regionKey];
            return (
              region.length > 0 && (
                <div key={regionKey} className={`region-${regionKey} w-full`}>
                  {region.map((component: any) => {
                    const matchedContent = getContentById(component.uuid);
                    const Component = paragraphTypes[matchedContent?.type];

                    if (!Component) {
                      return <div key={component.uuid}>Unknown component type: {component.paragraph_type}</div>;
                    }

                    if (matchedContent) {
                      return <Component key={component.uuid} {...matchedContent} />;
                    }

                    return null;
                  })}
                </div>
              )
            );
          })}
        </LayoutComponent>
      );
    });
  };

  return <>{renderLayout(layoutData)}</>;
};

export default Paragraph;
