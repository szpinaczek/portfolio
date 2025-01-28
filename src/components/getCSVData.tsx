"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";// @ts-ignore
import UFOData from "../datasets/ufo.csv";

export const GetCSVData = () => {

    const [UFOsData, setUFOsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(UFOData);
          const reader = response.body?.getReader();
          // @ts-ignore
          const { value: csv } = await reader?.read();
          const decoded = new TextDecoder("utf-8").decode(csv);
          const { data: rows } = Papa.parse(decoded, {
            header: true,
            skipEmptyLines: true,
          });
          // @ts-ignore
          setUFOsData(rows);
        };
        fetchData();
      }, []);

  return UFOsData;
}