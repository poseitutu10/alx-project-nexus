import React from "react";
import NewMovieCard from "./NewMovieCard";

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
interface GenreMovieProps {
  data: FilteredDataProps[];
  index: number;
}

const GenreMovies = ({ data, index }: GenreMovieProps) => {
  return (
    <div key={index}>
      {data?.map((data, index: number) => {
        return <NewMovieCard data={data} key={index} index={index} />;
      })}
    </div>
  );
};

export default GenreMovies;
