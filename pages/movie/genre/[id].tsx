import List from "@/components/common/List";
import { useMyContext } from "@/context";
import axiosInstance from "@/services/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

interface Movie {
  id: number;
  is_trending: boolean;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  tmdb_id: number;
  genres: {
    id: number;
    tmdb_id: number;
    name: string;
  }[];
}

interface FilteredDataProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Movie = () => {
  const [movie, setMovie] = useState<FilteredDataProps[]>();
  const router = useRouter();
  const query = router.query;
  const context = useMyContext();
  console.log(context?.genreThumbId);

  //Function
  const [genreData, setGenreData] = useState<FilteredDataProps[]>();
  const [genreLoading, setGenreLoading] = useState<boolean>(false);

  const fetchData = async (id: number) => {
    setGenreLoading(true);
    console.log(`Rendering...`);
    try {
      const response = await axiosInstance.get(`/movies/genres/${id}/movies/`);
      console.log(response);
      setGenreData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setGenreLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Fetching...`);
    fetchData(context?.genreThumbId as number);
    if (genreData) {
      setMovie(genreData);
    }
  }, []);

  const filteredData: FilteredDataProps = genreData?.find(
    (content: FilteredDataProps) => content?.id == Number(query.id)
  ) as FilteredDataProps;

  return (
    <div className="text-white px-5 md:px-[5%] xl:px-[15%] mt-10 ">
      {genreLoading ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <BiLoaderCircle
            size={30}
            color="white"
            className={`${genreLoading ? "animate-spin" : "hidden"}`}
          />
        </div>
      ) : (
        <>
          <h2 className="text-lg mt-10 text-yellow-600 my-5 md:mt-20">
            Movie Description
          </h2>
          <Image
            src={`https://image.tmdb.org/t/p/w500${filteredData?.poster_path}`}
            alt="video"
            width={600}
            height={600}
            className="w-full h-[30vh] md:h-[60vh]"
          />

          <div className="my-10 flex flex-col md:flex-row gap-5">
            <Image
              src={`https://image.tmdb.org/t/p/w500${filteredData?.poster_path}`}
              width={600}
              height={600}
              alt="movie"
              className="h-[30vh] md:h-[50vh] w-full md:w-1/3 rounded-2xl brightness-50"
            />
            <div className="right flex-grow">
              <div className="head flex justify-between items-center w-full">
                <h2 className="text-xl md:text-xl w-2/3">
                  {filteredData?.title}
                </h2>
                {/* <Button
                  name="Add Favorite"
                  styles="bg-red-500 text-white py-1 px-2 text-sm cursor-pointer md:font-semibold flex items-center justify-center flex-row-reverse items-center md:gap-3 rounded-lg hover:opacity-90"
                  icon={<IoIosAdd size={25} />}
                  // action={() => {
                  //   addFavorite({ movie_id: filteredData?.id });
                  // }}
                /> */}
              </div>
              {/* <div className="rest md:mt-7 xl:mt-14 flex flex-col md:flex-row gap-5 md:items-center">
                <div className="space-x-2 md:space-x-5 mt-5 md:mt-0">
                  {movie?.genres.map(({ name }, index: number) => {
                    return (
                      <span
                        className="bg-white text-gray-800 p-2 text-sm font-semibold md:text-base rounded-lg"
                        key={index}
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div> */}
              <p className="my-4 max-w-2xl">{filteredData?.overview}</p>
              <List
                name="Popularity"
                value={JSON.stringify(filteredData?.popularity)}
              />
              <List name="Genre" value="Drama, Science Fiction" />
              <List name="Date Release" value="May 05 2023" />
              <List name="Production" value="AMC Studios" />
              <List
                name="Cast "
                value="Tim Robbins, Rebecca Ferguson, Avi Nash"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
