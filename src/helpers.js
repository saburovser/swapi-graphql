const fetch = require('node-fetch');

const COUNT_PER_PAGE = 10;

const fetchEntities = async urlArray => {
  const entities = await Promise.allSettled(urlArray.map( url => fetch(url).then(data => data.json())));
  return entities
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)
};

const fetchEntityById = async (api, id) => fetch(api + id).then(data => data.json());

const fetchAllEntities = async (api, count, offset = 0) => {
  let output = [];
  let countLeft = count;

  let page = Math.floor(offset / COUNT_PER_PAGE) + 1;
  offset = offset % COUNT_PER_PAGE;
  let data = { next: true };
  let results = [];
  while (countLeft > 0 && data.next) {
    try {
      data = await fetch(api + `?page=${page}`)
        .then(res => res.status === 200 ? res.json() : Promise.reject());
    } catch (e) {
      return [];
    }
    results = data.results.slice(offset, countLeft + offset);

    output = output.concat(results);
    countLeft -= results.length;
    page++;
    offset = 0;
  }

  return output;
};

module.exports = {
  fetchEntities,
  fetchAllEntities,
  fetchEntityById,
};
