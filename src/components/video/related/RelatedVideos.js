import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const {
    data: relatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ id, title });

  let content = null;

  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader></RelatedVideoLoader>
        <RelatedVideoLoader></RelatedVideoLoader>
        <RelatedVideoLoader></RelatedVideoLoader>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error"></Error>;
  }
  if (!isLoading && !isError && relatedVideos.length === 0) {
    content = <Error message="No related videos found !"></Error>;
  }
  if (!isLoading && !isError && relatedVideos.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideo key={relatedVideos.id} video={video}></RelatedVideo>
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
