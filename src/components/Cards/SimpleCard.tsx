import Link from 'next/link';

type Props = {
  data: {
    url: string;
    image: string;
    alt: string;
    title: string;
  };
  classes?: string;
};

const SimpleCard = ({ data, classes }: Props) => {
  return (
    <Link href={data.url} className={`card-item flex justify-center ${classes}`}>
      <div className="cursor-pointer flex flex-wrap justify-center transition-transform transform hover:scale-105">
        {data.image && (
          <div className="w-full flex-[0_0_100%] max-w-48 overflow-hidden">
            <img
              src={data.image}
              alt={data.alt || data.title}
              className="rounded-full"
            />
          </div>
        )}
        
        <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
          {data.title}
        </h3>
      </div>
    </Link>
  );
};

export default SimpleCard;
