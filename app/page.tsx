/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2023);
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        fuel: fuel || "",
        limit: limit || 10,
        year: year || 2023,
      });
      setAllCars(result);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-5 lg:mt-0 paddind-x max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p className="text-base md:text-lg">Explore the cars you might like</p>
          <div className="home__filters">
            <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
            <div className="home__filter-container">
              <CustomFilter setFilter={setFuel} options={fuels} title="fuel" />
              <CustomFilter setFilter={setYear} options={yearsOfProduction} title="year" />
            </div>
          </div>
          {allCars.length > 0 ? (
            <>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={car} car={car} />
                ))}
              </div>
              { loading && (
                <div className="mt-16 w-full flex-center">
                  <p>Loading ...</p>
                </div>
              )}
              <ShowMore
                pageNumber={(limit) / 10}
                isNext={(limit) > allCars.length}
                setLimit={setLimit}
              />
            </>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-center w-full mx-auto font-bold text-xl">
                Oops! No results
              </h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
