"use client";
import { useEffect, useState } from "react";
import Column from "./Column";
import Button from "./Button";
import { shuffleArray } from "@/utils/countries";

export interface Match {
  name: string;
  capital: string;
}

// const preMatchedData: Match[] = [
//   { name: "Russia", capital: "Moscow" },
//   { name: "Poland", capital: "Warszawa" },
//   { name: "UK", capital: "London" },
//   { name: "France", capital: "Paris" },
//   { name: "Germany", capital: "Berlin" },
//   { name: "Italy", capital: "Rome" },
// ];

async function fetchCountries() {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/capital"
  );
  const data = await response.json();
  return shuffleArray(data.data).slice(0, 6);
}

const CityMatcher = () => {
  const [shuffledData, setShuffledData] = useState<Match[]>();
  const [capitalList, setCapitalList] = useState<Match["capital"][]>([]);

  const [selectedPair, setSelectedPair] = useState<Match | undefined>(
    undefined
  );
  const [pairedData, setPairedData] = useState<Match[]>([]);

  useEffect(() => {
    fetchCountries().then((data) => {
      setShuffledData(data);
      setCapitalList(
        data.map((match) => match.capital).sort(() => 0.5 - Math.random())
      );
    });
  }, []);

  if (!shuffledData) return <h1>Waiting</h1>;

  const handleCapitalClick = (capital: Match["capital"]) => {
    if (capital === selectedPair?.capital) {
      const newPairedMatch = [...pairedData, selectedPair];
      setPairedData(newPairedMatch);
    }

    setSelectedPair(undefined);
  };

  const isMatched = (match: Match) =>
    pairedData.some(
      (pairedMatch) =>
        pairedMatch.name === match.name && pairedMatch.capital === match.capital
    );

  const win = pairedData.length === shuffledData?.length;

  return (
    <>
      {win && <h2 className="absolute text-green-500">You win!</h2>}
      <div className="flex gap-5 mt-10">
        <Column>
          {shuffledData.map((match, idx) => (
            <Button
              disabled={isMatched(match)}
              className={`
              
                hover:bg-gray-900 hover:scale-105 transition ease-in duration-300
                ${isMatched(match) ? "bg-green-500" : ""}
                ${selectedPair === match && "bg-gray-700"}
              `}
              key={match.capital}
              onClick={() => setSelectedPair(match)}
            >
              {match.name}
            </Button>
          ))}
        </Column>
        <Column>
          {capitalList.map((capital, idx) => (
            <Button
              className={`
        ${
          pairedData.some((pair) => pair.capital === capital)
            ? "bg-green-500"
            : ""
        }
        ${
          selectedPair !== undefined
            ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300"
            : "cursor-not-allowed"
        }
      `}
              key={capital}
              onClick={() => handleCapitalClick(capital)}
              disabled={selectedPair === undefined}
            >
              {capital || "No Capital!"}
            </Button>
          ))}
        </Column>
      </div>
    </>
  );
};

export default CityMatcher;
