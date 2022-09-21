import styled from "styled-components";
import { memo } from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movie: Movie;
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Text = styled.span`
  font-weight: bold;
  text-align: justify;
  text-justify: inter-word;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default memo(({ movie }: Props) => {
  return (
    <DetailContainer>
      <TextContainer>
        <Text>{movie.title}</Text>
        <Text>{movie.description}</Text>
        <Text>{movie.score}/10</Text>
      </TextContainer>

      <ImageContainer>
        <MovieCard movie={movie} />
      </ImageContainer>
    </DetailContainer>
  );
});
