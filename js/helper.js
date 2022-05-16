import { TIME_OUT } from "./config";

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIME_OUT)]);

    if (!response) throw new Error("getJSON error💥");

    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};
