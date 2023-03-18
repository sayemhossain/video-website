import { useGetVideosQuery } from "../../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  //decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error nessage="There was an error" />;
  }
  if (!isLoading && !isError && videos.length) {
    content = <Error message="No videos found !" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
}
