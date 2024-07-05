import { csvParse } from 'd3-dsv';

async function fetchCSV(url) {
  const response = await fetch(url);
  const text = await response.text();
  return csvParse(text);
}

export async function fetchGameData(csvFiles) {
  const data = {};

  for (const csvFile of csvFiles) {

    const filename = `/src/data/${csvFile}.csv`;
    const key = csvFile.split("-")[0];
    data[key] = await fetchCSV(filename);
  }

  return data;
}