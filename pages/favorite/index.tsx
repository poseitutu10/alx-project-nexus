import useFetch from "@/hooks/useFetch";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import MovieCard from "../../components/common/MovieCard";
import { Movie } from "@/interfaces";

const Favorite: React.FC = () => {
  const { data, loading } = useFetch("/movies/favorites/", {
    params: { page: 1 },
  });
  console.log(data?.data?.results);

  const showMovie = data?.data?.results;
  return (
    <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py- md:py-20 space-y-5">
      <h2 className="text-xl font-semibold text-yellow-600">Favorites</h2>
      {data?.data?.results.length == 0 && (
        <div className="flex h-[30vh] items-center justify-center">
          <p>No favorite movies</p>
        </div>
      )}
      {loading ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <BiLoaderCircle
            size={30}
            color="white"
            className={`${loading ? "animate-spin" : "hidden"}`}
          />
        </div>
      ) : (
        <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {showMovie
            ?.slice(0, 9)
            ?.map((data: { id: number; movie: Movie }, index: number) => (
              <MovieCard
                data={data.movie}
                key={index}
                path={`/movie/${data.id}`}
              />
            ))}
        </div>
      )}
      <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* {movies.map((data, index: number) => {
          return <MovieCard data={data} index={index} />;
        })} */}
      </div>
    </div>
  );
};

export default Favorite;
